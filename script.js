// ================================
// CONFIGURACIÓN DE CANCIONES
// ================================
const songs = [
  { title: "Alabare", lyrics: "lyrics/alabare.txt", audio: "audio/alabare.mp3", sections: ["Entrada"] },
  { title: "Gloria a Dios", lyrics: "lyrics/gloria.txt", audio: "audio/gloria.mp3", sections: ["Gloria"] },
  { title: "Aleluya", lyrics: "lyrics/aleluya.txt", audio: "audio/aleluya.mp3", sections: ["Salida"] },
  { title: "María Reina", lyrics: "lyrics/maria.txt", audio: "audio/maria.mp3", sections: ["Marianas"] },
  { title: "Santo Espíritu", lyrics: "lyrics/espiritu.txt", audio: "audio/espiritu.mp3", sections: ["Espiritu Santo"] },
  { title: "Cordero de Dios", lyrics: "lyrics/cordero.txt", audio: "audio/cordero.mp3", sections: ["Cordero", "Comunión"] },
  // Agrega aquí todas las canciones
];

// ================================
// CONFIGURACIÓN DE CATEGORÍAS
// ================================
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
  "Espiritu Santo",
  "Otras"
];

// ================================
// FUNCIONES
// ================================
function loadSongs() {
  const container = document.getElementById("songs-container");
  
  categories.forEach(category => {
    const catSongs = songs
      .filter(song => song.sections.includes(category))
      .sort((a,b) => a.title.localeCompare(b.title));
    
    if (catSongs.length > 0) {
      // Crear sección de categoría
      const catDiv = document.createElement("div");
      catDiv.innerHTML = `<h2>${category}</h2>`;
      
      // Agregar canciones
      catSongs.forEach(song => {
        const div = document.createElement("div");
        div.classList.add("song-item");
        div.innerHTML = `
          <h3>${song.title}</h3>
          <p><a href="${song.lyrics}" download>Descargar letra</a></p>
          <audio controls>
            <source src="${song.audio}" type="audio/mpeg">
            Tu navegador no soporta audio.
          </audio>
        `;
        catDiv.appendChild(div);
      });
      
      container.appendChild(catDiv);
    }
  });
}

window.onload = loadSongs;
