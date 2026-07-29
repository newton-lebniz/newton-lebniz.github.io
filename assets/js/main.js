// Hero decode effect: scrambled string resolves into the name, nodding to the Caesar-cracker project.
  const target = "MANSWI PRADHAN";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const el = document.getElementById('decodeText');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function randChar(){ return chars[Math.floor(Math.random()*chars.length)]; }

  if(prefersReduced){
    el.textContent = target;
  } else {
    let revealed = 0;
    const frame = () => {
      let out = "";
      for(let i=0;i<target.length;i++){
        if(target[i] === " "){ out += " "; continue; }
        out += i < revealed ? target[i] : randChar();
      }
      el.textContent = out;
      if(revealed < target.length){
        revealed += 0.3;
        requestAnimationFrame(frame);
      } else {
        el.textContent = target;
      }
    };
    let ticks = 0;
    const interval = setInterval(() => {
      ticks++;
      let out = "";
      for(let i=0;i<target.length;i++){
        if(target[i] === " "){ out += " "; continue; }
        out += i < ticks*1.1 ? target[i] : randChar();
      }
      el.textContent = out;
      if(ticks*1.1 >= target.length){
        clearInterval(interval);
        el.textContent = target;
      }
    }, 45);
  }

  // Skill scatter-plot: swap the note panel on hover/focus of a point.
  (function(){
    const note = document.getElementById('skillNote');
    if(!note) return;
    document.querySelectorAll('.skill-point').forEach(pt => {
      const show = () => {
        note.innerHTML = '<strong>' + pt.dataset.name + '</strong>' + pt.dataset.note;
      };
      pt.addEventListener('mouseenter', show);
      pt.addEventListener('focus', show);
    });
  })();

  // Footer: one nerd joke, picked at random per load.
  (function(){
    const el = document.getElementById('footerJoke');
    if(!el) return;
    const jokes = [
      "There are only 10 kinds of people: those who understand binary, and those who don't.",
      "I would tell a UDP joke, but you might not get it.",
      "P vs NP remains open. So does the question of whether this joke is funny.",
      "My code doesn't have bugs. It has undocumented chi-squared confidence intervals."
    ];
    el.textContent = jokes[Math.floor(Math.random()*jokes.length)];
  })();

  // Easter egg: type "pi" anywhere to start streaming digits of pi in the corner.
  (function(){
    const PI_DIGITS = "14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127372458700660631558817488152092096282925409171536436789259036001133053054882046652138414695194151160943305727036575959195309218611738193261179310511854807446237996274956735188575272489122793818301194912";
    let buf = "";
    let active = false;
    let idx = 0;
    let timer = null;
    const badge = document.getElementById('piBadge');
    if(!badge) return;
    badge.addEventListener('click', (e) => { if(e.target.classList.contains('pi-close')) stop(); });
    badge.addEventListener('keydown', (e) => {
      if(e.target.classList.contains('pi-close') && (e.key === 'Enter' || e.key === ' ')) stop();
    });

    function stop(){
      active = false;
      clearInterval(timer);
      badge.classList.remove('show');
      badge.innerHTML = "";
    }
    function start(){
      if(active) return;
      active = true;
      idx = 0;
      badge.classList.add('show');
      badge.innerHTML = '<span class="pi-close" role="button" aria-label="Close" tabindex="0">✕</span>π = 3.';
      timer = setInterval(() => {
        idx++;
        badge.innerHTML = '<span class="pi-close" role="button" aria-label="Close" tabindex="0">✕</span>π = 3.' + PI_DIGITS.slice(0, idx);
        if(idx >= PI_DIGITS.length){ clearInterval(timer); }
      }, 60);
    }

    document.addEventListener('keydown', (e) => {
      if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if(e.key === 'Escape'){ stop(); return; }
      if(e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-2);
      if(buf === "pi") start();
    });
  })();