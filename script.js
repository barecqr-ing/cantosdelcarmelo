import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "cantosdelcarmelo.firebaseapp.com",
  projectId: "cantosdelcarmelo",
  storageBucket: "cantosdelcarmelo.appspot.com",
  messagingSenderId: "XXXXXXX",
  appId: "XXXXXXXXX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const listSection = document.getElementById("song-list");
const viewSection = document.getElementById("song-view");
const listEl = document.getElementById("songs");
const titleEl = document.getElementById("song-title");
const lyricsEl = document.getElementById("song-lyrics");
const audioEl = document.getElementById("song-audio");
const backBtn = document.getElementById("back");
const downloadLink = document.getElementById("download-link");

async function loadSongs() {
  const snapshot = await getDocs(collection(db, "songs"));
  snapshot.forEach((doc) => {
    const song = doc.data();
    const li = document.createElement("li");
    li.textContent = song.title;
    li.onclick = () => showSong(song);
    listEl.appendChild(li);
  });
}

async function showSong(song) {
  const response = await fetch(song.lyricsUrl);
  const text = await response.text();

  titleEl.textContent = song.title;
  lyricsEl.textContent = text;
  audioEl.src = song.audioUrl;
  downloadLink.href = song.lyricsUrl;
  downloadLink.download = `${song.title}.txt`;

  listSection.classList.add("hidden");
  viewSection.classList.remove("hidden");
}

backBtn.onclick = () => {
  viewSection.classList.add("hidden");
  listSection.classList.remove("hidden");
};

loadSongs();
