// --- script.js ---

// Detecta si estamos en la página de una canción
if (window.location.pathname.endsWith("song.html")) {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name"); // ejemplo: abre-tu-jardin

  const titleElement = document.getElementById("song-title");
  const lyricsElement = document.getElementById("lyrics");
  const audioElement = document.getElementById("audio-player");

  if (!name) {
    titleElement.textContent = "Canción no especificada";
    lyricsElement.textContent = "";
  } else {
    // Muestra el nombre de la canción como título
    const formattedName = name.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    titleElement.textContent = formattedName;

    // Carga la letra desde la carpeta /lyrics
    fetch(`lyrics/${name}.txt`)
      .then(response => {
        if (!response.ok) throw new Error("Archivo no encontrado");
        return response.text();
      })
      .then(text => {
        lyricsElement.textContent = text; // muestra acentos y ñ
      })
      .catch(() => {
        lyricsElement.textContent = "No se pudo cargar la letra de la canción.";
      });

    // Configura el reproductor de audio
    audioElement.src = `audio/${name}.mp3`;
  }
}

