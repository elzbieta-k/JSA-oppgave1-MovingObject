//Getting elements from HTML
const object = document.querySelector(".object");
const alien1 = document.querySelector(".alien1");
const alien2 = document.querySelector(".alien2");
const alien3 = document.querySelector(".alien3");

const aliens = [alien1, alien2, alien3];

const message = document.querySelector("h3");

//Setting starting position of the object to 0
let startingPositionX = 0;
let startingPositionY = 0;

//Getting the dimensions of the object element in pixels
const objectHeight = object.offsetHeight;
const objectWidth = object.offsetWidth;

//Seting every move with arrow to 10
const move = 10;

//Getting height and width of the viewport
const windowInnerHeight = document.documentElement.clientHeight;
const windowInnerWidth = document.documentElement.clientWidth;

//Function that set display of alien element to block and give them random position
const init = () => {
  aliens.forEach((alien) => {
    alien.style.display = "block";
    alien.style.top = Math.floor(Math.random() * windowInnerHeight) + "px";
    alien.style.left = Math.floor(Math.random() * windowInnerWidth) + "px";
  });
};

//Function that check is "ufo" is getting an alien
const checkCollisions = () => {
  //Getting information about the size of an "ufo" and its position relative to the viewport.
  const ufoRect = object.getBoundingClientRect();

  //Getting information about the size of  every "alien" and its position relative to the viewport.
  for (let alien of aliens) {
    const alienRect = alien.getBoundingClientRect();

    //Getting true or false if the collision happen
    const collision = !(
      ufoRect.top > alienRect.bottom ||
      ufoRect.bottom < alienRect.top ||
      ufoRect.left > alienRect.right ||
      ufoRect.right < alienRect.left
    );

    //Setting display to none of current alien if the collision is true
    if (collision) {
      alien.style.display = "none";
    }

    //Setting display to none of current alien when clicking on it
    alien.addEventListener("click", () => {
      alien.style.display = "none";
    });
  }

  //Checking if all aliens have changed display to "none" by function .every(), return true or false
  const allHidden = aliens.every((alien) => alien.style.display === "none");

  //If all aliens have display: none - initialize the game (set random positions to alien, and setting display to "block")
  if (allHidden) {
    init();
  }
};

// Event listener on "click"
document.addEventListener("click", (e) => {
  //setting position of "ufo" to clicked position (subtract the half of the size of ufo so it is centered)
  startingPositionX = e.clientX - objectHeight * 0.5;
  startingPositionY = e.clientY - objectWidth * 0.5;

  //Chcecking positions to make sure that "ufo" doesn't leave the screen
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

  //Update the position and checking if there is a collision
  object.style.top = startingPositionY + "px";
  object.style.left = startingPositionX + "px";
  checkCollisions();
});

document.addEventListener("keydown", (e) => {
  //Chcecking positions to make sure that "ufo" doesn't leave the screen
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

  //Update the position and checking if there is a collision
  object.style.top = startingPositionY + "px";
  object.style.left = startingPositionX + "px";
  checkCollisions();
});

//Initialize the game when page is loaded
window.onload = init;
