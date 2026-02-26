/* ================= MUSIC ================= */
const bgm = document.getElementById("bgm");
const toggle = document.getElementById("bgmToggle");
const popup = document.getElementById("bgmPopup");

function showPopup(text) {
  popup.textContent = text;
  popup.classList.add("show");
  clearTimeout(popup.timer);
  popup.timer = setTimeout(() => popup.classList.remove("show"), 2000);
}

window.addEventListener("load", () => {
  showPopup("🎵 Music Ready");
});

toggle.addEventListener("click", async () => {
  try {
    if (bgm.paused) {
      await bgm.play();
      toggle.classList.add("playing");
      showPopup("▶ Playing");
    } else {
      bgm.pause();
      toggle.classList.remove("playing");
      showPopup("⏸ Paused");
    }
  } catch {
    showPopup("❌ Autoplay Blocked");
  }
});
