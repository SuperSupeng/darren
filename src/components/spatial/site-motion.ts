// Animate small content blocks, never the reading sheet, sticky layouts, or a canvas.
const revealSelector = [
  '.studio-intro > *', '.studio-purpose-heading', '.studio-purpose-case', '.studio-purpose-invitation-copy', '.studio-purpose-services',
  '.collection-hero-copy > *', '.collection-section-heading', '.collection-metrics > *', '.collection-note-strip',
  '.collection-work-card', '.collection-work-group-intro', '.collection-work-row', '.collection-collaborate',
  '.collection-product-display', '.collection-product-body', '.collection-system-body', '.collection-principles > *',
  '.collection-journal-masthead', '.collection-latest-story', '.collection-note-entry', '.collection-next > div:last-of-type',
  '.case-cover-copy > *', '.case-cover-photo', '.case-chapter', '.case-next',
  '.interior-profile-copy > *', '.interior-section-heading', '.interior-chapters > *', '.interior-invitation > div',
  '.interior-services-hero > div > *', '.interior-service-heading', '.interior-service-details', '.service-evidence', '.interior-inquiry',
  '.reading-header > *', '.reading-footer', '.spatial-footer-top > *',
].join(',');

export function observeSiteMotion(root: HTMLElement, revealed: WeakSet<Element>) {
  if (typeof IntersectionObserver === 'undefined' || typeof root.animate !== 'function') return () => {};

  const seen = new WeakSet<Element>();
  const running = new Map<Element, Animation>();
  const stages = new Set<HTMLElement>();
  const document = root.ownerDocument;

  const finish = (element: Element) => {
    running.get(element)?.cancel();
    running.delete(element);
  };
  const reveal = (element: HTMLElement, delay: number) => {
    // Focus and deep links must never wait for motion or move while being used.
    if (element.contains(document.activeElement) || element.matches(':target') || element.querySelector(':target')) return;
    const animation = element.animate([
      { opacity: .3, translate: '0 16px' },
      { opacity: 1, translate: '0 0' },
    ], { duration: 560, delay, easing: 'cubic-bezier(.22, .75, .25, 1)', fill: 'backwards' });
    running.set(element, animation);
    animation.onfinish = () => running.delete(element);
  };

  const observer = new IntersectionObserver(entries => {
    let order = 0;
    for (const entry of entries) {
      const element = entry.target as HTMLElement;
      if (stages.has(element)) {
        element.dataset.motionVisible = String(entry.isIntersecting);
      } else if (entry.isIntersecting) {
        observer.unobserve(element);
        revealed.add(element);
        reveal(element, Math.min(order++ * 45, 180));
      }
    }
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

  const register = (scope: ParentNode) => {
    for (const element of scope.querySelectorAll<HTMLElement>(revealSelector)) {
      if (seen.has(element) || revealed.has(element)) continue;
      seen.add(element);
      // Parent and child should not move twice. A block is always visible until it animates.
      if (element.parentElement?.closest(revealSelector)) continue;
      if (element.getBoundingClientRect().bottom < 0) continue;
      observer.observe(element);
    }
    for (const stage of scope.querySelectorAll<HTMLElement>('.studio-stage')) {
      if (stages.has(stage)) continue;
      stages.add(stage);
      stage.dataset.motionVisible = 'false';
      observer.observe(stage);
    }
  };
  register(root);
  // App Router may insert streamed content after the shared layout has mounted.
  const mutations = new MutationObserver(records => {
    if (records.some(record => [...record.addedNodes].some(node => node.nodeType === 1))) register(root);
    for (const [element] of running) if (!element.isConnected) finish(element);
    for (const stage of stages) if (!stage.isConnected) { observer.unobserve(stage); stages.delete(stage); }
  });
  mutations.observe(root, { childList: true, subtree: true });

  const showFocused = (event: FocusEvent) => {
    if (!(event.target instanceof Node)) return;
    for (const [element] of running) if (element.contains(event.target)) finish(element);
  };
  const showAnchor = () => {
    for (const [element] of running) if (element.matches(':target') || element.querySelector(':target')) finish(element);
  };
  root.addEventListener('focusin', showFocused);
  window.addEventListener('hashchange', showAnchor);
  return () => {
    observer.disconnect();
    mutations.disconnect();
    root.removeEventListener('focusin', showFocused);
    window.removeEventListener('hashchange', showAnchor);
    for (const [element] of running) finish(element);
    for (const stage of stages) delete stage.dataset.motionVisible;
  };
}
