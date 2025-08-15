const object = document.querySelector(".object");
const alien1 = document.querySelector(".alien1");
const alien2 = document.querySelector(".alien2");
const alien3 = document.querySelector(".alien3");

const aliens = [alien1, alien2, alien3];

const message = document.querySelector("h3");

let startingPositionX = 0;
let startingPositionY = 0;

const objectHeight = object.offsetHeight;
const objectWidth = object.offsetWidth;
const move = 10;

const windowInnerHeight = document.documentElement.clientHeight;
const windowInnerWidth = document.documentElement.clientWidth;

const init = () => {
  aliens.forEach((alien) => {
    alien.style.display = "block";
    alien.style.top = Math.floor(Math.random() * windowInnerHeight) + "px";
    alien.style.left = Math.floor(Math.random() * windowInnerWidth) + "px";
  });
};

const checkCollisions = () => {
  const ufoRect = object.getBoundingClientRect();

  for (let alien of aliens) {
    const alienRect = alien.getBoundingClientRect();

    const collision = !(
      ufoRect.top > alienRect.bottom ||
      ufoRect.bottom < alienRect.top ||
      ufoRect.left > alienRect.right ||
      ufoRect.right < alienRect.left
    );

    if (collision) {
      alien.style.display = "none";
    }
    alien.addEventListener("click", () => {
      alien.style.display = "none";
    });
  }

  const allHidden = aliens.every((alien) => alien.style.display === "none");

  if (allHidden) {
    init();
  }
};

document.addEventListener("click", (e) => {
  startingPositionX = e.clientX - objectHeight * 0.5;
  startingPositionY = e.clientY - objectWidth * 0.5;

  if (startingPositionX < 0) {
    startingPositionX = 0;
  } else if (startingPositionX + objectWidth > windowInnerWidth) {
    startingPositionX = windowInnerWidth - objectWidth;
  }

  if (startingPositionY < 0) {
    startingPositionY = 0;
  } else if (startingPositionY + objectHeight > windowInnerHeight) {
    startingPositionY = windowInnerHeight - objectHeight;
  }

  object.style.top = startingPositionY + "px";
  object.style.left = startingPositionX + "px";
  checkCollisions();
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
    startingPositionX + move + objectWidth <= windowInnerWidth
  ) {
    startingPositionX += move;
  }

  object.style.top = startingPositionY + "px";
  object.style.left = startingPositionX + "px";
  checkCollisions();
});

window.onload = init;
