import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");

// Create markup for gallery
function createItemsGalleryMarkup(galleryItems) {
  const itemsGalleryMarkup = galleryItems
    .map(
      ({ original, preview, description }) =>
        `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img 
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>`
    )
    .join("");

  return itemsGalleryMarkup;
}

// Insert markup to gallery
galleryContainer.insertAdjacentHTML(
  "afterbegin",
  createItemsGalleryMarkup(galleryItems)
);

galleryContainer.addEventListener('click', (e) => {
  e.preventDefault();
  
  const isGalleryImage = e.target.classList.contains("gallery__image");
  
  if (!isGalleryImage) {
    return;
  }
  
  const { target: galleryImgEl } = e;
  
  showModal(galleryImgEl);
});

let instance;

// Create a basic lightbox
function showModal({ dataset: { source }, alt }) {
  instance = basicLightbox.create(`<img src="${source}" alt="${alt}">`, {
    onShow: onOpeningModal,
    onClose: onClosingModal,
  });

  instance.show();
}

// Before open lightbox
function onOpeningModal() {
  window.addEventListener("keydown", onKeyPress);
  bodyScrollLock();
}

// Before close lightbox
function onClosingModal() {
  window.removeEventListener("keydown", onKeyPress);
  bodyScrollUnlock();
}

function bodyScrollLock() {
  const body = document.querySelector("body");
  
  body.style.paddingRight = "17px";
  body.style.overflow = "hidden";
}

function bodyScrollUnlock() {
  const body = document.querySelector("body");

  setTimeout(() => {
    body.style.overflow = "auto";
    body.style.paddingRight = "0px";
  
  }, 250)
}

function onKeyPress(e) {
  if (e.code !== "Escape") {
    return;
  }

  instance.close();
}
