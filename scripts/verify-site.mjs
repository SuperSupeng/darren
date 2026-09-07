import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { access } from 'node:fs/promises';
import { createServer } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

// Verify the production build on an ephemeral local port, without touching a
// developer's existing preview or the live site. No global CLI is required.
const root = fileURLToPath(new URL('../', import.meta.url));
await access(new URL('../.next/BUILD_ID', import.meta.url)).catch(() => {
  throw new Error('A production build is required. Run npm run build first.');
});

const probe = createServer();
probe.listen(0, '127.0.0.1');
await once(probe, 'listening');
const port = probe.address().port;
await new Promise((resolve, reject) => probe.close(error => error ? reject(error) : resolve()));

const children = new Set();
let stopping;
function start(args, options = {}) {
  if (stopping) throw new Error('Verification was interrupted.');
  const child = spawn(process.execPath, args, { cwd: root, ...options });
  children.add(child);
  // Observe both launch errors and close immediately, including failures before
  // the readiness check. Keeping a settled promise also avoids missed events.
  child.done = new Promise(resolve => {
    child.once('error', error => resolve({ code: 1, error }));
    child.once('close', (code, signal) => resolve({ code, signal }));
  });
  return child;
}

function stop() {
  return stopping ??= Promise.all([...children].map(async child => {
    if (child.exitCode !== null || child.signalCode !== null) return;
    child.kill('SIGTERM');
    const force = setTimeout(() => child.kill('SIGKILL'), 3000);
    force.unref();
    await child.done;
    clearTimeout(force);
  }));
}
for (const [signal, code] of [['SIGINT', 130], ['SIGTERM', 143]]) {
  process.once(signal, () => { void stop().then(() => process.exit(code)); });
}

const server = start(['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)], { stdio: ['ignore', 'pipe', 'pipe'] });
let serverOutcome;
void server.done.then(result => { serverOutcome = result; });
let serverLog = '';
for (const output of [server.stdout, server.stderr]) {
  output.on('data', chunk => { serverLog = (serverLog + chunk).slice(-12000); });
}
const baseUrl = `http://127.0.0.1:${port}`;

try {
  let ready = false;
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    if (stopping || serverOutcome) break;
    try {
      const response = await fetch(`${baseUrl}/robots.txt`, { signal: AbortSignal.timeout(1000) });
      await response.text();
      if (response.ok) { ready = true; break; }
    } catch { /* The server may still be starting. */ }
    await delay(100);
  }
  if (!ready) throw new Error(`Production preview did not become ready.\n${serverOutcome?.error?.message ?? ''}\n${serverLog}`);
  console.log('Checking the production build with an isolated local server.');
  const audit = start(['scripts/audit-seo.mjs', baseUrl], { stdio: 'inherit' });
  const result = await audit.done;
  if (result.error) throw result.error;
  process.exitCode = result.code ?? 1;
  if (process.exitCode) console.error(serverLog);
} finally {
  await stop();
}
