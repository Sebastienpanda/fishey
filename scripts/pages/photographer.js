//Mettre le code JavaScript lié à la page photographer.html
let spantotalLikes = document.querySelector("#totalLikes");
let spanPrice = document.querySelector("#price");

class displayOnePhotographer {
  constructor() {
    this.totalLikes = 0;
    this.total = 0;
  }

  async getOnePhotographers() {
    const url = new URLSearchParams(document.location.search);
    const id = parseInt(url.get("id"));
    const data = await fetch("../data/photographers.json").then((res) => {
      return res.json();
    });
    const photographer = data.photographers.find(
      (onePhotographer) => onePhotographer.id === id
    );
    data.media
      .filter(
        (dataMediaPhotographer) => dataMediaPhotographer.photographerId === id
      )
      .map((element) => {
        spantotalLikes.innerHTML = `${(this.total +=
          element.likes)} <i class="fa-solid fa-heart heart" aria-label="likes"></i>`;
        this.insertMedia(element, photographer);
      });

    this.insertHeaderPhotographer(photographer);
  }
  insertHeaderPhotographer(photographer) {
    const photographHeader = document.getElementById("photograph-header");
    const { name, portrait, city, country, tagline, price, id } = photographer;
    spanPrice.innerText = `${price}€ / jour`;
    const picture = `assets/photographers/${portrait}`;
    photographHeader.insertAdjacentHTML(
      "beforeend",
      `
      <div>
       <h1 aria-label="${name}">${name}</h1>
       <span aria-label="${city}, ${country}">${city}, ${country}</span>
       <p aria-label="${tagline}">${tagline}</p>
      </div>
      <div> 
         <button aria-label="Contact me" class="contact_button" onclick="displayModal()">Contactez-moi</button>
      </div>
      <img src="${picture}" alt="${name}" aria-label="${name}">
      `
    );
  }
  async insertMedia(media, photographer) {
    const main = document.getElementById("containerCard");
    let { title, image, id, likes, video } = media;
    const regexName = /^\w+/;
    const result = await photographer.name.match(regexName)[0];
    let picture, mediaHtml;

    if (image?.endsWith(".jpg")) {
      picture = `assets/images/${result}/${image}`;
      mediaHtml = `<img src="${picture}" alt="${title}" tabIndex="0"/>`;
    } else if (video?.endsWith(".mp4")) {
      picture = `assets/images/${result}/${video}`;
      mediaHtml = `<video src="${picture}" tabIndex="0"></video>`;
    }
    const cardHtml = `
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
    <div id="lightbox" class="lightbox">
      <div class="lightbox-content">
        <div id="lightbox-media"></div>
        <button id="close-lightbox" class="close-lightbox" aria-label="Close"></button>
      </div>
    </div>
  `;
    main.insertAdjacentHTML("beforeend", cardHtml);
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

new displayOnePhotographer().getOnePhotographers();
