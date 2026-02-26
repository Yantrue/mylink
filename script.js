import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getDatabase, ref, runTransaction, onValue, push }
from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";

const firebaseConfig={
  apiKey:"AIzaSyDUAskCal2pbbtLcE-KragstO9PffG51Dg",
  authDomain:"mylink-project-bc60c.firebaseapp.com",
  databaseURL:"https://mylink-project-bc60c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:"mylink-project-bc60c",
  storageBucket:"mylink-project-bc60c.firebasestorage.app",
  messagingSenderId:"451024052265",
  appId:"1:451024052265:web:ad3806ae293b92d711bc38"
};

const app=initializeApp(firebaseConfig);
const db=getDatabase(app);

/* VISITOR */
const visitRef=ref(db,"visits");
runTransaction(visitRef,v=>(v||0)+1);
onValue(visitRef,snap=>{
  document.getElementById("visitorCounter").textContent=
  "Kunjungan: "+snap.val();
});

/* LINK ANALYTICS */
document.querySelectorAll(".btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    push(ref(db,"clicks"),{
      link:btn.textContent,
      time:Date.now()
    });
  });
});

/* BGM + MUSIC REACTIVE */
const bgm=document.getElementById("bgm");
const toggle=document.getElementById("bgmToggle");

const audioCtx=new(window.AudioContext||window.webkitAudioContext)();
const analyser=audioCtx.createAnalyser();
const source=audioCtx.createMediaElementSource(bgm);
source.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize=64;
const data=new Uint8Array(analyser.frequencyBinCount);

function animate(){
  analyser.getByteFrequencyData(data);
  const avg=data.reduce((a,b)=>a+b)/data.length;
  document.documentElement.style.setProperty("--ring1",`hsl(${avg*2},100%,60%)`);
  document.documentElement.style.setProperty("--ring2",`hsl(${avg*3},100%,50%)`);
  document.documentElement.style.setProperty("--ring3",`hsl(${avg*4},100%,65%)`);
  requestAnimationFrame(animate);
}

toggle.addEventListener("click",async()=>{
  await audioCtx.resume();
  if(bgm.paused){
    bgm.play();
    toggle.classList.add("playing");
    animate();
  }else{
    bgm.pause();
    toggle.classList.remove("playing");
  }
});

/* MAGNET */
const photo=document.querySelector(".foto-wrapper.pro");
photo.addEventListener("mousemove",e=>{
  const r=photo.getBoundingClientRect();
  const x=e.clientX-r.left-r.width/2;
  const y=e.clientY-r.top-r.height/2;
  photo.style.transform=`translate(${x*0.08}px,${y*0.08}px)`;
});
photo.addEventListener("mouseleave",()=>photo.style.transform="translate(0,0)");

/* DARK MODE */
const theme=document.getElementById("themeToggle");
theme.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  theme.innerHTML=document.body.classList.contains("dark")
  ?'<i class="fas fa-sun"></i>'
  :'<i class="fas fa-moon"></i>';
});
