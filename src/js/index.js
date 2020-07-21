'use strict';

import gallery from './gallery-items.js';

// console.log(gallery);

// refs for querySelector

const refs = {
  gallery: document.querySelector('.js-gallery'),
  modalWindow: document.querySelector('.js-lightbox'),
  modalImg: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
  overlay: document.querySelector('.lightbox__content'),
};

// EventListener
refs.closeBtn.addEventListener('click', onCloseModal);
refs.gallery.addEventListener('click', onClickImage);
refs.overlay.addEventListener('click', onOverlayClick);

// functions

// creat HTML markup

const galleryMarkup = gallery.reduce((acc, img) => {
  const markupGallery = `<li class="gallery__item">
  <a href="${img.original}" class=gallery__link">
  <img class="gallery__image" src="${img.preview}"
  data-src="${img.original}"
  alt="${img.description}"/> 
  </a>
  </li>`;

  // eslint-disable-next-line no-param-reassign
  acc += markupGallery;

  return acc;
}, '');

refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);

// Open modal click on img

function onClickImage(event) {
  event.preventDefault();

  const imgRef = event.target;
  const targetRef = event.currentTarget;
  // console.log(event.target);
  // console.log(event.currentTarget);

  if (targetRef === imgRef) {
    // console.log(event.target);
    // console.log(event.currentTarget);
    return;
  }

  refs.modalImg.src = imgRef.dataset.src;
  refs.modalImg.alt = imgRef.getAttribute('alt');
  refs.modalWindow.classList.add('is-open');
  window.addEventListener('keydown', onKeyboard);
}

// close modal function

function onCloseModal() {
  refs.modalWindow.classList.remove('is-open');
  refs.modalImg.src = '';
  refs.modalImg.alt = '';
  window.removeEventListener('keydown', onKeyboard);
}

function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}
function onKeyboard(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
