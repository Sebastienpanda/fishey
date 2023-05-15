import { photographerFactory } from "../factories/photographer.js";
class PhotographerManager {
  constructor() {
    this.data = [];
    this.photographersSection = document.querySelector(".photographer_section");
  }
  async getPhotographers() {
    try {
      const response = await fetch("../data/photographers.json");
      this.data = await response.json();
      this.displayData();
    } catch (error) {
      console.log(error);
    }
  }

  displayData = () => {
    const { photographers } = this.data;
    photographers.forEach((photographer) => {
      const photographerModel = photographerFactory(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      this.photographersSection.appendChild(userCardDOM);
    });
  };
}

const init = async () => {
  // Récupère les datas des photographes
  await new PhotographerManager().getPhotographers();
};

init();
