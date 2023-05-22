export class Lightbox {
  #lightbox = [];
  #currentIndex = 0;
  #modal = null;
  #containerDiv = null;
  constructor() {
    const lightbox = document.querySelectorAll("[data-lightbox]");
    if (lightbox.length > 0) {
      for (const element of lightbox) {
        const item = {
          src: element.src,
          type: element.nodeName,
        };
        this.#lightbox.push(item);
        element.addEventListener("click", this._handleClick.bind(this));
      }
    }
  }
  _handleClickOutSide(e) {
    const isClickInSide = this.#modal.contains(e.target);
    if (!isClickInSide) {
      this._close();
    }
    e.stopPropagation();
  }
  _handleClick(e) {
    const currentElement = e.currentTarget;
    const src = currentElement.src;
    this.#currentIndex = this.#lightbox.findIndex((item) => {
      return item.src === src;
    });
    this._open();
  }
  _open() {
    const body = document.querySelector("body");
    this.#modal = document.createElement("div");
    this.#modal.setAttribute("id", "lightbox");
    this.#containerDiv = document.createElement("div");
    this.#containerDiv.setAttribute("id", "containerImg");
    const next = document.createElement("button");
    next.textContent = "Next";
    const prev = document.createElement("button");
    prev.textContent = "Prev";
    const close = document.createElement("close");
    close.textContent = "Close";
    this.#modal.append(this.#containerDiv, next, prev, close);
    next.addEventListener("click", () => {
      this._goToNext();
    });
    prev.addEventListener("click", () => {
      this._goToPrevious();
    });
    close.addEventListener("click", () => {
      this._close();
    });
    this._displayItem(this.#currentIndex);
    body.append(this.#modal);
    // document.addEventListener("click", this._handleClickOutSide.bind(this));
  }
  _close() {
    this.#modal.remove();
    // window.removeEventListener("click", this._handleClickOutSide.bind(this));
  }
  _goToNext() {
    if (this.#currentIndex < this.#lightbox.length) {
      this._displayItem(++this.#currentIndex);
    }
  }

  _goToPrevious() {
    if (this.#currentIndex > 0) {
      this._displayItem(--this.#currentIndex);
    }
  }

  _displayItem(index) {
    const item = this.#lightbox[index];

    let element;
    if (item.type === "IMG") {
      element = document.createElement("img");
      element.src = item.src;
    } else if (item.type === "VIDEO") {
      element = document.createElement("video");
      const src = document.createElement("source");
      src.setAttribute("src", item.src);
      element.setAttribute("controls", "");
      element.append(src);
    }

    this.#containerDiv.innerHTML = "";
    this.#containerDiv.append(element);
    this.#currentIndex = index;
  }
  static init() {
    return new Lightbox();
  }
}
