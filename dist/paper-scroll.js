(() => {
  'use strict';
  const root = document.documentElement;
  const sheet = document.querySelector('.page-sheet');
  if (!sheet) {root.classList.remove('paper-entering');return;}
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const canonical = path => path.replace(/\/+$/, '').replace(/\/index(?:\.html)?$/, '').replace(/\.html$/, '') || '/';
  // Resolve beside this script so previews and GitHub subfolders behave like the live root.
  const base = new URL('.', document.currentScript?.src || document.baseURI);
  const allowed = new Set(['index.html','manufacturing.html','powder-coating.html','academy.html']
    .map(page => canonical(new URL(page, base).pathname)));
  const key = 'northstate-paper-scroll';
  let busy=false, stage=null, roller=null, imprint=null, animation=0, destination=null, watchdog=0;
  let offset=0, width=0, height=0, direction=null, committed=false;

  function clean() {
    cancelAnimationFrame(animation);
    clearTimeout(watchdog);
    clearTimeout(window.paperScrollSafety);
    root.classList.remove('paper-entering','paper-active','paper-unrolling');
    sheet.style.clipPath='';
    sheet.inert=false;
    sheet.removeAttribute('aria-busy');
    stage?.remove();
    stage=roller=imprint=null;
    busy=false; direction=null; destination=null; committed=false;
  }
  window.paperScrollReset=clean;

  function endCap(reverse=false) {
    let path='';
    for(let i=0;i<=105;i++) {
      const t=i/105, angle=t*Math.PI*5, radius=1-t*.93;
      const x=22+Math.cos(angle)*(reverse?-19:19)*radius;
      const y=50+Math.sin(angle)*46*radius;
      path+=(i?'L':'M')+x.toFixed(2)+' '+y.toFixed(2);
    }
    return `<svg class="paper-roll-end" viewBox="0 0 44 100" preserveAspectRatio="none" aria-hidden="true"><ellipse cx="22" cy="50" rx="20" ry="49" fill="#20262c" stroke="#78838b" stroke-opacity=".6" stroke-width=".8"/><ellipse cx="22" cy="50" rx="17.5" ry="44" fill="#151a20"/><path d="${path}" fill="none" stroke="#929b9f" stroke-opacity=".55" stroke-width=".7"/></svg>`;
  }
  function start(mode) {
    busy=true; direction=mode;
    offset=scrollY;
    width=innerWidth;
    height=innerHeight;
    // The copy supplies a compressed impression of the actual print on the curl.
    const copy=sheet.cloneNode(true);
    copy.className='page-sheet paper-imprint-sheet';
    copy.removeAttribute('id'); copy.removeAttribute('style');
    copy.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
    copy.querySelectorAll('script,dialog,template').forEach(node => node.remove());
    copy.setAttribute('aria-hidden','true'); copy.inert=true;
    copy.style.width=`${document.documentElement.clientWidth}px`;
    stage=document.createElement('div');
    stage.className='paper-scroll-stage';stage.setAttribute('aria-hidden','true');stage.inert=true;
    stage.innerHTML=`<div class="paper-roller"><div class="paper-roller-face"><div class="paper-imprint"></div></div>${endCap()}${endCap(true)}<div class="paper-roller-edge"></div></div>`;
    stage.querySelector('.paper-imprint').append(copy);
    document.body.append(stage);
    roller=stage.querySelector('.paper-roller');imprint=copy;
    root.classList.add('paper-active');
    if(mode==='in')root.classList.add('paper-unrolling');
    sheet.inert=true;sheet.setAttribute('aria-busy','true');
    render(mode==='in'?0:1);
  }
  function render(open) {
    if(!roller)return;
    const edge=(height+66)*open;
    const thickness=96-84*open;
    const y=Math.max(20,edge-thickness*.5);
    roller.style.transform=`translateY(${y-20}px)`;
    roller.style.height=`${thickness}px`;
    roller.style.setProperty('--roll-grain',`${open*170}px`);
    const sheetTop=sheet.getBoundingClientRect().top;
    const top=Math.max(0,-sheetTop);
    const visible=Math.min(height,edge);
    const bottom=Math.max(0,sheet.offsetHeight-top-visible);
    sheet.style.clipPath=`inset(${top}px 0 ${bottom}px 0)`;
    imprint.style.top=`${-(offset+edge-35)*.44}px`;
  }
  function animate(from,to,duration,done) {
    const startTime=performance.now();
    const tick=now => {
      const t=Math.min(1,(now-startTime)/duration);
      // Smooth acceleration, with enough travel time to read as a physical roll.
      const ease=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
      render(from+(to-from)*ease);
      if(t<1)animation=requestAnimationFrame(tick);else done();
    };
    animation=requestAnimationFrame(tick);
  }
  function navigate() {
    if(!destination||committed)return;
    committed=true;
    const target=destination;
    try{sessionStorage.setItem(key,JSON.stringify({path:canonical(target.pathname),search:target.search,at:Date.now()}));}catch(_){}
    location.assign(target.href);
    // If the browser cannot leave, return the current document to a usable state.
    watchdog=setTimeout(clean,4500);
  }
  document.addEventListener('click',event => {
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const link=event.target.closest('a[href]');
    if(!link||link.hasAttribute('download')||(link.target&&link.target!=='_self'))return;
    const url=new URL(link.href,location.href);
    if(url.origin!==location.origin||!allowed.has(canonical(url.pathname)))return;
    if(canonical(url.pathname)===canonical(location.pathname)&&url.search===location.search)return;
    if(reduced.matches)return;
    event.preventDefault();
    if(busy)return;
    destination=url;
    try {
      start('out');
      animate(1,0,720,navigate);
      watchdog=setTimeout(navigate,1400);
    } catch(_) {clean();location.assign(url.href);}
  });

  // Freeze the viewport being rolled without hiding its scrollbar or shifting its width.
  const preventScroll=event => {if(busy)event.preventDefault();};
  addEventListener('wheel',preventScroll,{passive:false});
  addEventListener('touchmove',preventScroll,{passive:false});
  addEventListener('keydown',event => {
    if(busy&&['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key))event.preventDefault();
    if(busy&&event.key==='Escape'&&direction==='out'&&!committed)clean();
  });
  addEventListener('resize',() => {
    // Some preview browsers emit a load-time resize with unchanged dimensions.
    if(!busy||(innerWidth===width&&innerHeight===height))return;
    if(direction==='out'&&destination)navigate();else clean();
  });
  reduced.addEventListener('change',() => {
    if(!reduced.matches||!busy)return;
    if(direction==='out'&&destination)navigate();else clean();
  });
  addEventListener('pageshow',event => {if(event.persisted)clean();});

  if(root.classList.contains('paper-entering')) {
    if(reduced.matches){clean();return;}
    try {
      scrollTo({top:0,behavior:'instant'});
      start('in');
      animation=requestAnimationFrame(() => {
        if(!busy||direction!=='in')return;
        // Existing reveal animations must not conceal print on the opening sheet.
        sheet.querySelectorAll('.reveal').forEach(el => {
          const rect=el.getBoundingClientRect();
          if(rect.top<innerHeight&&rect.bottom>0)el.classList.add('is-visible');
        });
        animate(0,1,850,() => {
          clean();
          const main=document.querySelector('#main');
          main.setAttribute('tabindex','-1');main.focus({preventScroll:true});
          if(location.hash)document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({behavior:'instant'});
        });
      });
    }catch(_){clean();}
  }
})();
