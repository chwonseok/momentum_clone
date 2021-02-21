"use strict";

const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector(".js-clock-span");

const displayTime = function () {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Display time
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
};

function init() {
  setInterval(displayTime, 500);
}
init();
