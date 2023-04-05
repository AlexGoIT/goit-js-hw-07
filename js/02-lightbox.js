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
              alt="${description}" />
          </a>
        </li>
        `
    )
    .join("");

  return itemsGalleryMarkup;
}

// Insert markup to gallery
galleryContainer.insertAdjacentHTML(
  "beforeend",
  createItemsGalleryMarkup(galleryItems)
);

// Create lightbox
const lightBox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});
