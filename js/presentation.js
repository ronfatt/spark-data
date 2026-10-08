/**
 * Spark One - Presentation Controller (Enhanced with Audio & Rolling Counters)
 */

document.addEventListener('DOMContentLoaded', () => {
  const sections = Array.from(document.querySelectorAll('.slide-section'));
  const totalSlides = sections.length;
  let currentIndex = 0;
  let isSlideMode = true;
  let isWheelThrottled = false;

  // DOM Elements
  const counterEl = document.getElementById('nav-page-counter');
  const progressBar = document.getElementById('presentation-progress-fill');
  const prevBtn = document.getElementById('arrow-prev');
  const nextBtn = document.getElementById('arrow-next');
  const modeToggleBtn = document.getElementById('mode-toggle-btn');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerList = document.getElementById('drawer-list');
  const drawerBtn = document.getElementById('drawer-toggle-btn');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const helpBtn = document.getElementById('help-btn');
  const helpModal = document.getElementById('help-modal');
  const helpCloseBtn = document.getElementById('help-close-btn');
  const soundBtn = document.getElementById('sound-toggle-btn');

  // Build Outline in Drawer
  function initDrawer() {
    if (!drawerList) return;
    drawerList.innerHTML = '';
    sections.forEach((sec, idx) => {
      const title = sec.getAttribute('data-title') || `Slide ${idx + 1}`;
      const item = document.createElement('a');
      item.className = `drawer-item ${idx === currentIndex ? 'active' : ''}`;
      item.href = `#slide-${idx + 1}`;
      item.innerHTML = `
        <span class="drawer-item-num">${String(idx + 1).padStart(2, '0')}</span>
        <span class="drawer-item-title">${title}</span>
      `;
      item.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(idx);
        closeDrawer();
      });
      drawerList.appendChild(item);
    });
  }

  function updateNavigation() {
    // Update counter
    if (counterEl) {
      counterEl.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`;
    }

    // Update Progress Bar
    if (progressBar) {
      const pct = ((currentIndex + 1) / totalSlides) * 100;
      progressBar.style.width = `${pct}%`;
    }

    // Update Button Disabled State
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === totalSlides - 1;

    // Update Drawer Active Item
    const drawerItems = document.querySelectorAll('.drawer-item');
    drawerItems.forEach((item, idx) => {
      item.classList.toggle('active', idx === currentIndex);
    });

    // Update URL hash without jitter
    history.replaceState(null, null, `#slide-${currentIndex + 1}`);
  }

  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentIndex = index;

    if (window.SparkSound && typeof window.SparkSound.playSlide === 'function') {
      window.SparkSound.playSlide();
    }

    if (isSlideMode) {
      sections.forEach((sec, idx) => {
        sec.classList.toggle('active', idx === currentIndex);
      });
    } else {
      sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
    }

    updateNavigation();

    // Trigger dynamic counter animations for the new active section
    if (window.triggerSectionCounters) {
      setTimeout(() => {
        window.triggerSectionCounters(sections[currentIndex]);
      }, 150);
    }
  }

  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      goToSlide(currentIndex + 1);
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  }

  // Toggle Mode (Slide vs Scroll)
  function toggleMode(targetMode) {
    if (targetMode === 'slide' || (targetMode === undefined && !isSlideMode)) {
      isSlideMode = true;
      document.body.classList.remove('mode-scroll');
      document.body.classList.add('mode-slide');
      if (modeToggleBtn) {
        modeToggleBtn.innerHTML = `<span>幻灯片模式</span>`;
      }
      goToSlide(currentIndex);
    } else {
      isSlideMode = false;
      document.body.classList.remove('mode-slide');
      document.body.classList.add('mode-scroll');
      if (modeToggleBtn) {
        modeToggleBtn.innerHTML = `<span>流式长卷</span>`;
      }
      setTimeout(() => {
        sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }

  const isDeckOpen = () => {
    const modal = document.getElementById('presentation-modal-container');
    return modal && modal.classList.contains('open');
  };

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!isDeckOpen()) return;

    if (e.key === 'Escape') {
      closeDrawer();
      closeHelp();
      const modal = document.getElementById('presentation-modal-container');
      if (modal) {
        modal.classList.remove('open');
        document.body.classList.remove('mode-slide');
        document.body.style.overflow = '';
      }
      return;
    }

    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        prevSlide();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(totalSlides - 1);
        break;
      case 'f':
      case 'F':
        toggleFullscreen();
        break;
      case 'm':
      case 'M':
        toggleMode();
        break;
      case 'o':
      case 'O':
        toggleDrawer();
        break;
      case '?':
      case 'h':
      case 'H':
        toggleHelp();
        break;
    }
  });

  // Wheel Throttle for Slide Mode (only when deck modal is open)
  window.addEventListener('wheel', (e) => {
    if (!isDeckOpen()) return;
    if (!isSlideMode) return;
    if (isWheelThrottled) return;

    if (Math.abs(e.deltaY) > 35) {
      isWheelThrottled = true;
      if (e.deltaY > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setTimeout(() => {
        isWheelThrottled = false;
      }, 600);
    }
  }, { passive: true });

  // Touch Swipe (only when deck modal is open)
  let touchStartX = 0;
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    if (!isDeckOpen()) return;
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (!isDeckOpen()) return;
    if (!isSlideMode) return;
    const diffX = e.changedTouches[0].screenX - touchStartX;
    const diffY = e.changedTouches[0].screenY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX < 0) nextSlide();
      else prevSlide();
    } else if (Math.abs(diffY) > 60) {
      if (diffY < 0) nextSlide();
      else prevSlide();
    }
  }, { passive: true });

  // Scroll Observation for Scroll Mode
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (isSlideMode) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = sections.indexOf(entry.target);
          if (idx !== -1) {
            currentIndex = idx;
            updateNavigation();
            if (window.triggerSectionCounters) {
              window.triggerSectionCounters(entry.target);
            }
          }
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(sec => observer.observe(sec));
  }

  // Fullscreen
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }

  // Drawer
  function toggleDrawer() {
    drawerBackdrop.classList.toggle('open');
  }
  function closeDrawer() {
    drawerBackdrop.classList.remove('open');
  }

  // Help
  function toggleHelp() {
    helpModal.classList.toggle('open');
  }
  function closeHelp() {
    helpModal.classList.remove('open');
  }

  // Sound Toggle
  if (soundBtn && window.SparkSound) {
    soundBtn.addEventListener('click', () => {
      const active = window.SparkSound.toggle();
      soundBtn.classList.toggle('active', active);
      soundBtn.innerHTML = active ? `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      ` : `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      `;
    });
  }

  // Event Listeners
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (modeToggleBtn) modeToggleBtn.addEventListener('click', () => toggleMode());
  if (drawerBtn) drawerBtn.addEventListener('click', toggleDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', (e) => {
      if (e.target === drawerBackdrop) closeDrawer();
    });
  }
  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);
  if (helpBtn) helpBtn.addEventListener('click', toggleHelp);
  if (helpCloseBtn) helpCloseBtn.addEventListener('click', closeHelp);

  // Parse initial Hash
  function parseHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#slide-')) {
      const num = parseInt(hash.replace('#slide-', ''), 10);
      if (!isNaN(num) && num >= 1 && num <= totalSlides) {
        return num - 1;
      }
    }
    return 0;
  }

  // Init
  initDrawer();
  const initIndex = parseHash();
  goToSlide(initIndex);
});
