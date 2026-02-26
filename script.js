import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  runTransaction,
  onValue
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";

/* =========================
   🔥 FIREBASE SETUP
========================= */

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

/* =========================
   👀 VISITOR COUNTER
========================= */

const visitorCounterEl = document.getElementById("visitorCounter");

if (visitorCounterEl) {
  const visitRef = ref(db, "visits");

  runTransaction(visitRef, count => (count || 0) + 1)
    .catch(err => console.error("Transaction failed:", err));

  onValue(visitRef, snapshot => {
    visitorCounterEl.textContent =
      "Kunjungan: " + (snapshot.val() || 0);
  });
}

/* =========================
   🖼️ FOTO PROFIL
========================= */

const uploadFoto = document.getElementById("uploadFoto");
const fotoProfil = document.getElementById("fotoProfil");

if (uploadFoto && fotoProfil) {
  uploadFoto.addEventListener("change", () => {
    const file = uploadFoto.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      fotoProfil.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/* =========================
   🎵 BACKGROUND MUSIC
========================= */

const bgm = document.getElementById("bgm");
const bgmToggle = document.getElementById("bgmToggle");
const bgmPopup = document.getElementById("bgmPopup");

if (bgm && bgmToggle) {

  window.addEventListener("load", () => {
    bgmToggle.style.display = "block";

    if (bgmPopup) {
      bgmPopup.style.display = "block";
      setTimeout(() => {
        bgmPopup.style.display = "none";
      }, 5000);
    }
  });

  bgmToggle.addEventListener("click", async () => {
    try {
      if (bgm.paused) {
        await bgm.play();
        bgmToggle.classList.add("playing");
      } else {
        bgm.pause();
        bgmToggle.classList.remove("playing");
      }
    } catch (err) {
      console.warn("Autoplay blocked by browser:", err);
    }
  });
}

/* =========================
   ✨ ANIMASI TOMBOL
========================= */

const buttons = document.querySelectorAll(".links-section .btn");

buttons.forEach((btn, index) => {
  setTimeout(() => {
    btn.classList.add(
      index % 2 === 0 ? "animate-left" : "animate-right"
    );
  }, index * 200);
});
