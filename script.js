// Animasi tombol masuk dari kanan dan kiri secara bergantian
const linkButtons = document.querySelectorAll('.links-section .btn');

linkButtons.forEach((btn, index) => {
  const isEven = index % 2 === 0;
  const animationClass = isEven ? 'animate-left' : 'animate-right';

  setTimeout(() => {
    btn.classList.add(animationClass);
  }, index * 200);
});
