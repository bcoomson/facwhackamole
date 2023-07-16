let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let timer;
let remainingTime = 15;

function startGame() {
  document.getElementById("title-page").style.display = "none"; // Hide the title page
  document.getElementById("game-page").style.display = "block"; // Show the game page
  setGame();
}

function updateTimer() {
  const countdownElement = document.getElementById("countdown");
  countdownElement.textContent = remainingTime.toString();

  if (remainingTime <= 0) {
    endGame();
  } else {
    remainingTime--;
  }
}

function setGame() {
  for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(tile);
  }
  
  updateTimer(); // Initial update of the timer
  setInterval(updateTimer, 1000); // Start updating the timer every second

  timer = setTimeout(endGame, remainingTime * 1000); // Set the timer for game over
  setInterval(setMole, 2000);
  setInterval(setPlant, 3000);
}

function restartGame() {
  resetGame();
  // setGame();
}

// function returnToHomePage() {
//   resetGame();
//   document.getElementById("title-page").style.display = "block"; // Show the title page
//   document.getElementById("game-page").style.display = "none"; // Hide the game page
// }

function resetGame() {
  clearInterval(timer);
  gameOver = false;
  score = 0;
  remainingTime = 15;
  document.getElementById("score").textContent = score.toString();
  document.getElementById("game-over-overlay").style.display = "none"; // Hide the game over overlay
}

function getRandomTile() {
  let num = Math.floor(Math.random() * 9);
  return num.toString();
}

function setMole() {
  if (gameOver) {
    return;
  }
  if (currMoleTile) {
    currMoleTile.innerHTML = "";
  }
  let mole = document.createElement("img");
  mole.src = "./images/monty-mole.png";

  let num = getRandomTile();
  if (currPlantTile && currPlantTile.id === num) {
    return;
  }
  currMoleTile = document.getElementById(num);
  currMoleTile.appendChild(mole);
}

function setPlant() {
  if (gameOver) {
    return;
  }
  if (currPlantTile) {
    currPlantTile.innerHTML = "";
  }
  let plant = document.createElement("img");
  plant.src = "./images/piranha-plant.png";

  let num = getRandomTile();
  if (currMoleTile && currMoleTile.id === num) {
    return;
  }
  currPlantTile = document.getElementById(num);
  currPlantTile.appendChild(plant);
}

function selectTile() {
  if (gameOver) {
    return;
  }
  if (this === currMoleTile) {
    score += 1;
    document.getElementById("score").textContent = score.toString();
    document.getElementById("hitSound").play(); // Play the hit sound effect
    setMole();
  } else if (this === currPlantTile) {
    document.getElementById("score").textContent = "GAME OVER: " + score.toString();
    document.getElementById("missSound").play(); // Play the miss sound effect
    endGame();
    remainingTime = 0;
  }
}

function endGame() {
  gameOver = true;
  document.getElementById("game-over-overlay").style.display = "flex"; // Show the game over overlay
  clearInterval(timer);
}

resetGame(); // Reset the game initially