import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getDatabase, ref, runTransaction, onValue }
from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDUAskCal2pbbtLcE-KragstO9PffG51Dg",
  authDomain: "mylink-project-bc60c.firebaseapp.com",
  databaseURL: "https://mylink-project-bc60c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mylink-project-bc60c",
  storageBucket: "mylink-project-bc60c.appspot.com",
  messagingSenderId: "451024052265",
  appId: "1:451024052265:web:ad3806ae293b92d711bc38"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/* Visitor */
const visitRef = ref(db, "visits");
runTransaction(visitRef, v => (v || 0) + 1);
onValue(visitRef, snap => {
  document.getElementById("visitorCounter").textContent =
    "Kunjungan: " + snap.val();
});

/* Music */
const bgm = document.getElementById("bgm");
const toggle = document.getElementById("bgmToggle");
const popup = document.getElementById("bgmPopup");

function showPopup(text){
  popup.textContent = text;
  popup.classList.add("show");
  clearTimeout(popup.timer);
  popup.timer = setTimeout(() => popup.classList.remove("show"), 2000);
}

window.addEventListener("load", () => showPopup("🎵 Music Ready"));

toggle.addEventListener("click", async () => {
  if (bgm.paused) {
    await bgm.play();
    toggle.classList.add("playing");
    showPopup("▶ Playing");
  } else {
    bgm.pause();
    toggle.classList.remove("playing");
    showPopup("⏸ Paused");
  }
});

/* Button Anim */
document.querySelectorAll(".btn").forEach((btn, i) => {
  setTimeout(() => {
    btn.classList.add(i % 2 === 0 ? "animate-left" : "animate-right");
  }, i * 150);
});
