function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}
const modal = document.getElementById("contact_modal");
modal.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    modal.style.display = "none";
  }
});
function closeModal() {
  const modal = document.getElementById("contact_modal");

  modal.style.display = "none";
}

const form = document.getElementById("form");
// event au click de soumission pour permettre de valider si tout est à true pour afficher la modal de success
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const prenom = document.getElementById("prenom").value;
  const nom = document.getElementById("nom").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  console.log(prenom);
  console.log(nom);
  console.log(email);
  console.log(message);
});
