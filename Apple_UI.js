document.addEventListener('DOMContentLoaded', () => {
  console.log('[features] DOM ready');

  const DELAY_MS = 0;
  const EXPAND_MS = 400;
  const SNAP_MS = 200;
  const OVERSHOOT_PX = 10;
  const SCALE_MS = 200;
  const SCALE_SNAP_MS = 140;
  const SCALE_PEAK = 1.00;
  const FADE_SPEED = 600;
  const WIDTH_EXPAND_MS = EXPAND_MS;
  const WIDTH_SNAP_MS = SNAP_MS;
  const WIDTH_OVERSHOOT = 0;

  const btnWrap = document.getElementById('featureButtons');
  const content = document.getElementById('featureContent');
  const lottieEl = document.getElementById('featureLottie');
  
  // ✅ Force base container styling
  if (lottieEl) {
    Object.assign(lottieEl.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: '0'
    });

    // 🔥 Fix: force any preloaded Lottie to full width immediately
    const preSvg = lottieEl.querySelector('svg');
    if (preSvg) {
      preSvg.removeAttribute('width');
      preSvg.removeAttribute('height');
      preSvg.style.width = '100%';
      preSvg.style.height = 'auto';
      preSvg.style.position = 'absolute';
      preSvg.style.top = '50%';
      preSvg.style.left = '50%';
      preSvg.style.transform = 'translate(-50%, -50%)';
    }
  }

  if (!btnWrap || !content) return;

  const titleEl = content.querySelector('h2');
  const textEl = content.querySelector('p');
  const buttons = [...btnWrap.querySelectorAll('.feature-btn')];
  let currentBtn = null;
  let running = false;

  // ✅ Preload all Lotties
  const lottieCache = {};
  buttons.forEach(btn => {
    const feature = btn.dataset.feature;
    const lottieSrc = btn.dataset.lottie;
    if (lottieSrc && !lottieCache[feature]) {
      const container = document.createElement('div');
      container.classList.add('lottie-instance');
      Object.assign(container.style, {
        position: 'absolute',
        inset: '0',
        opacity: '0',
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
        zIndex: '0',
      });
      lottieEl.appendChild(container);

      const anim = lottie.loadAnimation({
        container,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: lottieSrc,
      });

      // ✅ Force scaling on DOMLoaded (instant full width)
      anim.addEventListener('DOMLoaded', () => {
        const svg = container.querySelector('svg');
        if (svg) {
          svg.removeAttribute('width');
          svg.removeAttribute('height');
          svg.style.width = '100%';
          svg.style.height = 'auto';
          svg.style.position = 'absolute';
          svg.style.top = '50%';
          svg.style.left = '50%';
          svg.style.transform = 'translate(-50%, -50%)';
        }
      });

      lottieCache[feature] = { anim, container };
    }
  });

  // ---------- Animation helpers ----------
  function measureTargets(btn) {
    const extra = btn.querySelector('.btn-extra');
    const parent = btn.parentElement;
    const maxW = parent ? parent.clientWidth : window.innerWidth;
    const prev = {
      display: btn.style.display,
      boxSizing: btn.style.boxSizing,
      width: btn.style.width,
      height: btn.style.height,
      ws: btn.style.whiteSpace,
      trans: btn.style.transition,
      transform: btn.style.transform,
      isActive: btn.classList.contains('is-active'),
      wrap: btn.classList.contains('wrap-lines'),
      extra: extra ? {
        vis: extra.style.visibility,
        op: extra.style.opacity,
        disp: extra.style.display
      } : null
    };

    btn.style.display = 'inline-block';
    btn.style.boxSizing = 'border-box';
    if (extra) {
      extra.style.visibility = 'hidden';
      extra.style.opacity = '0';
      extra.style.display = 'inline';
    }
    btn.classList.add('is-active');
    btn.classList.remove('wrap-lines');
    btn.style.whiteSpace = 'nowrap';
    btn.style.width = 'auto';
    const targetWidth = Math.min(btn.scrollWidth + 1, maxW);
    btn.style.width = targetWidth + 'px';
    btn.classList.add('wrap-lines');
    btn.style.whiteSpace = 'normal';
    const targetHeight = btn.scrollHeight;

    btn.classList.toggle('is-active', prev.isActive);
    btn.classList.toggle('wrap-lines', prev.wrap);
    btn.style.display = prev.display;
    btn.style.boxSizing = prev.boxSizing;
    btn.style.width = prev.width;
    btn.style.height = prev.height;
    btn.style.whiteSpace = prev.ws;
    btn.style.transition = prev.trans;
    btn.style.transform = prev.transform;
    if (extra && prev.extra) {
      extra.style.visibility = prev.extra.vis;
      extra.style.opacity = prev.extra.op;
      extra.style.display = prev.extra.disp;
    }

    return { targetWidth, targetHeight };
  }

  function measureBaseTargets(btn) {
    const extra = btn.querySelector('.btn-extra');
    const parent = btn.parentElement;
    const maxW = parent ? parent.clientWidth : window.innerWidth;

    const prev = {
      display: btn.style.display,
      boxSizing: btn.style.boxSizing,
      width: btn.style.width,
      height: btn.style.height,
      ws: btn.style.whiteSpace,
      trans: btn.style.transition,
      transform: btn.style.transform,
      isActive: btn.classList.contains('is-active'),
      wrap: btn.classList.contains('wrap-lines'),
      extra: extra ? {
        vis: extra.style.visibility,
        op: extra.style.opacity,
        disp: extra.style.display
      } : null
    };

    btn.style.display = 'inline-block';
    btn.style.boxSizing = 'border-box';
    if (extra) extra.style.display = 'none';
    btn.classList.remove('wrap-lines');
    btn.style.whiteSpace = 'nowrap';
    btn.style.width = 'auto';
    const baseWidth = Math.min(btn.scrollWidth + 1, maxW);
    btn.style.width = baseWidth + 'px';
    btn.style.whiteSpace = 'normal';
    const baseHeight = btn.scrollHeight;

    btn.classList.toggle('is-active', prev.isActive);
    btn.classList.toggle('wrap-lines', prev.wrap);
    btn.style.display = prev.display;
    btn.style.boxSizing = prev.boxSizing;
    btn.style.width = prev.width;
    btn.style.height = prev.height;
    btn.style.whiteSpace = prev.ws;
    btn.style.transition = prev.trans;
    btn.style.transform = prev.transform;
    if (extra && prev.extra) {
      extra.style.visibility = prev.extra.vis;
      extra.style.opacity = prev.extra.op;
      extra.style.display = prev.extra.disp;
    }

    return { baseWidth, baseHeight };
  }

  function animateWH(btn, wTo, hTo) {
    return new Promise(resolve => {
      const wFrom = btn.offsetWidth;
      const hFrom = btn.offsetHeight;
      const prevDisplay = btn.style.display;
      const prevBoxSizing = btn.style.boxSizing;
      btn.style.display = 'inline-block';
      btn.style.boxSizing = 'border-box';
      btn.style.setProperty('width', wFrom + 'px', 'important');
      btn.style.setProperty('height', hFrom + 'px', 'important');
      btn.style.transform = 'scale(1)';
      btn.style.transition = 'none';
      requestAnimationFrame(() => {
        btn.style.transition = `width ${WIDTH_EXPAND_MS}ms ease, height ${EXPAND_MS}ms ease`;
        btn.style.setProperty('width', (wTo + WIDTH_OVERSHOOT) + 'px', 'important');
        btn.style.setProperty('height', (hTo + OVERSHOOT_PX) + 'px', 'important');
        const t1 = Math.max(WIDTH_EXPAND_MS, EXPAND_MS) + 20;
        setTimeout(() => {
          const extra = btn.querySelector('.btn-extra');
          if (extra) {
            extra.style.transition = `opacity ${Math.max(SNAP_MS - 50, FADE_SPEED)}ms ease`;
            extra.style.opacity = '1';
            extra.style.visibility = 'visible';
          }
          btn.style.transition = `width ${WIDTH_SNAP_MS}ms ease-out, height ${SNAP_MS}ms ease-out`;
          btn.style.setProperty('width', wTo + 'px', 'important');
          btn.style.setProperty('height', hTo + 'px', 'important');
          const t2 = Math.max(WIDTH_SNAP_MS, SNAP_MS) + 20;
          setTimeout(() => {
            btn.style.transition = '';
            btn.style.removeProperty('width');
            btn.style.removeProperty('height');
            btn.style.transform = '';
            btn.style.display = prevDisplay;
            btn.style.boxSizing = prevBoxSizing;
            resolve();
          }, t2);
        }, t1);
      });
    });
  }

  function collapseWH(btn, wTo, hTo) {
    return new Promise(resolve => {
      const wFrom = btn.offsetWidth;
      const hFrom = btn.offsetHeight;
      const prevDisplay = btn.style.display;
      const prevBoxSizing = btn.style.boxSizing;
      btn.style.display = 'inline-block';
      btn.style.boxSizing = 'border-box';
      btn.style.transition = 'none';
      btn.style.setProperty('width', wFrom + 'px', 'important');
      btn.style.setProperty('height', hFrom + 'px', 'important');
      requestAnimationFrame(() => {
        const wUnder = Math.max(0, wTo - WIDTH_OVERSHOOT);
        const hUnder = Math.max(0, hTo - OVERSHOOT_PX);
        btn.style.transition = `width ${WIDTH_EXPAND_MS}ms ease, height ${EXPAND_MS}ms ease`;
        btn.style.setProperty('width', wUnder + 'px', 'important');
        btn.style.setProperty('height', hUnder + 'px', 'important');
        const t1 = Math.max(WIDTH_EXPAND_MS, EXPAND_MS) + 20;
        setTimeout(() => {
          btn.style.transition = `width ${WIDTH_SNAP_MS}ms ease-out, height ${SNAP_MS}ms ease-out`;
          btn.style.setProperty('width', wTo + 'px', 'important');
          btn.style.setProperty('height', hTo + 'px', 'important');
          const t2 = Math.max(WIDTH_SNAP_MS, SNAP_MS) + 20;
          setTimeout(() => {
            btn.style.transition = '';
            btn.style.removeProperty('width');
            btn.style.removeProperty('height');
            btn.style.display = prevDisplay;
            btn.style.boxSizing = prevBoxSizing;
            resolve();
          }, t2);
        }, t1);
      });
    });
  }

  // ✅ Button/Lottie logic
  async function setActive(btn) {
    if (running || btn === currentBtn) return;
    running = true;

    const title = btn.dataset.title || '';
    const text = btn.dataset.text || '';
    const feature = btn.dataset.feature;
    const imgSrc = btn.dataset.img;

    Object.values(lottieCache).forEach(({ container }) => (container.style.opacity = '0'));

    if (lottieCache[feature]) {
      const { anim, container } = lottieCache[feature];
      container.style.opacity = '1';
      anim.goToAndPlay(0, true);
    } else if (imgSrc && lottieEl) {
      lottieEl.style.backgroundImage = `url(${imgSrc})`;
      lottieEl.style.backgroundSize = 'cover';
      lottieEl.style.backgroundPosition = 'center';
    }

    content.classList.add('is-fading');
    const prevBtn = currentBtn;
    buttons.forEach(b => {
      if (b !== btn && b !== prevBtn) {
        b.classList.remove('is-active', 'wrap-lines');
        const extra = b.querySelector('.btn-extra');
        if (extra) extra.style.opacity = '0';
      }
    });

    let collapsePromise = Promise.resolve();
    if (prevBtn && prevBtn !== btn) {
      const prevExtra = prevBtn.querySelector('.btn-extra');
      if (prevExtra) prevExtra.style.opacity = '0';
      const { baseWidth, baseHeight } = measureBaseTargets(prevBtn);
      prevBtn.classList.add('is-active');
      collapsePromise = collapseWH(prevBtn, baseWidth, baseHeight).then(() => {
        prevBtn.classList.remove('is-active', 'wrap-lines');
      });
    }

    const { targetWidth, targetHeight } = measureTargets(btn);
    const startW = btn.offsetWidth;
    const startH = btn.offsetHeight;
    btn.style.display = 'inline-block';
    btn.style.boxSizing = 'border-box';
    btn.style.transition = 'none';
    btn.style.setProperty('width', startW + 'px', 'important');
    btn.style.setProperty('height', startH + 'px', 'important');

    await new Promise(r => requestAnimationFrame(r));
    btn.classList.add('is-active');
    const growPromise = animateWH(btn, targetWidth, targetHeight);
    await Promise.all([growPromise, collapsePromise]);

    btn.classList.add('wrap-lines');
    const extra = btn.querySelector('.btn-extra');
    if (extra) {
      extra.style.opacity = '1';
      extra.style.visibility = 'visible';
    }

    titleEl.textContent = title;
    textEl.textContent = text;
    content.classList.remove('is-fading');

    currentBtn = btn;
    running = false;
  }

  btnWrap.addEventListener('click', e => {
    const btn = e.target.closest('.feature-btn');
    if (btn) setActive(btn);
  });

  if (buttons[0]) setActive(buttons[0]);
});
