import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getDatabase, ref, runTransaction, onValue }
  from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDUAskCal2pbbtLcE-KragstO9PffG51Dg",
  authDomain: "mylink-project-bc60c.firebaseapp.com",
  databaseURL: "https://mylink-project-bc60c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mylink-project-bc60c",
  storageBucket: "mylink-project-bc60c.firebasestorage.app",
  messagingSenderId: "451024052265",
  appId: "1:451024052265:web:ad3806ae293b92d711bc38"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Visitor Counter GLOBAL
const visitRef = ref(db, "visits");
runTransaction(visitRef, count => (count || 0) + 1);

onValue(visitRef, snap => {
  document.getElementById("visitorCounter").textContent =
    "Kunjungan: " + snap.val();
});

// Ganti foto profil
const uploadFoto = document.getElementById("uploadFoto");
const fotoProfil = document.getElementById("fotoProfil");

uploadFoto.addEventListener("change", () => {
  const file = uploadFoto.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => fotoProfil.src = e.target.result;
  reader.readAsDataURL(file);
});

// BGM
const bgm = document.getElementById("bgm");
const bgmToggle = document.getElementById("bgmToggle");
const bgmPopup = document.getElementById("bgmPopup");

window.addEventListener("load", () => {
  bgmToggle.style.display = "block";
  bgmPopup.style.display = "block";
  setTimeout(() => bgmPopup.style.display = "none", 5000);
});

bgmToggle.addEventListener("click", () => {
  if (bgm.paused) {
    bgm.play();
    bgmToggle.classList.add("playing");
  } else {
    bgm.pause();
    bgmToggle.classList.remove("playing");
  }
});

// Animasi tombol
document.querySelectorAll(".links-section .btn").forEach((btn, i) => {
  setTimeout(() => {
    btn.classList.add(i % 2 === 0 ? "animate-left" : "animate-right");
  }, i * 200);
});
