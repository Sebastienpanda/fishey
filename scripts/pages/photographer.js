import { InsertMedia } from "../factories/insertMedia.js";
import { Lightbox } from "../factories/lightbox.js";

document.addEventListener("DOMContentLoaded", async () => {
  const insertMediaInstance = new InsertMedia();
  await insertMediaInstance.getOnePhotographers();
  Lightbox.init();
});
