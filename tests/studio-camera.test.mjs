import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';

const {
  clampViewAngle,
  getPointerIntent,
  MAX_VIEW_ANGLE,
  portalCameraDistance,
  PORTAL_FIELD_OF_VIEW,
  PORTAL_FRAMES,
  shouldSuppressSceneClick,
  viewAngleAfterDrag,
} = createRequire(import.meta.url)('../src/components/studio/scene-camera.ts');

test('touch intent separates horizontal inspection from vertical scrolling and tap jitter', () => {
  assert.equal(getPointerIntent(3, 5, 'touch'), 'pending');
  assert.equal(getPointerIntent(10, 10, 'touch'), 'pending');
  assert.equal(getPointerIntent(19, 4, 'touch'), 'orbit');
  assert.equal(getPointerIntent(-19, -4, 'touch'), 'orbit');
  assert.equal(getPointerIntent(4, 19, 'touch'), 'scroll');
  assert.equal(getPointerIntent(-4, -19, 'touch'), 'scroll');
  assert.equal(getPointerIntent(16, 19, 'touch'), 'scroll');
  assert.equal(getPointerIntent(6, 1, 'mouse'), 'orbit');
});

test('a gesture that moves away then returns cannot become a navigation click', () => {
  assert.equal(shouldSuppressSceneClick(3, 2), false);
  const trajectory = [[2, 1], [22, 3], [4, 1], [0, 0]];
  const suppressed = trajectory.reduce((alreadyMoved, [x, y]) => alreadyMoved || shouldSuppressSceneClick(x, y), false);
  assert.equal(suppressed, true);
  assert.equal(shouldSuppressSceneClick(2, 15), true);
  // Mouse intent begins at 5 px, before the 6 px click tolerance. Once either
  // direction locks, even returning to the origin must remain a gesture.
  for (const [x, y] of [[5.5, 0], [0, 5.5]]) {
    const intent = getPointerIntent(x, y, 'mouse');
    assert.equal(shouldSuppressSceneClick(x, y, intent), true);
    assert.equal(shouldSuppressSceneClick(0, 0, intent), true);
  }
});

test('orbit angles stay inside the open side of the room on narrow and wide canvases', () => {
  assert.equal(clampViewAngle(Number.NaN), 0);
  assert.equal(clampViewAngle(Infinity), 0);
  for (const width of [200, 360, 840, 1800]) {
    assert.equal(viewAngleAfterDrag(0, 0, width), 0);
    assert.ok(viewAngleAfterDrag(0, 50, width) < 0);
    assert.ok(viewAngleAfterDrag(0, -50, width) > 0);
    assert.equal(viewAngleAfterDrag(0, -10000, width), MAX_VIEW_ANGLE);
    assert.equal(viewAngleAfterDrag(0, 10000, width), -MAX_VIEW_ANGLE);
  }
});

test('portal framing contains its work area in desktop, phone, and compact aspect ratios', () => {
  for (const [width, height] of [[840, 560], [360, 340], [280, 210]]) {
    const aspect = width / height;
    for (const zone of ['work', 'build', 'notes']) {
      const distance = portalCameraDistance(zone, aspect);
      const visibleHeight = 2 * distance * Math.tan(PORTAL_FIELD_OF_VIEW * Math.PI / 360);
      assert.ok(visibleHeight + 1e-9 >= PORTAL_FRAMES[zone].height, `${zone} fits vertically at ${width}x${height}`);
      assert.ok(visibleHeight * aspect + 1e-9 >= PORTAL_FRAMES[zone].width, `${zone} fits horizontally at ${width}x${height}`);
      assert.ok(distance < portalCameraDistance('overview', aspect) * 0.7, `${zone} is a close view, not the whole room`);
    }
  }
});
