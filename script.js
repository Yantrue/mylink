// Visitor Counter pakai localStorage
const counterEl = document.getElementById('visitorCounter');
let count = localStorage.getItem('visitCount');
if (!count) count = 0;
count++;
localStorage.setItem('visitCount', count);
counterEl.textContent = `Kunjungan: ${count}`;

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

// Tampilkan tombol dan popup untuk 5 detik saat halaman load
window.addEventListener('load', () => {
  bgmToggle.style.display = 'block';
  bgmPopup.style.display = 'block';
  setTimeout(() => {
    bgmPopup.style.display = 'none';
  }, 5000);
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

// Animasi spin saat icon sosial media diklik
document.querySelectorAll('.btn .icon').forEach(icon => {
  icon.closest('a').addEventListener('click', () => {
    icon.classList.add('spin');
    setTimeout(() => icon.classList.remove('spin'), 1000);
  });
});

// Animasi tombol masuk dari kanan dan kiri secara bergantian
const linkButtons = document.querySelectorAll('.links-section .btn');

linkButtons.forEach((btn, index) => {
  const isEven = index % 2 === 0;
  const animationClass = isEven ? 'animate-left' : 'animate-right';

  setTimeout(() => {
    btn.classList.add(animationClass);
  }, index * 200);
});
