/**
 * JIA Learning - Interactive Logic
 * Handles Accordions, Filtering, Video Modal, Tabs, and Live Timers
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
    });
  }

  // 2. Sticky Navbar scroll effect
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  });

  // 3. Hero CBT Mockup Interactive Tabs
  const cbtTabs = document.querySelectorAll('.cbt-tab-btn');
  const cbtTestTitle = document.querySelector('.cbt-test-title');
  const cbtScoreTarget = document.querySelector('.cbt-score-target strong');

  if (cbtTabs.length) {
    const tabContents = {
      jadwal: {
        title: 'Try Out Akbar TKA Seri 1 - 2027',
        target: '850+ Poin'
      },
      analisis: {
        title: 'Rapor Kemampuan Subtes & Analisis Kelemahan',
        target: 'Top 5% Nasional'
      },
      soal: {
        title: 'Bedah 30 Soal HOTS Matematika & Sains',
        target: 'Target Akurasi 90%'
      },
      profil: {
        title: 'Portofolio Nilai Pejuang SMA Unggulan',
        target: 'Target: SMA Pradita'
      }
    };

    cbtTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        cbtTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const key = tab.getAttribute('data-tab');
        if (tabContents[key] && cbtTestTitle && cbtScoreTarget) {
          cbtTestTitle.textContent = tabContents[key].title;
          cbtScoreTarget.textContent = tabContents[key].target;
        }
      });
    });
  }

  // 4. Hero Countdown Timer
  const timerBadge = document.getElementById('cbtTimer');
  if (timerBadge) {
    let secondsLeft = 42 * 60 + 15; // 42 minutes 15 seconds
    setInterval(() => {
      if (secondsLeft > 0) {
        secondsLeft--;
        const mins = Math.floor(secondsLeft / 60);
        const secs = secondsLeft % 60;
        timerBadge.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      }
    }, 1000);
  }

  // 5. FAQ Accordion Expand / Collapse
  const accordionItems = document.querySelectorAll('.accordion-item');
  if (accordionItems.length) {
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      if (header) {
        header.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          
          // Optional: close other accordions
          accordionItems.forEach(other => {
            if (other !== item) other.classList.remove('active');
          });

          item.classList.toggle('active', !isActive);
        });
      }
    });
  }

  // 6. FAQ Search Filter
  const faqSearchInput = document.getElementById('faqSearchInput');
  if (faqSearchInput && accordionItems.length) {
    faqSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      accordionItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // 7. Generic Filter Tabs (Program, Testimoni, FAQ categories)
  const filterTabs = document.querySelectorAll('.filter-tab');
  if (filterTabs.length) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const group = tab.parentElement.querySelectorAll('.filter-tab');
        group.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-filter');
        const filterGroup = tab.parentElement.getAttribute('data-target-group');

        if (filterGroup) {
          const cards = document.querySelectorAll(`[data-group="${filterGroup}"]`);
          cards.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            if (!category || category === 'all' || cardCat === category || cardCat?.includes(category)) {
              card.style.display = '';
            } else {
              card.style.display = 'none';
            }
          });
        }
      });
    });
  }

  // 8. Video Modal Popup
  const videoCards = document.querySelectorAll('.video-card');
  const videoModal = document.getElementById('videoModal');
  const modalClose = document.getElementById('modalClose');
  const videoModalTitle = document.getElementById('videoModalTitle');

  if (videoCards.length && videoModal) {
    videoCards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.querySelector('.video-card-title')?.textContent || 'Cuplikan Pembelajaran TKA';
        if (videoModalTitle) videoModalTitle.textContent = title;
        videoModal.classList.add('open');
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', () => {
        videoModal.classList.remove('open');
      });
    }

    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        videoModal.classList.remove('open');
      }
    });
  }
});
