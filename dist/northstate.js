(() => {
  'use strict';
  // Preserve links into the original ten-concept collection.
  if (document.body.dataset.page === 'home' && location.hash.startsWith('#/')) {
    location.replace('concepts.html' + location.hash);
    return;
  }
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = n => Math.max(0, Math.min(1, n));
  const nav = document.querySelector('.site-nav');
  const menu = document.querySelector('.menu-toggle');
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.querySelector('span').textContent = open ? '−' : '+';
    nav.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      menu.click(); menu.focus();
    }
  });

  // The brand travels along a short, stable path into the navigation corner.
  const brand = document.querySelector('.brand');
  function moveBrand() {
    const w = document.documentElement.clientWidth;
    const phone = w <= 760;
    const initialWidth = phone ? 117 : 142;
    const finalWidth = phone ? 68 : 78;
    const startY = phone ? 57 : 43;
    const fraction = motion.matches ? 1 : clamp(scrollY / 245);
    const ease = fraction * fraction * (3 - 2 * fraction);
    const startX = (w - initialWidth) / 2;
    const endX = w - finalWidth - w * .06;
    Object.assign(brand.style, {
      position:'fixed', left:`${startX + (endX - startX) * ease}px`,
      top:`${startY + (20 - startY) * ease}px`,
      width:`${initialWidth + (finalWidth - initialWidth) * ease}px`
    });
    brand.classList.toggle('is-docked', fraction > .95);
  }

  // Connect the landing-page islands through their surrounding empty space.
  const journey = document.querySelector('[data-journey]');
  const routeSvg = journey?.querySelector('.journey-line');
  let routes = [];
  const ns = 'http://www.w3.org/2000/svg';
  function svgNode(tag, attributes) {
    const node = document.createElementNS(ns, tag);
    Object.entries(attributes).forEach(([key,value]) => node.setAttribute(key, value));
    return node;
  }
  function measureRoutes() {
    if (!journey) return;
    const box = journey.getBoundingClientRect();
    routeSvg.setAttribute('viewBox', `0 0 ${journey.clientWidth} ${journey.clientHeight}`);
    routeSvg.replaceChildren(); routes = [];
    const islands = [...journey.querySelectorAll('[data-island]')];
    islands.forEach((island,index) => {
      const copy = island.querySelector('.island-copy').getBoundingClientRect();
      const art = island.querySelector('.island-art').getBoundingClientRect();
      const phone = document.documentElement.clientWidth <= 760;
      // On phones the drawing is the first part of each island.
      const destination = phone ? art : copy;
      const previous = index ? islands[index-1].getBoundingClientRect() : null;
      const y1 = previous ? previous.bottom - box.top - 12 : 4;
      const y2 = destination.top - box.top - 23;
      const x1 = index % 2 ? box.width * .25 : box.width * .66;
      const x2 = phone ? box.width * .5 : copy.left - box.left + 15;
      if (y2 <= y1 + 25) return;
      const mid = y1 + (y2-y1) * .45;
      const d = `M${x1} ${y1}V${mid}H${x2}V${y2}`;
      const guide = svgNode('path',{d,class:'route-guide'});
      const ink = svgNode('path',{d,class:'route-ink'});
      const arrow = svgNode('path',{d:'M-5 -8L0 0L5 -8',class:'route-arrow'});
      routeSvg.append(guide,ink,arrow);
      const length = ink.getTotalLength();
      ink.style.strokeDasharray = String(length);
      routes.push({ink,arrow,length,y1,y2});
    });
    drawRoutes();
  }
  function drawRoutes() {
    if (!journey) return;
    const cursor = innerHeight * .78 - journey.getBoundingClientRect().top;
    routes.forEach(route => {
      const progress = motion.matches ? 1 : clamp((cursor-route.y1)/(route.y2-route.y1));
      const distance = route.length * progress;
      route.ink.style.strokeDashoffset = String(route.length-distance);
      route.arrow.style.opacity = progress > 0 ? '1' : '0';
      const a = route.ink.getPointAtLength(distance);
      const b = route.ink.getPointAtLength(Math.max(0,distance-1));
      route.arrow.setAttribute('transform',`translate(${a.x},${a.y}) rotate(${Math.atan2(a.y-b.y,a.x-b.x)*180/Math.PI-90})`);
    });
  }
  let frame = 0;
  function updateScroll() {
    if (!frame) frame = requestAnimationFrame(() => {frame=0;moveBrand();drawRoutes();});
  }
  addEventListener('scroll',updateScroll,{passive:true});
  addEventListener('resize',() => {moveBrand();measureRoutes();});
  motion.addEventListener('change',() => {moveBrand();drawRoutes();});
  moveBrand(); measureRoutes();
  if (journey) new ResizeObserver(measureRoutes).observe(journey);
  document.fonts.ready.then(measureRoutes);

  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}
  }),{threshold:.06,rootMargin:'0px 0px -25px 0px'});
  document.querySelectorAll('.island-art').forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.reveal').forEach(el => {
    if (motion.matches) el.classList.add('is-visible');
    else revealObserver.observe(el);
  });
  document.documentElement.classList.add('js');

  const parts = {
    machining:['machining-enclosure','machine-control'],
    fabrication:['fabrication-bench','bench-fixture'],
    materials:['material-rack','floor-trays','parts-trolley','materials'],
    booth:['booth-shell','ventilation-wall','powder-unit'],
    rail:['overhead-rail','rail-hanging-parts','hanging-parts-rack'],
    oven:['compact-oven'],desks:['desks'],demonstration:['demonstration']
  };
  document.querySelectorAll('[data-explorer]').forEach(explorer => {
    const groups = [...explorer.querySelectorAll('.iso-part[data-part]')];
    const controls = [...explorer.querySelectorAll('[data-highlight]')];
    const caption = explorer.querySelector('.explorer-caption');
    const initialCaption = caption.textContent;
    let selected = null;
    const highlight = key => {
      const keys = parts[key] || [];
      groups.forEach(group => {
        const match = keys.includes(group.dataset.part);
        group.classList.toggle('is-highlighted',!!key && match);
        group.classList.toggle('is-muted',!!key && !match);
      });
    };
    controls.forEach(button => {
      button.addEventListener('pointerenter',() => highlight(button.dataset.highlight));
      button.addEventListener('pointerleave',() => highlight(selected?.dataset.highlight));
      button.addEventListener('focus',() => highlight(button.dataset.highlight));
      button.addEventListener('blur',() => highlight(selected?.dataset.highlight));
      button.addEventListener('click',() => {
        selected = selected === button ? null : button;
        controls.forEach(control => {
          control.setAttribute('aria-pressed',String(control === selected));
          control.querySelector('span').textContent = control === selected ? '−' : '+';
        });
        caption.textContent = selected ? selected.dataset.caption : initialCaption;
        highlight(selected?.dataset.highlight);
      });
    });
  });

  const slider = document.querySelector('#academy-progress');
  if (slider) {
    const output = document.querySelector('#progress-value');
    const update = () => {
      output.value = `${slider.value}%`;
      slider.style.setProperty('--progress',`${slider.value}%`);
      slider.setAttribute('aria-valuetext',`${slider.value} percent, illustrative concept progress`);
    };
    slider.addEventListener('input',update);
    document.querySelector('.progress-reset').addEventListener('click',() => {slider.value='52';update();});
    update();
    // User specified 2027; January 1 Eastern is the explicitly labeled demo target.
    const target = Date.parse('2027-01-01T00:00:00-05:00');
    const timer = document.querySelector('.countdown');
    function updateCountdown() {
      const seconds = Math.max(0,Math.floor((target-Date.now())/1000));
      const values = {days:Math.floor(seconds/86400),hours:Math.floor(seconds/3600)%24,minutes:Math.floor(seconds/60)%60,seconds:seconds%60};
      Object.entries(values).forEach(([key,value]) => {
        timer.querySelector(`[data-count="${key}"]`).textContent=String(value).padStart(2,'0');
      });
      timer.setAttribute('aria-label', seconds ? `${values.days} days, ${values.hours} hours, ${values.minutes} minutes until the Academy demo launch target` : 'The 2027 demo target has arrived. Opening date to be confirmed.');
    }
    updateCountdown();
    setInterval(updateCountdown,1000);
  }

  const dialog = document.querySelector('.article-dialog');
  if (dialog) {
    let opener;
    document.querySelectorAll('[data-article]').forEach(button => button.addEventListener('click',() => {
      opener=button;
      dialog.querySelector('.article-content').replaceChildren(document.querySelector(`#article-${button.dataset.article}`).content.cloneNode(true));
      dialog.showModal();
      dialog.scrollTop=0;
      document.body.style.overflow='hidden';
      dialog.querySelector('.article-close').focus();
    }));
    dialog.querySelector('.article-close').addEventListener('click',() => dialog.close());
    dialog.addEventListener('click',event => {
      const box=dialog.getBoundingClientRect();
      if(event.target===dialog && (event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom))dialog.close();
    });
    dialog.addEventListener('close',() => {document.body.style.overflow='';opener?.focus({preventScroll:true});});
  }
})();
