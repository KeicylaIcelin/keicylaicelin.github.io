
(function(){
  if (document.getElementById('navToggle')) return;

  var css = `
  html{-webkit-text-size-adjust:100%; text-size-adjust:100%;}
  body{overflow-x:clip;}
  section[id], footer[id]{scroll-margin-top:100px;}
  .team-grid{grid-template-columns:repeat(3, minmax(0, 1fr));}
  .team-member{min-width:0;}
  .team-name, .team-role{max-width:100%; overflow-wrap:anywhere;}
  .hero > *{min-width:0;}

  .nav-toggle{
    display:none;
    width:40px; height:40px;
    border-radius:50%;
    border:1px solid var(--border);
    background:transparent;
    cursor:pointer;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:4px;
    padding:0;
    flex-shrink:0;
  }
  .nav-toggle span{
    display:block;
    width:16px; height:2px;
    background:var(--text);
    border-radius:2px;
    transition:transform .2s ease, opacity .2s ease;
  }
  .nav-toggle[aria-expanded="true"] span:nth-child(1){transform:translateY(6px) rotate(45deg);}
  .nav-toggle[aria-expanded="true"] span:nth-child(2){opacity:0;}
  .nav-toggle[aria-expanded="true"] span:nth-child(3){transform:translateY(-6px) rotate(-45deg);}

  .portfolio-dot{position:relative;}
  .portfolio-dot::after{content:""; position:absolute; inset:-9px;}

  @media (hover: none){
    [data-tip]::before, [data-tip]::after{display:none !important;}
  }

  @media (max-width: 720px){
    /* Header + menu hamburger */
    header{
      top:12px;
      margin:12px 12px 0;
      max-width:none;
      padding:10px 12px 10px 14px;
    }
    .brand{font-size:0.95rem;}
    .nav-toggle{display:flex;}
    nav.nav-links{
      display:none;
      position:absolute;
      top:calc(100% + 10px);
      left:0; right:0;
      flex-direction:column;
      padding:8px;
      background:rgba(23,30,61,0.97);
      backdrop-filter:blur(14px);
      -webkit-backdrop-filter:blur(14px);
      border:1px solid var(--border);
      border-radius:20px;
      box-shadow:0 24px 40px -18px rgba(0,0,0,0.6);
    }
    nav.nav-links.open{display:flex;}
    nav.nav-links a{
      margin:0;
      padding:14px 16px;
      border-radius:12px;
      font-size:1rem;
    }
    nav.nav-links a:hover{background:rgba(91,141,239,0.15);}

    .hero{padding:20px 20px 56px; gap:28px;}
    .hero-copy h1{font-size:clamp(1.9rem, 8vw, 2.4rem);}
    .hero-copy p{font-size:1rem;}
    .cta-row{margin-top:24px;}
    .cta-row .btn{flex:1 1 140px; justify-content:center;}

    section.block{padding:64px 20px;}
    .block-head{margin-bottom:28px;}

    .about-grid{gap:32px;}
    .about-col{padding:0;}
    .about-photo{width:190px; height:190px;}
    .about-table th, .about-table td{padding:13px 14px; font-size:0.85rem;}

    .price-toggle{width:100%; justify-content:space-between;}
    .price-label{flex:1; width:auto; font-size:0.78rem;}

    footer{padding:48px 20px 100px;}
    .team-section{padding-bottom:36px; margin-bottom:36px;}
    .team-grid{gap:10px;}
    .team-photo{width:80px; height:80px; margin-bottom:10px;}
    .team-name{font-size:0.76rem; line-height:1.3;}
    .team-role{font-size:0.68rem; line-height:1.3;}
    .footer-top{gap:24px; margin-bottom:32px;}
    .footer-top h2{max-width:none;}
    .socials{display:grid; grid-template-columns:1fr 1fr; gap:10px; width:100%;}
    .social-link{justify-content:center; padding:12px 8px; font-size:0.85rem;}

    .music-widget{right:12px; bottom:12px;}
  }

  @media (max-width: 380px){
    .socials{grid-template-columns:1fr;}
    .hero-copy h1{font-size:1.8rem;}
    .brand{font-size:0.88rem;}
  }
  `;
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  function init(){
    var header = document.querySelector('header');
    var nav = header ? header.querySelector('nav') : null;
    if (!header || !nav) return;

    if (!nav.id) nav.id = 'navLinks';
    nav.classList.add('nav-links');

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-toggle';
    toggle.id = 'navToggle';
    toggle.setAttribute('aria-label', 'Buka menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', nav.id);
    toggle.innerHTML = '<span></span><span></span><span></span>';
    header.appendChild(toggle);

    function setOpen(open){
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    }
    toggle.addEventListener('click', function(e){
      e.stopPropagation();
      setOpen(!nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ setOpen(false); });
    });
    document.addEventListener('click', function(e){
      if (!nav.contains(e.target) && e.target !== toggle) setOpen(false);
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') setOpen(false);
    });
    window.addEventListener('resize', function(){
      if (window.innerWidth > 720) setOpen(false);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
