/ ================================
// CONFIGURACIÓN DE CANCIONES
// ================================
const songs = [
    // Agrega aquí todas las canciones
    { title: "Abre tu Jardín", lyrics: "lyrics/abre-tu-jardin.txt", audio: "audio/abre-tu-jardin.mp3", sections: ["Entrada"] },
    { title: "Aquí estámos Señor", lyrics: "lyrics/aqui-estamos.txt", audio: "audio/aqui-estamos.mp3", sections: ["Entrada"] },
    { title: "Aleluya (Anunciamos)", lyrics: "lyrics/aleluya-anunciamos.txt", audio: "audio/aleluya-anunciamos.mp3", sections: ["Aclamación"] },
    { title: "Aleluya (Brasil)", lyrics: "lyrics/aleluya-brasil.txt", audio: "audio/aleluya-brasil.mp3", sections: ["Aclamación"] },
    { title: "Canta Aleluya", lyrics: "lyrics/canta-aleluya.txt", audio: "audio/canta-aleluya.mp3", sections: ["Aclamación"] },
    { title: "Alma-Misionera", lyrics: "lyrics/alma-misionera.txt", audio: "audio/alma-misionera.mp3", sections: ["Comunión"] },
    { title: "Alma-Misionera", lyrics: "lyrics/alma-misionera.txt", audio: "audio/alma-misionera.mp3", sections: ["Entrada"] },
    { title: "Camino Firme", lyrics: "lyrics/camino-firme.txt", audio: "audio/camino-firme.mp3", sections: ["Comunión"] },
    { title: "Canta Iglesia", lyrics: "lyrics/canta-iglesia.txt", audio: "audio/canta-iglesia.mp3", sections: ["Comunión"] },
    { title: "Cinco Panes", lyrics: "lyrics/cinco-panes.txt", audio: "audio/cinco-panes.mp3", sections: ["Comunión"] },
    { title: "Cordero Aravena", lyrics: "lyrics/cordero-aravena.txt", audio: "audio/cordero-aravena.mp3", sections: ["Comunión"] },
    { title: "Cordero Bianchi", lyrics: "lyrics/cordero-bianchi.txt", audio: "audio/cordero-bianchi.mp3", sections: ["Comunión"] },
    { title: "Cordero de Dios Cordero", lyrics: "lyrics/cordero-dios.txt", audio: "audio/cordero-dios.mp3", sections: ["Comunión"] },
    { title: "Cordero Tonada", lyrics: "lyrics/cordero-tonada.txt", audio: "audio/cordero-tonada.mp3", sections: ["Comunión"] },
    { title: "Cordero Mamut", lyrics: "lyrics/cordero-mamut.txt", audio: "audio/cordero-mamut.mp3", sections: ["Comunión"] } ,
    { title: "Cordero de Dios que quitas", lyrics: "cordero-de-Dios-que-quitas.txt", audio: "cordero-de-Dios-que-quitas.mp3",sections: ["Cordero"] },
    { title: "Dios Trino", lyrics: "dios-trino.txt", audio: "dios-trino.mp3",sections: ["Entrada"] },
    { title: "Flor del Carmelo", lyrics: "flor-del-carmelo.txt", audio: "flor-del-carmelo.mp3",sections: ["Marianas"] },
    { title: "Gloria folclórico", lyrics: "gloria-folclorico.txt", audio: "gloria-folclorico.mp3",sections: ["Gloria"] },
    { title: "Jesús estoy aquí", lyrics: "jesus-estoy-aqui.txt", audio: "jesus-estoy-aqui.mp3",sections: ["Comunión"] },
    { title: "Juntos nos acercamos", lyrics: "juntos-nos-acercamos.txt",  audio: "juntos-nos-acercamos.mp3",sections: ["Ofertorio"] },
    { title: "Oh Señor ten piedad", lyrics: "oh-Señor-ten-piedad.txt", audio: "oh-Señor-ten-piedad.mp3",  sections: ["Perdón"] },
    { title: "Santo Bianchi", lyrics: "santo-Bianchi-.txt", audio: "santo-Bianchi-.mp3", sections: ["Santo"] },
    { title: "Virgen peregrina", lyrics: "virgen-peregrina.txt", audio: "virgen-peregrina.mp3",sections: ["Santo"] },
    { title: "Aleluya", lyrics: "aleluya.txt",  audio: "aleluya.mp3",sections: ["Aclamación"] },
    { title: "Aleluya (Folclorico)", lyrics: "aleluya-folclorico.txt", audio: "aleluya-folclorico.mp3",sections: ["Aclamación"] },
    { title: "Hermosa es tu palabra", lyrics: "hermosa-es-tu-palabra.txt", audio: "hermosa-es-tu-palabra.mp3",sections: ["Post Aclamación"] },
    { title: "Bendecid a Dios", lyrics: "bendecid-a-dios.txt",audio: "bendecid-a-dios.mp3", sections: ["Post Aclamación"] },
    { title: "Salmo 33", lyrics: "salmo33.txt", audio: "salmo33.mp3", sections: ["Salmos"] },
    { title: "Contigo Virgen del Carmen", lyrics: "contigo-virgen-del-carmen.txt", audio: "contigo-virgen-del-carmen.mp3",sections: ["Marianas"] },
    { title: "Aleluya (Gregoriano)", lyrics: "aleluya-gregoriano.txt", audio: "aleluya-gregoriano.mp3",sections: ["Aclamación"] },
    { title: "Aleluya para alabar al Señor", lyrics: "aleluya-gregoriano.txt", audio: "aleluya-gregoriano.mp3",sections: ["Aclamación"] }
    
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
  "Post Aclamación",
  "Ofertorio",
  "Santo",
  "Cordero",
  "Comunión",
  "Marianas",
  "Espíritu Santo",
  "Folclore",
  "Otras"
];
const categories = ["Entrada","Perdón","Gloria","Salmos","Aclamación","Post Aclamación","Ofertorio","Santo","Cordero","Comunión","Marianas","Espíritu Santo","Folclore","Otras"];

function loadSections() {
  const container = document.getElementById("sections-container");

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
    const sectionDiv = document.createElement("div");
    sectionDiv.classList.add("section");

    const header = document.createElement("div");
    header.classList.add("section-header");
    header.textContent = category;

    const content = document.createElement("div");
    content.classList.add("section-content");

    const catSongs = songs.filter(s => s.sections.includes(category))
                          .sort((a,b) => a.title.localeCompare(b.title));

    catSongs.forEach(song => {
      const songDiv = document.createElement("div");
      songDiv.classList.add("song-item");
      songDiv.textContent = song.title;

      const details = document.createElement("div");
      details.classList.add("song-details");
      details.style.display = "none";
      details.innerHTML = `
        <p>Cargando letra...</p>
        <p><a href="${song.lyrics}" download>Descargar letra</a></p>
        <audio controls>
          <source src="${song.audio}" type="audio/mpeg">
          Tu navegador no soporta audio.
        </audio>
      `;

      // Mostrar detalles y cargar letra al hacer clic
      songDiv.addEventListener("click", () => {
        if(details.style.display === "none") {
          // Leer el archivo .txt
          fetch(song.lyrics)
            .then(response => response.text())
            .then(text => {
              details.querySelector("p").textContent = text;
            })
            .catch(err => {
              details.querySelector("p").textContent = "No se pudo cargar la letra.";
              console.error(err);
            });

          details.style.display = "block";
        } else {
          details.style.display = "none";
        }
      });
      
      container.appendChild(catDiv);
    }

      content.appendChild(songDiv);
      content.appendChild(details);
    });

    header.addEventListener("click", () => {
      content.style.display = content.style.display === "none" ? "block" : "none";
    });

    sectionDiv.appendChild(header);
    sectionDiv.appendChild(content);
    container.appendChild(sectionDiv);
  });
}

    // Reproducción automática de audios en páginas que los tengan
document.addEventListener('DOMContentLoaded', () => {
  const audioElements = document.querySelectorAll('audio');
  if (audioElements.length > 0) {
    audioElements.forEach((audio, index) => {
      audio.addEventListener('ended', () => {
        if (index < audioElements.length - 1) {
          audioElements[index + 1].play();
        }
      });
    });
  }
});


window.onload = loadSongs;
window.onload = loadSections;

















