/* -----------------------------------------
   script.js — Cantos del Carmelo
   -----------------------------------------
   Funciona con index.html y song.html
----------------------------------------- */

// 🔹 Listado de canciones (por ahora 2 ejemplos)
const songs = [
  {
    title: "Abre tu jardín",
    category: "Entrada",
    txt: "lyrics/abre-tu-jardin.txt",
    audio: "audio/abre-tu-jardin.mp3"
  },
  {
    title: "Aleluya Anunciamos",
    category: "Aclamación",
    txt: "lyrics/ALELUYA-ANUNCIAMOS.txt",
    audio: "audio/ALELUYA-ANUNCIAMOS.mp3"
  }
];

// 🔹 Categorías
const categories = [
  "Entrada",
  "Perdón",
  "Gloria",
  "Salmos",
  "Aclamación",
  "Ofertorio",
  "Santo",
  "Cordero",
  "Comunión",
  "Marianas",
  "Espíritu Santo",
  "Otras"
];

// --------------------------------------------------
// 1️⃣ Función para index.html → mostrar categorías y canciones
// --------------------------------------------------
function loadIndex() {
  const container = document.getElementById("categories");

  categories.forEach(cat => {
    // crear bloque de categoría
    const section = document.createElement("div");
    section.classList.add("category");

    const title = document.createElement("h2");
    title.textContent = cat;
    section.appendChild(title);

    // filtrar canciones
    const ul = document.createElement("ul");
    songs
      .filter(song => song.category === cat)
      .sort((a, b) => a.title.localeCompare(b.title))
      .forEach(song => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.textContent = song.title;
        link.href = `song.html?song=${encodeURIComponent(song.title)}`;
        li.appendChild(link);
        ul.appendChild(li);
      });

    section.appendChild(ul);
    container.appendChild(section);
  });
}

// --------------------------------------------------
// 2️⃣ Función para song.html → mostrar letra y audio
// --------------------------------------------------
function loadSongPage() {
  const params = new URLSearchParams(window.location.search);
  const songTitle = params.get("song");

  if (!songTitle) return;

  const song = songs.find(s => s.title === songTitle);
  if (!song) {
    document.getElementById("lyrics").textContent = "Canción no encontrada.";
    return;
  }

  // Mostrar título
  document.getElementById("song-title").textContent = song.title;

  // Mostrar audio
  const audio = document.getElementById("song-audio");
  audio.src = song.audio;

  // Mostrar letra
  fetch(song.txt)
    .then(response => response.text())
    .then(text => {
      // Mostrar texto con saltos de línea y tildes
      const lyricsDiv = document.getElementById("lyrics");
      lyricsDiv.textContent = text;
      lyricsDiv.style.whiteSpace = "pre-wrap";
    })
    .catch(() => {
      document.getElementById("lyrics").textContent =
        "No se pudo cargar la letra.";
    });

  // Descargar letra
  const downloadBtn = document.getElementById("download-btn");
  if (downloadBtn) {
    downloadBtn.href = song.txt;
    downloadBtn.download = song.title + ".txt";
  }
}

// --------------------------------------------------
// 3️⃣ Detectar en qué página estamos
// --------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("categories")) {
    loadIndex();
  } else if (document.getElementById("lyrics")) {
    loadSongPage();
  }
});
