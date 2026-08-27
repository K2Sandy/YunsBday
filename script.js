/* ============================================================
   CONFIG — EDIT EVERYTHING BELOW THIS LINE
   ============================================================ */
const CONFIG = {
  password: "bobo",
  lockHint: "",
  lockBackgroundImage: "",

  herName: "Yuna",
  yourName: "Kaka",

  letter: {
    heading: "Happy Birthday Yuna <3",
    body: "Happy birthday to someone who makes ordinary days feel a lot more fun. To the one that brings colour to my boring ass life\n\nThanks for all the daily yap sessions and putting up with me in Valorant. You bring radiant energy to everyone you interact with, and I'm glad I get to be a part of it.\nI wanted today to be more than just a text. So I built you this instead, a little corner of the internet that's just for you."
  },

  photos: [
    { src: "img/yun (1).webp", caption: "lowkey mogs" },
    { src: "img/yun (2).webp", caption: "with grandpaa" },
    { src: "img/yun (3).webp", caption: "bestie jovy" },
    { src: "img/yun (4).webp", caption: "kouhai tachi" },
    { src: "img/yun (5).webp", caption: "my future lawyer" },
    { src: "img/yun (6).webp", caption: "other grandpaa and sibs" }
  ],

  voices: [
    { label: "From Jovy", src: "audio/jovyvoice.mp4", caption: "Message from your Bestest Friendd!!!" }
  ],

  youtube: { videoId: "ALGEeejhut0" },

  reasons: [
    "our chaotic Valorant matches and how you still agree to queue up with me",
    "the way you effortlessly cheer me up on a bad day",
    "our endless daily yap sessions where we talk about absolutely nothing and everything",
    "acting all tough when you're actually a huge softie inside",
    "your stupidly contagious laugh",
    "patiently listening to me rant about the most random stuff for hours"
  ],

  italy: {
    eyebrow: "A New Adventure",
    heading: "Buon Viaggio!",
    message: "This February, you're off to explore Italy. cobblestone streets, golden sunsets, and probably way too much pasta. To make sure you get the most out of your trip, I am officially giving you a quest. Your mission is to complete everything on this list below. Bring back all the stories and picture!!!",
list: [
      { icon: "🏛️", text: "Wander the Colosseum and imagine the crowds" },
      { icon: "⛲", text: "Toss a coin into the Trevi Fountain and make a wish" },
      { icon: "🛶", text: "Take a slow gondola ride through Venice's canals" },
      { icon: "📸", text: "Take a photo 'eating' the Leaning Tower of Pisa" }
    ],
    // Small gift icon that fills the 5th spot (where the pasta quest used to be).
    // Tapping/clicking it opens this link in a new tab.
    giftLink: "https://yuns-map.vercel.app/"
  },

  wish: {
    prompt: "Close your eyes, make a wish, then tap the candle.",
    revealText: "Whatever you wished for...I hope it comes true!. And if it doesn't, I'll help you make it happen anyway."
  },

  finale: {
    bigWord: "YAY!",
    message: "That’s the end of the tour! I hope this little corner of the internet made your day a bit brighter.\n\nHappy birthday! Thanks for being one of the best people in my life.",
    gift: {
      // Add links to the file(s) you want her to download (a direct file link, a hosted
      // PDF, an image, anything). Leave a fileUrl blank to skip that slot.
      // You can add more than 2 by adding more objects to this array.
      files: [
        { fileUrl: "gift/gift.zip", fileName: "Bday Gift!!" },
        { fileUrl: "gift/Read_me_firstt.txt", fileName: "Read_me_firstt" }
      ]
    }
  }
};
/* ============================================================
   END OF CONFIG
   ============================================================ */

function rand(min, max){ return Math.random() * (max - min) + min; }
function el(tag, cls){ const e = document.createElement(tag); if(cls) e.className = cls; return e; }
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const PAGE_ORDER = ['page-intro-anim','page-letter','page-gallery','page-voices','page-music','page-reasons','page-italy','page-wish','page-finale'];
let journeyIndex = 0;

/* ---------- Populate text content ---------- */
function populateText(){
  document.title = "Happy Birthday, " + CONFIG.herName;
  if(document.getElementById('lockHint')) document.getElementById('lockHint').textContent = CONFIG.lockHint || "";
  
  if(CONFIG.lockBackgroundImage && document.getElementById('lockBgImage')){
    const bg = document.getElementById('lockBgImage');
    bg.style.backgroundImage = "url('" + CONFIG.lockBackgroundImage + "')";
    bg.style.opacity = "0.3";
  }
  
  if(document.getElementById('animName')) document.getElementById('animName').textContent = CONFIG.herName;
  if(document.getElementById('letterHeading')) document.getElementById('letterHeading').textContent = CONFIG.letter.heading;
  if(document.getElementById('letterBody')) document.getElementById('letterBody').textContent = ''; 
  if(document.getElementById('letterSign')) document.getElementById('letterSign').textContent = "— " + CONFIG.yourName;
  if(document.getElementById('italyEyebrow')) document.getElementById('italyEyebrow').textContent = CONFIG.italy.eyebrow;
  if(document.getElementById('italyHeading')) document.getElementById('italyHeading').textContent = CONFIG.italy.heading;
  if(document.getElementById('italyMsg')) document.getElementById('italyMsg').textContent = CONFIG.italy.message;
  if(document.getElementById('wishPrompt')) document.getElementById('wishPrompt').textContent = CONFIG.wish.prompt;
  if(document.getElementById('finaleTitle')) document.getElementById('finaleTitle').textContent = "Happy Birthday, " + CONFIG.herName;
  if(document.getElementById('finaleMsg')) document.getElementById('finaleMsg').textContent = CONFIG.finale.message;
  if(document.getElementById('finaleSign')) document.getElementById('finaleSign').textContent = "— " + CONFIG.yourName;
}

/* ---------- Typewriter effect ---------- */
function typeText(node, text, speed){
  if(reduceMotion || !text || !node){ if(node) node.textContent = text; return; }
  speed = speed || 22;
  let i = 0;
  node.classList.add('typing-caret');
  (function step(){
    node.textContent = text.slice(0, i);
    i++;
    if(i <= text.length){
      setTimeout(step, speed);
    } else {
      node.classList.remove('typing-caret');
    }
  })();
}


/* ---------- GSAP Intro Animation ---------- */
function playIntroAnimation() {
  const chatbox = document.querySelector(".hbd-chatbox");
  if(chatbox) {
    chatbox.innerHTML = chatbox.textContent.split("").map(char => `<span>${char}</span>`).join("");
  }

  if(typeof gsap === 'undefined') {
     console.error("GSAP library is missing!");
     goRelative(1);
     return;
  }

  // 1. Force the wrappers to be fully visible so they don't block the children
  gsap.set(".anim-step", { opacity: 1 });

  // 2. Hide all the individual pieces instantly so they don't flash on screen early
  gsap.set(".step-1 h1, .step-1 .anim-sub, .step-2 p, .step-3, .idea-1, .idea-2, .idea-3, .idea-4, .idea-5, .idea-6 span", { opacity: 0 });

  const ideaTextTrans = { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" };
  const ideaTextTransLeave = { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" };

const tl = gsap.timeline({
    onComplete: () => {
      // Give the balloons 1 second to finish flying up before shifting to the letter
      setTimeout(() => {
        goRelative(1); 
      }, 1000);
    }
  });

  tl.fromTo(".step-1 h1", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7 })
    .fromTo(".step-1 .anim-sub", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 })
    .to(".step-1", { opacity: 0, y: 10, duration: 0.7 }, "+=2")

    .fromTo(".step-2 p", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
    .to(".step-2", { opacity: 0, y: 10, duration: 0.7 }, "+=2")

    .fromTo(".step-3", { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7 })
    .to(".hbd-chatbox span", { visibility: "visible", duration: 0.05, stagger: 0.05 })
    .to(".fake-btn", { backgroundColor: "var(--rose-deep)", color: "#fff", duration: 0.1 })
    .to(".step-3", { scale: 0.2, opacity: 0, y: -150, duration: 0.5 }, "+=0.7")

    .fromTo(".idea-1", ideaTextTrans, { opacity: 1, y: 0, rotationX: 0, skewX: "0deg", duration: 0.7 })
    .to(".idea-1", { ...ideaTextTransLeave, duration: 0.7 }, "+=1.5")

    .fromTo(".idea-2", ideaTextTrans, { opacity: 1, y: 0, rotationX: 0, skewX: "0deg", duration: 0.7 })
    .to(".idea-2", { ...ideaTextTransLeave, duration: 0.7 }, "+=1.5")

    .fromTo(".idea-3", ideaTextTrans, { opacity: 1, y: 0, rotationX: 0, skewX: "0deg", duration: 0.7 })
    .to(".idea-3 strong", { scale: 1.2, x: 10, backgroundColor: "var(--rose)", color: "#fff", duration: 0.5 })
    .to(".idea-3", { ...ideaTextTransLeave, duration: 0.7 }, "+=1.5")

    .fromTo(".idea-4", ideaTextTrans, { opacity: 1, y: 0, rotationX: 0, skewX: "0deg", duration: 0.7 })
    .to(".idea-4", { ...ideaTextTransLeave, duration: 0.7 }, "+=1.5")

    .fromTo(".idea-5",
      { rotationX: 15, rotationZ: -10, skewY: "-5deg", y: 50, z: 10, opacity: 0 },
      { rotationX: 0, rotationZ: 0, skewY: "0deg", y: 0, z: 0, opacity: 1, duration: 0.7 }, "+=0.5"
    )
    .to(".idea-5 .smiley", { rotation: 90, x: 8, duration: 0.7 }, "+=0.4")
    .to(".idea-5", { scale: 0.2, opacity: 0, duration: 0.7 }, "+=2")

.fromTo(".idea-6 span",
      { scale: 3, opacity: 0, rotation: 15 },
      { scale: 1, opacity: 1, rotation: 0, ease: "expo.out", duration: 0.8, stagger: 0.2 }
    )
    .to(".idea-6 span", { scale: 3, opacity: 0, rotation: -15, ease: "expo.out", duration: 0.8, stagger: 0.2 }, "+=1")

    .fromTo(".baloons img",
      { opacity: 0.9, y: window.innerHeight },
      { opacity: 1, y: -window.innerHeight, duration: 2.5, stagger: 0.2 },
      "-=1"
    );
}

/* ---------- Gallery ---------- */
function buildGallery(){
  const grid = document.getElementById('galleryGrid');
  if(!grid) return;
  CONFIG.photos.forEach((p, i) => {
    const card = el('div', 'polaroid fold-init');
    card.style.setProperty('--tilt', (i % 2 === 0 ? '-3deg' : '3deg'));
    const frame = el('div', 'frame' + (p.src ? '' : ' empty'));
    if(p.src){
      frame.style.backgroundImage = "url('" + p.src + "')";
    } else {
      frame.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#9c4a5c" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"></rect><circle cx="8.5" cy="10.5" r="1.5"></circle><path d="M21 15l-5-5-9 9"></path></svg>';
    }
    const cap = el('p', 'caption');
    cap.textContent = p.caption || 'add a caption';
    card.appendChild(frame);
    card.appendChild(cap);
    grid.appendChild(card);
  });
}

/* ---------- Gallery fold-in animation (auto-plays, one card at a time) ---------- */
function playGalleryFold(){
  const grid = document.getElementById('galleryGrid');
  if(!grid) return;
  const cards = grid.querySelectorAll('.polaroid.fold-init');

  if(reduceMotion){
    cards.forEach(card => card.classList.remove('fold-init'));
    return;
  }

  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add('fold-play');
      card.addEventListener('transitionend', function handler(e){
        if(e.propertyName !== 'transform') return;
        card.classList.remove('fold-init', 'fold-play');
        card.removeEventListener('transitionend', handler);
      });
    }, i * 700);
  });
}

/* ---------- Voices ---------- */
function buildVoices(){
  const list = document.getElementById('voicesList');
  if(!list) return;
  CONFIG.voices.forEach(v => {
    const card = el('div', 'voice-card');
    const label = el('span', 'voice-label');
    label.textContent = v.label;
    const top = el('div', 'voice-top');
    const btn = el('button', 'play-btn');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Play voice note ' + v.label);
    btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>';
    const wf = el('div', 'waveform');
    for(let i = 0; i < 22; i++){
      const bar = el('span');
      bar.style.animationDelay = (Math.random() * 1).toFixed(2) + 's';
      wf.appendChild(bar);
    }
    top.appendChild(btn);
    top.appendChild(wf);
    const caption = el('p', 'voice-caption');
    caption.textContent = v.caption || '';
    const audio = el('audio');
    audio.preload = 'none';
    if(v.src) audio.src = v.src;

    let playing = false;
    function setIcon(isPlaying){
      btn.querySelector('svg').innerHTML = isPlaying
        ? '<rect x="6" y="5" width="4" height="14"></rect><rect x="14" y="5" width="4" height="14"></rect>'
        : '<path d="M8 5v14l11-7z"></path>';
    }
    btn.addEventListener('click', () => {
      if(!v.src){
        playing = !playing;
        wf.classList.toggle('playing', playing);
        setIcon(playing);
        return;
      }
      if(playing){ audio.pause(); } else { audio.play(); }
    });
    audio.addEventListener('play', () => { playing = true; wf.classList.add('playing'); setIcon(true); });
    audio.addEventListener('pause', () => { playing = false; wf.classList.remove('playing'); setIcon(false); });
    audio.addEventListener('ended', () => { playing = false; wf.classList.remove('playing'); setIcon(false); });

    card.appendChild(label);
    card.appendChild(top);
    card.appendChild(caption);
    card.appendChild(audio);
    list.appendChild(card);
  });
}

/* ---------- Music ---------- */
function buildMusic(){
  const embed = document.getElementById('musicEmbed');
  if(!embed) return;
  
  // Replace the YouTube iframe with a local HTML5 video tag
  embed.innerHTML = '<video id="myLocalVideo" src="vid/amazing.mp4" controls style="width:100%; height:100%; background:#000;"></video>';

  // ---- NEW: ADDING THE SONG CAPTION ----
  const caption = document.createElement('div');
  caption.style.textAlign = 'center';
  caption.innerHTML = `
    <div style="font-family: var(--font-display); font-size: 26px; color: var(--rose-deep); line-height: 1.2;">Amazing</div>
    <div style="font-family: var(--font-label); font-size: 11px; color: var(--ink-soft); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 4px;">Rex Orange County</div>
  `;
  
  // Insert the caption directly BEFORE the video box (embed)
  embed.parentNode.insertBefore(caption, embed);

  // Grab the video and the background music elements
  const vid = document.getElementById('myLocalVideo');
  const bgm = document.getElementById('bgMusic');

  if(vid && bgm) {
    // Keep the super low 1% volume for the video
    vid.volume = 0.01; 
    
    let fadeInterval; // This will hold our timer

    // Custom function to smoothly transition the volume
    function fadeTo(targetVolume) {
      clearInterval(fadeInterval); 
      
      const steps = 20; 
      const stepTime = 40; 
      const volumeStep = (targetVolume - bgm.volume) / steps;
      
      fadeInterval = setInterval(() => {
        let nextVol = bgm.volume + volumeStep;
        
        // Prevent errors by keeping the volume strictly between 0 and 1
        if (nextVol > 1) nextVol = 1;
        if (nextVol < 0) nextVol = 0;
        
        bgm.volume = nextVol;
        
        if ((volumeStep > 0 && bgm.volume >= targetVolume) || 
            (volumeStep < 0 && bgm.volume <= targetVolume)) {
          bgm.volume = targetVolume;
          clearInterval(fadeInterval);
        }
      }, stepTime);
    }

    // Fade to 0% (mute) when playing
    vid.addEventListener('play', () => { fadeTo(0); });

    // Fade back to 20% when paused or ended
    vid.addEventListener('pause', () => { fadeTo(0.2); });
    vid.addEventListener('ended', () => { fadeTo(0.2); });
  }
}

/* ---------- Reasons ---------- */
function buildReasons(){
  const grid = document.getElementById('reasonsGrid');
  if(!grid) return;
  CONFIG.reasons.forEach(reason => {
    const card = el('div', 'reason-card');
    const inner = el('div', 'reason-inner');
    const front = el('div', 'reason-face reason-front');
    front.innerHTML = '<span class="spark-shape"></span>';
    const back = el('div', 'reason-face reason-back');
    back.textContent = reason;
    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    grid.appendChild(card);
  });
}

/* ---------- Italy ---------- */
function buildItaly(){
  const list = document.getElementById('italyList');
  if(!list) return;
  CONFIG.italy.list.forEach(item => {
    const row = el('div', 'italy-item');
    row.innerHTML =
      '<span class="italy-icon">' + item.icon + '</span>' +
      '<span class="italy-text">' + item.text + '</span>';
    list.appendChild(row);
  });

  // 5th slot: a small gift icon where the pasta quest used to be.
  // Tapping it opens CONFIG.italy.giftLink in a new tab.
  const giftRow = el('div', 'italy-item italy-gift-item');
  giftRow.setAttribute('role', 'link');
  giftRow.setAttribute('tabindex', '0');
  giftRow.setAttribute('aria-label', 'Open a little surprise');
  giftRow.innerHTML =
    '<span class="italy-icon mini-gift-icon">' +
      '<span class="mini-gift-box"><span class="mini-gift-ribbon"></span></span>' +
      '<span class="mini-gift-lid"><span class="mini-gift-bow"></span></span>' +
    '</span>' +
    '<span class="italy-text">One little surprise is waiting for you...</span>';
  function openItalyGift(){
    window.open(CONFIG.italy.giftLink || 'https://yuns-map.vercel.app/', '_blank');
  }
  giftRow.addEventListener('click', openItalyGift);
  giftRow.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openItalyGift(); }
  });
  list.appendChild(giftRow);

  const container = document.getElementById('page-italy');
  const items = list.querySelectorAll('.italy-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('in-view'); });
  }, { root: container, threshold: 0.2 });
  items.forEach(i => observer.observe(i));
}

/* ---------- Big word reveal ---------- */
function buildBigReveal(){
  const holder = document.getElementById('bigReveal');
  if(!holder) return;
  const word = CONFIG.finale.bigWord || '';
  [...word].forEach((ch, i) => {
    const span = el('span', 'reveal-letter');
    span.textContent = ch === ' ' ? '\u00A0' : ch;
    if(!reduceMotion) span.style.animationDelay = (i * 0.07) + 's';
    holder.appendChild(span);
  });
}

/* ---------- Gift box ---------- */
/* ---------- Gift box ---------- */
let giftRevealBuilt = false;
function setupGift(){
  const giftWrap = document.getElementById('giftWrap');
  const giftTap = document.getElementById('giftTap');
  const giftNote = document.getElementById('giftNote');
  const finaleContent = document.getElementById('finaleContent');
  
  // NEW: Grab the "One Last Surprise" text
  const finaleEyebrow = document.querySelector('#page-finale .eyebrow'); 

  if(!giftWrap) return;

  function openGift(){
    if(giftWrap.classList.contains('opened')) return;
    giftWrap.classList.add('opened');
    if(giftTap) giftTap.classList.add('hidden');
    burstConfetti(window.innerWidth/2, window.innerHeight*0.4, 70);

    if(!giftRevealBuilt){
      giftRevealBuilt = true;
      buildBigReveal();
    }
    
    // The final text slides up at 350ms
    setTimeout(() => {
      if(finaleContent) finaleContent.classList.add('show');
    }, 350);

    const giftFiles = (CONFIG.finale.gift && CONFIG.finale.gift.files) ? CONFIG.finale.gift.files.filter(f => f && f.fileUrl) : [];
    if(giftFiles.length){
      giftFiles.forEach((file, i) => {
        setTimeout(() => {
          const a = document.createElement('a');
          a.href = file.fileUrl;
          a.download = file.fileName || '';
          document.body.appendChild(a);
          a.click();
          a.remove();
        }, i * 400);
      });
    } else if(giftNote){
      giftNote.classList.remove('hidden');
    }

    // FAST FADE: Both the gift box and the "One Last Surprise" text fade out together
    setTimeout(() => {
      giftWrap.style.transition = "opacity 0.2s ease";
      giftWrap.style.opacity = "0";
      
      if(finaleEyebrow) {
        finaleEyebrow.style.transition = "opacity 0.2s ease";
        finaleEyebrow.style.opacity = "0";
      }

      // Completely remove both from the page layout after the 0.2s fade finishes
      setTimeout(() => {
        giftWrap.style.display = "none";
        if(finaleEyebrow) finaleEyebrow.style.display = "none";
      }, 200); 
      
    }, 200); 
  }

  giftWrap.addEventListener('click', openGift);
  giftWrap.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openGift(); }
  });
}

/* ---------- Wish / candle ---------- */
function setupWish(){
  const cake = document.getElementById('cakeWrap');
  const flame = document.getElementById('flame');
  const reveal = document.getElementById('wishReveal');
  if(!cake || !flame || !reveal) return;
  let blown = false;
  function blow(){
    if(blown) return;
    blown = true;
    flame.classList.add('blown');
    reveal.textContent = CONFIG.wish.revealText;
    reveal.classList.add('show');
    burstConfetti(window.innerWidth/2, window.innerHeight/2, 40);
  }
  cake.addEventListener('click', blow);
  cake.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); blow(); } });
}

/* ---------- Math Game ---------- */
function setupMathGame(){
  const progressEl = document.getElementById('gameProgress');
  const winBlock = document.getElementById('gameWin');
  const mathContainer = document.getElementById('mathContainer');
  const questionEl = document.getElementById('mathQuestion');
  const inputEl = document.getElementById('mathInput');
  const formEl = document.getElementById('mathForm');

  if(!formEl) return;

  let currentQuestion = 1;
  const totalQuestions = 5;
  let currentAnswer = 0;

  function generateQuestion() {
    const isAddition = Math.random() > 0.5;

    if (isAddition) {
      const num1 = Math.floor(Math.random() * 900) + 100;
      const num2 = Math.floor(Math.random() * 900) + 100;
      currentAnswer = num1 + num2;
      questionEl.textContent = num1 + " + " + num2 + " = ?";
    } else {
      const num1 = Math.floor(Math.random() * 14) + 2;
      const num2 = Math.floor(Math.random() * 14) + 2;
      currentAnswer = num1 * num2;
      questionEl.textContent = num1 + " × " + num2 + " = ?";
    }
    
    inputEl.value = '';
    progressEl.textContent = "Question " + currentQuestion + " of " + totalQuestions;
  }

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const userAnswer = parseInt(inputEl.value, 10);

    if (userAnswer === currentAnswer) {
      currentQuestion++;
      burstConfetti(window.innerWidth/2, window.innerHeight*0.35, 30);

      if (currentQuestion > totalQuestions) {
        mathContainer.style.display = 'none';
        winBlock.classList.add('show');
        progressEl.textContent = "You did it!";
      } else {
        generateQuestion();
      }
    } else {
      mathContainer.classList.remove('shake');
      void mathContainer.offsetWidth; 
      mathContainer.classList.add('shake');
      inputEl.value = '';
    }
  });

  generateQuestion();

  function finishGame(){
    journeyIndex = 0;
    showPage(PAGE_ORDER[0]);
    updateNavUI();
  }
  const contBtn = document.getElementById('gameContinueBtn');
  const skipBtn = document.getElementById('gameSkipBtn');
  if(contBtn) contBtn.addEventListener('click', finishGame);
  if(skipBtn) skipBtn.addEventListener('click', finishGame);
}

/* ---------- Lock screen decor ---------- */
function buildLockDecor(){
  const decor = document.getElementById('lockDecor');
  if(!decor) return;
  for(let i = 0; i < 20; i++){
    const isDot = Math.random() > 0.6;
    const f = el('div', 'floater');
    f.style.left = rand(2, 96) + 'vw';
    f.style.setProperty('--drift', rand(-60, 60) + 'px');
    f.style.setProperty('--spin', rand(60, 220) + 'deg');
    f.style.animationDuration = rand(9, 17) + 's';
    f.style.animationDelay = '-' + rand(0, 17) + 's';
    const shape = el('div', isDot ? 'dot-shape' : 'spark-shape');
    shape.style.transform = 'scale(' + rand(0.6, 1.5).toFixed(2) + ')';
    shape.style.opacity = rand(0.45, 0.9).toFixed(2);
    f.appendChild(shape);
    decor.appendChild(f);
  }
  for(let i = 0; i < 12; i++){
    const t = el('div', 'twinkler');
    t.style.left = rand(3, 97) + 'vw';
    t.style.top = rand(4, 90) + 'vh';
    t.style.animationDuration = rand(1.8, 3.6) + 's';
    t.style.animationDelay = '-' + rand(0, 3) + 's';
    const shape = el('div', 'spark-shape');
    shape.style.transform = 'scale(' + rand(0.4, 0.85).toFixed(2) + ')';
    t.appendChild(shape);
    decor.appendChild(t);
  }
}

function buildFinaleHearts(){
  const layer = document.getElementById('finaleHearts');
  if(!layer) return;
  for(let i = 0; i < 14; i++){
    const f = el('div', 'floater');
    f.style.left = rand(2, 96) + '%';
    f.style.bottom = 'auto';
    f.style.top = rand(-20, 100) + '%';
    f.style.setProperty('--drift', rand(-40, 40) + 'px');
    f.style.setProperty('--spin', rand(40, 160) + 'deg');
    f.style.animationDuration = rand(10, 18) + 's';
    f.style.animationDelay = '-' + rand(0, 18) + 's';
    const shape = el('div', 'spark-shape');
    shape.style.background = '#ffffff';
    shape.style.opacity = rand(0.2, 0.5).toFixed(2);
    shape.style.transform = 'scale(' + rand(0.5, 1.2).toFixed(2) + ')';
    f.appendChild(shape);
    layer.appendChild(f);
  }
}

function burstConfetti(x, y, count){
  if(reduceMotion) return;
  const layer = document.getElementById('confettiLayer');
  if(!layer) return;
  const colors = ['#d98fa0','#f0d8dc','#c9a66b','#9c4a5c','#b79aa6'];
  for(let i = 0; i < count; i++){
    const piece = el('div', 'confetti-piece');
    const size = rand(6, 11);
    piece.style.width = size + 'px';
    piece.style.height = (size * rand(0.4, 1)) + 'px';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.left = (x + rand(-140, 140)) + 'px';
    piece.style.top = (y + rand(-40, 40)) + 'px';
    piece.style.setProperty('--spin', rand(360, 900) + 'deg');
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    const dur = rand(1.6, 3);
    piece.style.animationDuration = dur + 's';
    layer.appendChild(piece);
    setTimeout(() => piece.remove(), dur * 1000 + 100);
  }
}

/* ---------- Page display + navigation ---------- */
function showPage(id){
  const current = document.querySelector('.page.active');
  const target = document.getElementById(id);
  if(!target || current === target) return;

  if(current){
    current.classList.remove('active');
    setTimeout(() => { if(!current.classList.contains('active')) current.style.display = 'none'; }, 450);
  }
  target.style.display = 'block';
  void target.offsetWidth;
  target.classList.add('active');
  target.scrollTop = 0;

  // --- TRIGGER GSAP INTRO ---
  if (id === 'page-intro-anim' && !target.dataset.played) {
    target.dataset.played = 'true';
    setTimeout(playIntroAnimation, 600); 
  }

  // --- TRIGGER GALLERY FOLD-IN ---
  if (id === 'page-gallery' && !target.dataset.folded) {
    target.dataset.folded = 'true';
    setTimeout(playGalleryFold, 350);
  }

  // --- TRIGGER LETTER TYPING ---
  if (id === 'page-letter' && !target.dataset.typed) {
    target.dataset.typed = 'true'; 
    const letterBody = document.getElementById('letterBody');
    if(letterBody) {
      setTimeout(() => {
        typeText(letterBody, CONFIG.letter.body, 40);
      }, 600);
    }
  }
}

function updateNavUI(){
  document.querySelectorAll('.page-nav').forEach(nav => {
    const back = nav.querySelector('[data-nav="back"]');
    const next = nav.querySelector('[data-nav="next"]');
    const count = nav.querySelector('.page-count');
    if(back) back.classList.toggle('hidden', journeyIndex === 0);
    if(next) next.classList.toggle('hidden', journeyIndex === PAGE_ORDER.length - 1);
    if(count) count.textContent = 'Page ' + (journeyIndex + 1) + ' of ' + PAGE_ORDER.length;
  });
}

function goRelative(delta){
  const newIndex = journeyIndex + delta;
  if(newIndex < 0 || newIndex >= PAGE_ORDER.length) return;
  journeyIndex = newIndex;
  showPage(PAGE_ORDER[journeyIndex]);
  updateNavUI();
}

function setupNavigation(){
  document.querySelectorAll('[data-nav="back"]').forEach(b => b.addEventListener('click', () => goRelative(-1)));
  document.querySelectorAll('[data-nav="next"]').forEach(b => b.addEventListener('click', () => goRelative(1)));
}

/* ---------- Password gate ---------- */
function setupLock(){
  const form = document.getElementById('lockCard');
  const input = document.getElementById('passwordInput');
  const error = document.getElementById('lockError');
  const lockScreen = document.getElementById('lockScreen');
  const iconWrap = document.getElementById('lockIconWrap');
  const shackle = document.getElementById('lockShackle');
  const app = document.getElementById('app');

  if(!form || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const entered = input.value.trim().toLowerCase();
    const correct = CONFIG.password.trim().toLowerCase();

    if(entered === correct){
      iconWrap.classList.add('unlocked');
      shackle.setAttribute('d', 'M8 10V7a4 4 0 0 1 7.4-2.1');
      error.classList.remove('show');
      burstConfetti(window.innerWidth/2, window.innerHeight*0.35, 90);
      
      const bgm = document.getElementById('bgMusic');
      if(bgm) {
        bgm.volume = 0.1; // Biar suaranya nggak terlalu berisik (0.5 = 50% volume)
        bgm.play();
      }

      setTimeout(() => {
        lockScreen.classList.add('hidden-lock');
        app.classList.add('visible');
        showPage('page-game');
      }, 650);
    } else {
      error.classList.add('show');
      form.classList.remove('shake');
      void form.offsetWidth;
      form.classList.add('shake');
    }
  });
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  populateText();
  buildGallery();
  buildVoices();
  buildMusic();
  buildReasons();
  buildItaly();
  setupWish();
  setupGift();
  setupMathGame(); 
  buildLockDecor();
  buildFinaleHearts();
  setupNavigation();
  updateNavUI();
  setupLock();
});