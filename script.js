// HEADER SCROLL
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// MOBILE MENU — targets header-right wrapper
const burger = document.getElementById('burger');
const headerRight = document.getElementById('headerRight');
if (burger && headerRight) {
  burger.addEventListener('click', () => {
    headerRight.classList.toggle('open');
    const spans = burger.querySelectorAll('span');
    if (headerRight.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
  // Close on link click
  headerRight.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      headerRight.classList.remove('open');
      burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

// FADE-IN
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      fadeObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
fadeEls.forEach(el => fadeObs.observe(el));

// CALCULATOR TABS
const calcTabs = document.querySelectorAll('.calc-tab');
const modeCount = document.getElementById('calcModeCount');
const modeVolume = document.getElementById('calcModeVolume');
if (calcTabs.length && modeCount && modeVolume) {
  calcTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      calcTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const result = document.getElementById('calcResult');
      const priceBtn = document.getElementById('calcPriceBtn');
      result.classList.remove('visible');
      priceBtn.classList.remove('visible');
      if (tab.dataset.mode === 'count') {
        modeCount.style.display = '';
        modeVolume.style.display = 'none';
      } else {
        modeCount.style.display = 'none';
        modeVolume.style.display = '';
      }
    });
  });
}

// CALCULATOR — by count
const calcBtn = document.getElementById('calcBtn');
if (calcBtn) {
  calcBtn.addEventListener('click', () => {
    const length = parseFloat(document.getElementById('calcLength').value);
    const width = parseFloat(document.getElementById('calcWidth').value);
    const thick = parseFloat(document.getElementById('calcThick').value);
    const count = parseInt(document.getElementById('calcCount').value);
    const type = document.getElementById('calcType').value;
    if (!type || !length || !width || !thick || !count) { alert('Заполните все поля.'); return; }

    const oneVol = length * (width / 1000) * (thick / 1000);
    const totalVol = oneVol * count;
    const perCubic = Math.floor(1 / oneVol);

    document.getElementById('resCubic').textContent = totalVol.toFixed(3);
    document.getElementById('resOneCubic').textContent = oneVol.toFixed(4);
    document.getElementById('resPerCubic').textContent = perCubic;
    document.getElementById('resCount').textContent = count;
    document.getElementById('calcResult').classList.add('visible');
    document.getElementById('calcPriceBtn').classList.add('visible');
  });
}

// CALCULATOR — by volume
const calcBtn2 = document.getElementById('calcBtn2');
if (calcBtn2) {
  calcBtn2.addEventListener('click', () => {
    const length = parseFloat(document.getElementById('calcLength2').value);
    const width = parseFloat(document.getElementById('calcWidth2').value);
    const thick = parseFloat(document.getElementById('calcThick2').value);
    const volume = parseFloat(document.getElementById('calcVolume2').value);
    const type = document.getElementById('calcType2').value;
    if (!type || !length || !width || !thick || !volume) { alert('Заполните все поля.'); return; }

    const oneVol = length * (width / 1000) * (thick / 1000);
    const count = Math.ceil(volume / oneVol);
    const totalVol = oneVol * count;
    const perCubic = Math.floor(1 / oneVol);

    document.getElementById('resCubic').textContent = totalVol.toFixed(3);
    document.getElementById('resOneCubic').textContent = oneVol.toFixed(4);
    document.getElementById('resPerCubic').textContent = perCubic;
    document.getElementById('resCount').textContent = count;
    document.getElementById('calcResult').classList.add('visible');
    document.getElementById('calcPriceBtn').classList.add('visible');
  });
}

// CATALOG FILTERS
const filterBtns = document.querySelectorAll('.filter-btn');
const catalogGrid = document.getElementById('catalogGrid');
if (filterBtns.length && catalogGrid) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      catalogGrid.querySelectorAll('.product-card').forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.style.animation = 'fadeInUp .4s ease both';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// CONTACT FORM
const formBtn = document.getElementById('formBtn');
if (formBtn) {
  formBtn.addEventListener('click', () => {
    const name = document.getElementById('formName').value.trim();
    const phone = document.getElementById('formPhone').value.trim();
    if (!name || !phone) { alert('Укажите имя и телефон.'); return; }
    formBtn.disabled = true;
    formBtn.textContent = 'Отправлено!';
    formBtn.style.background = 'var(--green-mid)';
    formBtn.style.color = 'var(--white)';
    document.getElementById('formSuccess').style.display = 'block';
  });
}
