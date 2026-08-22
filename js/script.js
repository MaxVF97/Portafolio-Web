(function(){
  "use strict";
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Nav scroll state + active link */
  var nav = document.getElementById('nav');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var sections = ['inicio','perfil','stack','experiencia','proyecto'];
  function onScroll(){
    nav.classList.toggle('scrolled', window.scrollY > 20);
    var pos = window.scrollY + window.innerHeight * 0.3;
    var current = sections[0];
    sections.forEach(function(id){
      var el = document.getElementById(id);
      if(!el) return;
      if(pos >= el.offsetTop) current = id;
    });
    navLinks.forEach(function(a){
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* Typewriter */
  var roles = [
    "Ingeniero en Informática",
    "Infraestructura Crítica & ATMs",
    "Soporte de Campo · Redes",
    "Desarrollo Web — HTML · CSS · JS",
    "Asistido por IA — Claude"
  ];
  var target = document.getElementById('type-target');
  if(reduceMotion){
    target.textContent = roles[0];
  } else {
    var ri = 0, ci = 0, deleting = false;
    function tick(){
      var word = roles[ri % roles.length];
      if(!deleting){
        ci++;
        target.textContent = word.slice(0, ci);
        if(ci >= word.length){ deleting = true; setTimeout(tick, 1700); return; }
        setTimeout(tick, 55);
      } else {
        ci--;
        target.textContent = word.slice(0, ci);
        if(ci <= 0){ deleting = false; ri++; setTimeout(tick, 300); return; }
        setTimeout(tick, 28);
      }
    }
    setTimeout(tick, 500);
  }

  /* Floating terminal tokens */
  var TOKENS = [
    {t:"ping -t 8.8.8.8", c:""},
    {t:"SLA: 99.9%", c:"green"},
    {t:"ATM: OK", c:"green"},
    {t:"ipconfig /all", c:""},
    {t:"systemctl status", c:""},
    {t:"git push origin main", c:"green"},
    {t:"fetch('pokeapi.co')", c:"amber"},
    {t:"async/await", c:""},
    {t:"SELECT * FROM logs", c:""},
    {t:"claude —guided", c:"amber"},
    {t:"Diebold · NCR", c:""},
    {t:"TCP/IP", c:""},
    {t:"Bubble.io", c:"amber"},
    {t:"localStorage.set()", c:""},
    {t:"200 OK", c:"green"},
    {t:"ssh soporte@nodo12", c:""}
  ];
  var layer = document.getElementById('token-layer');
  var active = 0, MAX = 14;
  function spawn(){
    if(!layer || active >= MAX || reduceMotion) return;
    var item = TOKENS[Math.floor(Math.random()*TOKENS.length)];
    var el = document.createElement('span');
    el.className = 'token' + (item.c ? ' ' + item.c : '');
    el.textContent = item.t;
    el.style.left = (4 + Math.random()*88) + '%';
    el.style.animationDuration = (6 + Math.random()*7) + 's';
    el.style.animationDelay = (Math.random()*1.2) + 's';
    el.style.fontSize = (9.5 + Math.random()*4) + 'px';
    layer.appendChild(el);
    active++;
    el.addEventListener('animationend', function(){
      el.remove(); active--;
      setTimeout(spawn, Math.random()*700);
    }, {once:true});
  }
  if(!reduceMotion){
    for(var i=0;i<MAX;i++){ setTimeout(spawn, i*400 + Math.random()*400); }
  }

  /* Network particle canvas */
  var canvas = document.getElementById('net-canvas');
  if(canvas && !reduceMotion){
    var ctx = canvas.getContext('2d');
    var pts = [], raf;
    function resize(){
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
    function init(){
      resize();
      var n = Math.min(Math.floor((canvas.width*canvas.height)/16000), 90);
      pts = [];
      for(var i=0;i<n;i++){
        pts.push({
          x: Math.random()*canvas.width, y: Math.random()*canvas.height,
          vx:(Math.random()-0.5)*0.25, vy:(Math.random()-0.5)*0.25,
          r: Math.random()*1.2+0.4
        });
      }
    }
    function draw(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pts.forEach(function(p){
        p.x += p.vx; p.y += p.vy;
        if(p.x<0||p.x>canvas.width) p.vx*=-1;
        if(p.y<0||p.y>canvas.height) p.vy*=-1;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = 'rgba(49,215,232,0.5)';
        ctx.fill();
      });
      for(var i=0;i<pts.length;i++){
        for(var j=i+1;j<pts.length;j++){
          var dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d2=dx*dx+dy*dy;
          if(d2 < 130*130){
            ctx.globalAlpha = (1 - Math.sqrt(d2)/130) * 0.12;
            ctx.strokeStyle = '#31d7e8';
            ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }
    init(); draw();
    window.addEventListener('resize', init);
  }
})();
