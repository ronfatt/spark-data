/**
 * Spark One - High-Tech & Trendy Interactive Enhancements
 * Features:
 * 1. Web Audio API Cyber Synthesizer (Zero external audio files, purely synthetic SFX)
 * 2. Mouse Cursor Spotlight & 3D Card Tilt
 * 3. Interactive Cursor Sparkle Particle Trail
 * 4. Number Roll Counter on Slide Activation
 * 5. Phone App Interactive Chart Tabs (1D, 1W, 1M, 1Y, ALL)
 * 6. S1-S9 Interactive Ladder Step Inspection
 * 7. Stock Chart Interactive Tooltip
 */

(function() {
  // ==========================================
  // 1. Web Audio API Cyber Sound Synthesizer
  // ==========================================
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Soft Cyber Blip for hover
  function playBlipSound() {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch(e) {}
  }

  // Futuristic Slide Switch Whoosh
  function playSlideSound() {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.16);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.16);

      gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.16);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.16);
    } catch(e) {}
  }

  // Expose sound triggers to global presentation
  window.SparkSound = {
    playSlide: playSlideSound,
    playBlip: playBlipSound,
    toggle: function() {
      soundEnabled = !soundEnabled;
      return soundEnabled;
    },
    isEnabled: function() {
      return soundEnabled;
    }
  };

  // ==========================================
  // 2. Mouse Cursor Spotlight & 3D Card Tilt
  // ==========================================
  function initSpotlightAndTilt() {
    const cards = document.querySelectorAll('.glass-card, .ladder-card, .crit-card, .pain-card, .stage-card');

    cards.forEach(card => {
      // Spotlight gradient tracking
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Subtle 3D Tilt calculation
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseenter', () => {
        playBlipSound();
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ==========================================
  // 3. Interactive Cursor Sparkle Trail
  // ==========================================
  function initCursorTrail() {
    const trailCanvas = document.createElement('canvas');
    trailCanvas.id = 'cursor-trail-canvas';
    trailCanvas.style.position = 'fixed';
    trailCanvas.style.top = '0';
    trailCanvas.style.left = '0';
    trailCanvas.style.width = '100vw';
    trailCanvas.style.height = '100vh';
    trailCanvas.style.pointerEvents = 'none';
    trailCanvas.style.zIndex = '9999';
    document.body.appendChild(trailCanvas);

    const ctx = trailCanvas.getContext('2d');
    let width = trailCanvas.width = window.innerWidth;
    let height = trailCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = trailCanvas.width = window.innerWidth;
      height = trailCanvas.height = window.innerHeight;
    });

    const particles = [];
    let mouse = { x: -100, y: -100 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 8,
          y: mouse.y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 2.5 + 1.2,
          life: 1,
          decay: Math.random() * 0.035 + 0.02,
          color: Math.random() > 0.5 ? '0, 240, 255' : '168, 85, 247'
        });
      }
    });

    function renderTrail() {
      ctx.clearRect(0, 0, width, height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.life * 0.8})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(${p.color}, 0.8)`;
        ctx.fill();
      }
      requestAnimationFrame(renderTrail);
    }
    renderTrail();
  }

  // ==========================================
  // 4. Number Roll Counter Animation
  // ==========================================
  function animateNumbers(container) {
    if (!container) return;
    const counterEls = container.querySelectorAll('[data-counter-target]');

    counterEls.forEach(el => {
      const target = parseFloat(el.getAttribute('data-counter-target'));
      const prefix = el.getAttribute('data-counter-prefix') || '';
      const suffix = el.getAttribute('data-counter-suffix') || '';
      const decimals = parseInt(el.getAttribute('data-counter-decimals') || '0', 10);
      const duration = 900; // ms
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = target * ease;

        let formatted = current.toFixed(decimals);
        if (decimals === 0 && target >= 1000) {
          formatted = Math.floor(current).toLocaleString();
        }

        el.textContent = `${prefix}${formatted}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }
      requestAnimationFrame(update);
    });
  }

  window.triggerSectionCounters = function(section) {
    animateNumbers(section);
  };

  // ==========================================
  // 5. Interactive Phone App Simulation (Page 13)
  // ==========================================
  function initPhoneApp() {
    const tabs = document.querySelectorAll('.phone-tab');
    const assetEl = document.querySelector('.phone-asset-val');
    const returnEl = document.querySelector('.phone-return-val');
    const svgPath = document.querySelector('.phone-chart-path');

    if (!tabs.length || !svgPath) return;

    const dataMap = {
      '1D': { asset: '$ 128,230.45', ret: '+0.84%', path: 'M 0 38 Q 40 35 70 28 T 130 32 T 180 18 L 200 15' },
      '1W': { asset: '$ 126,110.00', ret: '+3.42%', path: 'M 0 35 Q 50 40 90 22 T 140 18 T 175 12 L 200 10' },
      '1M': { asset: '$ 128,230.45', ret: '+12.36%', path: 'M 0 35 Q 30 30 60 20 T 120 25 T 180 8 L 200 5' },
      '3M': { asset: '$ 119,450.80', ret: '+16.50%', path: 'M 0 40 Q 45 35 90 28 T 135 15 T 170 10 L 200 4' },
      '1Y': { asset: '$ 98,200.00', ret: '+32.80%', path: 'M 0 42 Q 40 38 80 25 T 130 18 T 170 12 L 200 3' },
      'ALL': { asset: '$ 50,000.00', ret: '+156.46%', path: 'M 0 44 Q 30 40 70 30 T 120 16 T 160 8 L 200 2' }
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.stopPropagation();
        playBlipSound();
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const key = tab.textContent.trim();
        const conf = dataMap[key];
        if (conf) {
          if (assetEl) assetEl.textContent = conf.asset;
          if (returnEl) returnEl.textContent = `${conf.ret} Selected`;
          svgPath.setAttribute('d', conf.path);
        }
      });
    });
  }

  // ==========================================
  // 6. Interactive S1-S9 Ladder Inspection
  // ==========================================
  function initLadderInspection() {
    const steps = document.querySelectorAll('.stair-step');
    steps.forEach((step, idx) => {
      step.addEventListener('click', () => {
        playBlipSound();
        steps.forEach(s => s.classList.remove('inspecting'));
        step.classList.add('inspecting');
      });
    });
  }

  // Init on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initSpotlightAndTilt();
    initCursorTrail();
    initPhoneApp();
    initLadderInspection();

    // Trigger initial slide counters
    const initialSlide = document.querySelector('.slide-section.active');
    if (initialSlide) {
      setTimeout(() => animateNumbers(initialSlide), 300);
    }
  });

})();
