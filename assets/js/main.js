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