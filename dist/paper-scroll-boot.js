// Runs before styles paint so a linked destination begins as a rolled sheet.
(() => {
  const key = 'northstate-paper-scroll';
  const canonical = path => path.replace(/\/+$/, '').replace(/\/index(?:\.html)?$/, '').replace(/\.html$/, '') || '/';
  try {
    const pending = JSON.parse(sessionStorage.getItem(key) || 'null');
    sessionStorage.removeItem(key);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const historyTraversal = performance.getEntriesByType('navigation')[0]?.type === 'back_forward';
    if (!pending || reduced || historyTraversal || Date.now() - pending.at > 15000) return;
    if (pending.path !== canonical(location.pathname) || pending.search !== location.search) return;
    document.documentElement.classList.add('paper-entering');
    // Content must never stay concealed if the enhancement fails to load.
    window.paperScrollSafety = setTimeout(() => {
      document.documentElement.classList.remove('paper-entering');
      if (typeof window.paperScrollReset === 'function') window.paperScrollReset();
    }, 5000);
  } catch (_) { /* Storage can be unavailable; normal navigation still works. */ }
})();
