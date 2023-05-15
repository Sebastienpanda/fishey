export class Photographer {
  constructor() {
    this.data = {};
    this.total = 0;
    this.mediaSection = document.getElementById("photograph-header");
  }
  async getData() {
    try {
      const urlParams = new URLSearchParams(document.location.search);
      const id = parseInt(urlParams.get("id"));
      const response = await fetch("../data/photographers.json");
      const data = await response.json();
      this.data = {
        photographer: data.photographer.find(
          (photographer) => photographer.id === id
        ),
        media: data.media.filter((media) => {
          media.photographerId === id;
        }),
      };
    } catch (error) {
      console.log(error);
    }
  }
  insertHeaderPhotographer() {
    const { photographer } = this.data;
    const photographHeader = document.querySelector(".photograph-header");
    photographHeader.innerHTML =
      /*html*/
      `
      <div>
       <h1 aria-label="${photographer.name}">${photographer.name}</h1>
       <span aria-label="${photographer.city}, ${photographer.country}">${photographer.city}, ${photographer.country}</span>
       <p aria-label="${photographer.tagline}">${photographer.tagline}</p>
      </div>
      <div> 
         <button aria-label="Contact me" class="contact_button" onclick="displayModal()">Contactez-moi</button>
      </div>
      <img src="../assets/photographers/${photographer.portrait}" alt="${photographer.name}" aria-label="${photographer.name}">`;
  }
  async insertMedia(media, photographerName) {
    const main = document.getElementById("containerCard");
    const { title, image, id, likes, video } = media;
    const result = photographerName.match(/^\w+/)?.[0];
    let picture, mediaHtml;

    if (image?.endsWith(".jpg")) {
      picture = `assets/images/${result}/${image}`;
      mediaHtml = `<img src="${picture}" alt="${title}" tabIndex="0"/>`;
    } else if (video?.endsWith(".mp4")) {
      picture = `assets/images/${result}/${video}`;
      mediaHtml = `<video src="${picture}" tabIndex="0"></video>`;
    }

    const cardHtml = `
    <div class="card">
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
    main.insertAdjacentHTML("beforeend", cardHtml);
    const heartId = document.getElementById(`heart-${id}`);
    const likeClass = document.getElementById(`like-${id}`);
    heartId.addEventListener("click", () => {
      likeClass.innerText = likes + 1;
    });
    heartId.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        likeClass.innerText = likes + 1;
      }
    });
  }
}
