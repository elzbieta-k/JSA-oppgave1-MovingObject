const object = document.querySelector(".object");

let startingPositionX = 0;
let startingPositionY = 0;

const objectHeight = object.offsetHeight;
const objectWidth = object.offsetWidth;
const move = 10;

// const windowInnerHeight = window.innerHeight;
// const windowInnerWeight = window.innerWidth;
const windowInnerHeight = document.documentElement.clientHeight;
const windowInnerWeight = document.documentElement.clientWidth;

document.addEventListener("click", (e) => {
  startingPositionX = e.clientX - objectHeight * 0.5;
  startingPositionY = e.clientY - objectWidth * 0.5;

  if (startingPositionX < 0) {
    startingPositionX = 0;
  } else if (startingPositionX + objectWidth > windowInnerWeight) {
    startingPositionX = windowInnerWeight - objectWidth;
  }

  if (startingPositionY < 0) {
    startingPositionY = 0;
  } else if (startingPositionY + objectHeight > windowInnerHeight) {
    startingPositionY = windowInnerHeight - objectHeight;
  }

  object.style.top = startingPositionY + "px";
  object.style.left = startingPositionX + "px";
});

document.addEventListener("keydown", (e) => {
  if (
    e.key === "ArrowDown" &&
    startingPositionY + move + objectHeight <= windowInnerHeight
  ) {
    startingPositionY += move;
  } else if (e.key === "ArrowUp" && startingPositionY - move >= 0) {
    startingPositionY -= move;
  } else if (e.key === "ArrowLeft" && startingPositionX - move >= 0) {
    startingPositionX -= move;
  } else if (
    e.key === "ArrowRight" &&
    startingPositionX + move + objectWidth <= windowInnerWeight
  ) {
    startingPositionX += move;
  }

  // if (startingPositionX > window.innerWidth || startingPositionX < 0) {
  //   alert("You reached the wall");
  // } else if (startingPositionY > window.innerHeight || startingPositionY < 0) {
  //   alert("You reached the top or bottom");
  // }

  object.style.top = startingPositionY + "px";
  object.style.left = startingPositionX + "px";
});
