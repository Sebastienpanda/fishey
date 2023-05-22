//Mettre le code JavaScript lié à la page photographer.html

import { getOnePhotographer } from "../factories/insertMedia.js";

class displayOnePhotographer {
  onePhotagrapher() {
    new getOnePhotographer().getOnePhotographers();
  }
}

new displayOnePhotographer().onePhotagrapher();
