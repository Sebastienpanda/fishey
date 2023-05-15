// function photographerFactory(data) {
//   const { name, portrait, city, country, tagline, price, id } = data;

//   const picture = `assets/photographers/${portrait}`;
//   function getUserCardDOM() {
//     const article = document.createElement("article");
//     article.insertAdjacentHTML(
//       /*html*/
//       "beforeend",
//       `
//       <a href="./photographer.html?id=${id}" aria-label="${name}">
//       <img src="${picture}" alt="${name}" aria-label="${name}">
//       <h1 aria-label="${name}">${name}</h1>
//       <span aria-label="${city}, ${country}">${city}, ${country}</span>
//       <p aria-label="${tagline}">${tagline}</p>
//       <span aria-label="${price}€/jour">${price}€/jour</span>
//       </a>
//       `
//     );
//     return article;
//   }
//   return { name, picture, getUserCardDOM };
// }
export function photographerFactory({
  name,
  portrait,
  city,
  country,
  tagline,
  price,
  id,
}) {
  const picture = `assets/photographers/${portrait}`;
  const getUserCardDOM = () => {
    const card = document.createElement("article");
    card.innerHTML = /*html*/ `
      <a href="./photographer.html?id=${id}" aria-label="${name}">
        <img src="${picture}" alt="${name}" aria-label="${name}">
        <h1 aria-label="${name}">${name}</h1>
        <span aria-label="${city}, ${country}">${city}, ${country}</span>
        <p aria-label="${tagline}">${tagline}</p>
        <span aria-label="${price}€/jour">${price}€/jour</span>
      </a>
    `;
    return card;
  };

  return { name, picture, getUserCardDOM };
}
