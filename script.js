const songs = [
  { title: "Abre tu Jardín", lyrics: "lyrics/abre-tu-jardin.txt", audio: "audio/abre-tu-jardin.mp3", sections: ["Entrada"] }
];

const categories = ["Entrada","Perdón","Gloria","Salmos","Aclamación","Ofertorio","Santo","Cordero","Comunión","Marianas","Espiritu Santo","Otras"];

function loadSections() {
  const container = document.getElementById("sections-container");

  categories.forEach(category => {
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

window.onload = loadSections;
