if (!window.__lenis) {
  const { default: Lenis } = await import('https://cdn.jsdelivr.net/npm/lenis@1.3.11/dist/lenis.mjs');
  const lenis = new Lenis({ duration: 1.2, smoothWheel: true, smoothTouch: false });
  window.__lenis = lenis;
  const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) lenis.stop();
  window.pauseSmooth = () => lenis.stop();
  window.resumeSmooth = () => lenis.start();
}
