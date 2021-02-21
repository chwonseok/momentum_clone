"use strict";
const form = document.querySelector(".js-form-user"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-form-greeting");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

const saveName = function (name) {
  localStorage.setItem(USER_LS, name);
};

const submitName = function (e) {
  e.preventDefault();

  const currentValue = input.value;
  displayGreeting(currentValue);

  saveName(currentValue);
};

const askName = function () {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", submitName);
};

const displayGreeting = function (name) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.classList.add("letterClr");
  greeting.innerText = `How's your day going, ${name}?`;
};

const loadName = function () {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askName();
  } else {
    displayGreeting(currentUser);
  }
};

function init() {
  loadName();
}
init();
