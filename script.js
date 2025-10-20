// Ganti foto profil
const uploadInput = document.getElementById('uploadFoto');
const fotoProfil = document.getElementById('fotoProfil');

uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      fotoProfil.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// BGM dan tombol toggle + popup
const bgm = document.getElementById('bgm');
const bgmToggle = document.getElementById('bgmToggle');
const bgmPopup = document.getElementById('bgmPopup');

window.addEventListener('load', () => {
  bgmToggle.style.display = 'block';
  bgmPopup.style.display = 'block';
  setTimeout(() => {
    bgmPopup.style.display = 'none';
  }, 5000);
  updateVisitorCounter();
  animateLinks();
});

bgmToggle.addEventListener('click', () => {
  if (bgm.paused) {
    bgm.play();
    bgmToggle.classList.add('playing');
  } else {
    bgm.pause();
    bgmToggle.classList.remove('playing');
  }
});

// Animasi putar icon tombol sosial media
document.querySelectorAll('.btn .icon').forEach(icon => {
  icon.closest('a').addEventListener('click', () => {
    icon.classList.add('spin');
    setTimeout(() => icon.classList.remove('spin'), 1000);
  });
});

// Animasi tombol masuk dari kanan dan kiri secara bergantian
function animateLinks() {
  const linkButtons = document.querySelectorAll('.links-section .btn');
  linkButtons.forEach((btn, index) => {
    const isEven = index % 2 === 0;
    const animationClass = isEven ? 'animate-left' : 'animate-right';

    setTimeout(() => {
      btn.classList.add(animationClass);
    }, index * 200);
  });
}

// Visitor counter pakai localStorage
function updateVisitorCounter() {
  const counterEl = document.getElementById('visitorCounter');
  let count = localStorage.getItem('visitorCount');
  if (!count) {
    count = 0;
  }
  count = parseInt(count) + 1;
  localStorage.setItem('visitorCount', count);
  counterEl.textContent = 'Visitor Count: ' + count;
}
