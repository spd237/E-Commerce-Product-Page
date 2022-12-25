"use strict";

const openCart = document.querySelector(".navbar__cart");
const cart = document.querySelector(".cart-open");
const removeProduct = document.querySelector(".product-on-card__remove");
const mobileMenu = document.querySelector(".side-nav");
const openMobileMenu = document.querySelector(".navbar__mobile-menu");
const closeMobileMenu = document.querySelector(".side-nav__close");
const overlay = document.querySelector(".overlay");
const mainThumbnails = document.querySelectorAll(".thumbnail-container__img");
const slidingButtons = document.querySelectorAll("[data-slide]");
const increaseQuantity = document.querySelector(".quantity__increase");
const decreaseQuantity = document.querySelector(".quantity__decrease");
const quantity = document.querySelector(".quantity__amount");
const quantityBubble = document.querySelector(".quantity-bubble");
const cartEmptyText = document.querySelector(".cart-open__empty");
const cartNotEmptyText = document.querySelector(".product-on-cart");
const addToCartBtn = document.querySelector(".addBtn");
const deleteFromCartBtn = document.querySelector(".product-on-cart__remove");
const quantityOnCart = document.querySelector(".product-on-cart__quantity");
const totalPrice = document.querySelector(".product-on-cart__total-amount");
const openLightbox = document.querySelectorAll(".img-slider__container-image");
const closeLightbox = document.querySelector(".lightbox-container__close");
const lightbox = document.querySelector(".lightbox-container");
const lightboxThumbnails = document.querySelectorAll(
  ".lightbox-container__thumbnails-img"
);

openCart.addEventListener("click", (e) => {
  cart.classList.toggle("active");
});

function handleMobileMenu() {
  openMobileMenu.addEventListener("click", (e) => {
    mobileMenu.classList.add("open");
    overlay.classList.add("active");
  });
  closeMobileMenu.addEventListener("click", (e) => {
    mobileMenu.classList.remove("open");
    overlay.classList.remove("active");
  });
}
handleMobileMenu();

let quantityValue = 0;

function handleQuantities() {
  quantityBubble.textContent = quantityBubble.dataset.amount;
  quantityOnCart.textContent = quantityBubble.dataset.amount;
  totalPrice.textContent = "$" + 125 * quantityBubble.dataset.amount + ".00";
}

increaseQuantity.addEventListener("click", (e) => {
  quantity.textContent = quantityValue + 1;
  quantityValue++;
  quantityBubble.dataset.amount++;
  handleQuantities();
});

decreaseQuantity.addEventListener("click", (e) => {
  if (quantityValue <= 0) {
    return;
  } else {
    quantity.textContent = quantityValue - 1;
    quantityValue--;
    quantityBubble.dataset.amount--;
    handleQuantities();
  }
});

addToCartBtn.addEventListener("click", (e) => {
  quantityBubble.style.display = "block";
  cartNotEmptyText.classList.remove("hidden");
  cartEmptyText.classList.add("hidden");
});
deleteFromCartBtn.addEventListener("click", (e) => {
  cartNotEmptyText.classList.add("hidden");
  cartEmptyText.classList.remove("hidden");
  quantityBubble.textContent = 0;
});

openLightbox.forEach((img) => {
  img.addEventListener("click", (e) => {
    lightbox.classList.remove("hidden");
    overlay.classList.add("active");
  });
});

closeLightbox.addEventListener("click", (e) => {
  lightbox.classList.add("hidden");
  overlay.classList.remove("active");
});

function handleImageSliding(container) {
  slidingButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const direction = btn.dataset.slide === "right" ? 1 : -1;
      const images = document.querySelector(`${container}`);
      const activeSlide = images.querySelector("[data-active]");
      console.log(activeSlide);
      let index = [...images.children].indexOf(activeSlide) + direction;
      if (index < 0) index = images.children.length - 1;
      if (index >= images.children.length) index = 0;

      images.children[index].dataset.active = true;
      delete activeSlide.dataset.active;
    });
  });
}

handleImageSliding(".image-container");
handleImageSliding(".lightbox-container__images");

function handleThumbnails(e) {
  const images = document.querySelector(".img-slider__container");
  const activeSlide = images.querySelector("[data-active]");
  let index = e.target.dataset.index;
  delete activeSlide.dataset.active;
  images.children[index].dataset.active = true;

  const lightboxImages = document.querySelector(".lightbox-container__images");
  const activeLightboxSlide = lightboxImages.querySelector("[data-active]");
  delete activeLightboxSlide.dataset.active;
  lightboxImages.children[index].dataset.active = true;
}

mainThumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", (e) => {
    handleThumbnails(e);
  });
});

lightboxThumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", (e) => {
    handleThumbnails(e);
  });
});
