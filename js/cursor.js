(() => {
  
   // ✅ Guard: prevents double-init across pages/partial reloads
  if (window.__customCursorInit) return;
  window.__customCursorInit = true;
  
  
  const HOVER_SELECTOR = 'a,button,[role="button"],[data-hover],.hoverable,input,textarea,select,summary,[tabindex]:not([tabindex="-1"])';

  const cursor = document.querySelector('.custom-cursor') || (() => {
    const el = document.createElement('div');
    el.className = 'custom-cursor';
    document.body.appendChild(el);
    return el;
  })();

  const canTranslate = 'translate' in cursor.style;

  const setVisible = v => cursor.classList.toggle('custom-cursor--visible', v);
  const setActive  = v => cursor.classList.toggle('custom-cursor--active', v);
  const setDown    = v => cursor.classList.toggle('custom-cursor--down', v);
  const isHoverable = el => !!el && (el.matches?.(HOVER_SELECTOR) || isHoverable(el.parentElement));

    const OFFSET_X = -6;  // move dot toward pointer tip (px)
    const OFFSET_Y = -6;

    const move = (e) => {
      const x = e.clientX + OFFSET_X;
      const y = e.clientY + OFFSET_Y;

      if ('translate' in cursor.style) {
        cursor.style.translate = `${x}px ${y}px`;
      } else {
        cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }

      setVisible(true);
      setActive(isHoverable(e.target));
    };


  if ('onpointerrawupdate' in window) {
    window.addEventListener('pointerrawupdate', move, { passive: true });
  }
  window.addEventListener('pointermove', move, { passive: true });
  window.addEventListener('pointerdown', () => setDown(true),  { passive: true });
  window.addEventListener('pointerup',   () => setDown(false), { passive: true });
  window.addEventListener('pointerleave',() => cursor.classList.remove('custom-cursor--visible'), { passive: true });
})();
