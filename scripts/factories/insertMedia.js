let spantotalLikes = document.querySelector("#totalLikes");
let spanPrice = document.querySelector("#price");

export class InsertMedia {
  constructor() {
    this.total = 0;
  }
  async getOnePhotographers() {
    const url = new URLSearchParams(document.location.search);
    const id = parseInt(url.get("id"));
    const response = await fetch("../data/photographers.json");
    const data = await response.json();
    const photographer = data.photographers.find(
      (onePhotographer) => onePhotographer.id === id
    );
    const select = document.querySelector("#select");
    const section = document.getElementById("containerCard");

    const allMedia = data.media.filter(
      (dataMediaPhotographer) => dataMediaPhotographer.photographerId === id
    );

    for (const element of allMedia) {
      spantotalLikes.innerHTML = `${(this.total +=
        element.likes)} <i class="fa-solid fa-heart heart" aria-label="likes"></i>`;
      this.insertMedia(element, photographer);
    }

    let filteredMedia = [...allMedia];
    select.addEventListener("change", async () => {
      const selectedOption = select.options[select.selectedIndex];
      const selectedValue = selectedOption.value;
      if (selectedValue === "popularite") {
        section.innerHTML = "";
        filteredMedia = [...allMedia].sort((a, b) => b.likes - a.likes);
        filteredMedia.forEach((element) => {
          this.insertMedia(element, photographer);
        });
      } else if (selectedValue === "date") {
        section.innerHTML = "";
        filteredMedia = [...allMedia].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        filteredMedia.forEach((element) => {
          this.insertMedia(element, photographer);
        });
      } else if (selectedValue === "titre") {
        section.innerHTML = "";
        filteredMedia = [...allMedia].sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
        filteredMedia.forEach((element) => {
          this.insertMedia(element, photographer);
        });
      }
    });

    this.insertHeaderPhotographer(photographer);
  }
  insertHeaderPhotographer(photographer) {
    const photographHeader = document.getElementById("photograph-header");
    const h2Name = document.getElementById("h2Name");
    const { name, portrait, city, country, tagline, price, id } = photographer;
    h2Name.innerText = `Contactez-moi ${name}`;
    spanPrice.innerText = `${price}€ / jour`;
    const picture = `assets/photographers/${portrait}`;
    photographHeader.innerHTML = `
      <div>
       <h1 aria-label="${name}">${name}</h1>
       <span aria-label="${city}, ${country}">${city}, ${country}</span>
       <p aria-label="${tagline}">${tagline}</p>
      </div>
      <div> 
         <button aria-label="Contact me" class="contact_button" onClick="displayModal()">Contactez-moi</button>
      </div>
      <img src="${picture}" alt="${name}" aria-label="${name}">
      `;
  }
  async insertMedia(media, photographer) {
    const main = document.getElementById("containerCard");
    const section = document.createElement("section");
    section.id = "section";
    main.append(section);
    let { title, image, id, likes, video } = media;
    const regexName = /^\w+/;
    const result = await photographer.name.match(regexName)[0];
    let picture, mediaHtml;

    if (image?.endsWith(".jpg")) {
      picture = `assets/images/${result}/${image}`;
      mediaHtml = `<img data-lightbox src="${picture}" alt="${title}" tabIndex="0"/>`;
    } else if (video?.endsWith(".mp4")) {
      picture = `assets/images/${result}/${video}`;
      mediaHtml = `<video data-lightbox src="${picture}" tabIndex="0"></video>`;
    }
    section.innerHTML = `
    <div class="card" id="card">
      ${mediaHtml}
      <div class="containerInfo" >
        <h2>${title}</h2>
        <div>
         <span class="like" id="like-${id}">${likes}</span>
         <i id="heart-${id}" class="fa-solid fa-heart heart" aria-label="likes" tabIndex="0"></i>
        </div>
      </div>
    </div>
  `;
    const heartId = document.getElementById(`heart-${id}`);
    const likeClass = document.getElementById(`like-${id}`);
    heartId.addEventListener("click", () => {
      likeClass.innerText = likes += 1;
      spantotalLikes.innerHTML = `${(this.total += 1)} <i class="fa-solid fa-heart heart" aria-label="likes"></i>`;
    });
    heartId.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        likeClass.innerText = likes += 1;
        spantotalLikes.innerHTML = `${(this.total += 1)} <i class="fa-solid fa-heart heart" aria-label="likes"></i>`;
      }
    });
  }
}
