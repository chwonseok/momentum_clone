'use strict';
const body = document.querySelector('body');

const IMG_NUMBER = 5;
const number = Math.trunc(Math.random() * IMG_NUMBER) + 1;

const paintImg = function (imgNum) {
  const image = new Image();
  image.classList.add('backgroundImg');
  image.src = `images/image-${imgNum}.jpg`;
  body.appendChild(image);
};

function init() {
  paintImg(number);
}
init();
