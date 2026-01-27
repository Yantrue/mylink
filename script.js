// Visitor Counter
const counter = document.getElementById('visitorCounter');
let count = localStorage.getItem('visitCount') || 0;
count++;
localStorage.setItem('visitCount', count);
counter.textContent = `Kunjungan: ${count}`;

// Ganti foto
const upload = document.getElementById('uploadFoto');
const foto = document.getElementById('fotoProfil');

upload.addEventListener('change', () => {
  const file = upload.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => foto.src = e.target.result;
  reader.readAsDataURL(file);
});

// BGM
const bgm = document.getElementById('bgm');
const toggle = document.getElementById('bgmToggle');
const popup = document.getElementById('bgmPopup');
bgm.volume = 0.5;

window.addEventListener('load', () => {
  toggle.style.display = 'block';
  popup.style.display = 'block';
  setTimeout(() => popup.style.display = 'none', 5000);
});

toggle.addEventListener('click', () => {
  if (bgm.paused) {
    bgm.play();
    toggle.classList.add('playing');
  } else {
    bgm.pause();
    toggle.classList.remove('playing');
  }
});

// Spin icon
document.querySelectorAll('.btn .icon').forEach(icon => {
  icon.closest('a').addEventListener('click', () => {
    icon.classList.add('spin');
    setTimeout(() => icon.classList.remove('spin'), 1000);
  });
});

// Animasi tombol
document.querySelectorAll('.btn').forEach((btn, i) => {
  setTimeout(() => {
    btn.classList.add(i % 2 === 0 ? 'animate-left' : 'animate-right');
  }, i * 200);
});
