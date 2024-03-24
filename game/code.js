// On récupère tous les éléments de la grille
const gridItems = document.querySelectorAll(".cell");
let player = "red";
let redCells = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let greenCells = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function checkWin(redCells, greenCells) {
  const WinConfigurations = [
    [1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 1, 0, 0],
  ];
  // On vérifie si une des configurations gagnantes est présente dans les cellules rouges ou vertes mais la difficulté est qu'il doit y avoir inclusion d'une configuration gagnante dans les cellules
  for (const config of WinConfigurations) {
    // Vérification pour les cellules rouges et vertes
    let countSimilarRed = 0;
    let countSimilarGreen = 0;
    for (let i = 0; i < 10; i++) {
      if (redCells[i] === 1 && config[i] === 1) {
        countSimilarRed++;
      }
      if (greenCells[i] === 1 && config[i] === 1) {
        countSimilarGreen++;
      }
      if (countSimilarRed === 3) {
        console.log("red win");
        var redCellsString = redCells.toString();
        document.getElementById("windlg").style.display = "block";
        document.getElementById("board").style.display = "none";
        document.getElementById("reset").style.display = "none";
        document.getElementById("redwin").style.display = "block";
        break;
      }
      if (countSimilarGreen === 3) {
        console.log("green win");
        document.getElementById("windlg").style.display = "block";
        document.getElementById("board").style.display = "none";
        document.getElementById("reset").style.display = "none";
        document.getElementById("greenwin").style.display = "block";
        break;
      }
    }
  }
}

// On ajoute un écouteur d'événements à chaque élément
for (let i = 0; i < gridItems.length; i++) {
  let item = gridItems[i];
  item.addEventListener("click", () => {
    let currentColor = window.getComputedStyle(item).backgroundColor;
    // On vérifie que la couleur actuelle est bien blanche
    if (currentColor === "rgb(255, 255, 255)") {
      // On regarde qui joue et on change la couleur en conséquence
      if (player === "red") {
        item.style.backgroundColor = "red";
        redCells[i] = 1;
        player = "green";
      } else {
        item.style.backgroundColor = "green";
        greenCells[i] = 1;
        player = "red";
      }
    }
    checkWin(redCells, greenCells);
  });
}

// Quand on appuie sur le bouton reset on remet toutes les cases en blanc
document.getElementById("reset").addEventListener("click", () => {
  gridItems.forEach((item) => {
    item.style.backgroundColor = "white";
  });
  // On fait en sorte que ce soit toujours le joueur rouge qui commence
  player = "red";
  redCells = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  greenCells = [0, 0, 0, 0, 0, 0, 0, 0, 0];
});

document.getElementById("restart").addEventListener("click", () => {
  gridItems.forEach((item) => {
    item.style.backgroundColor = "white";
  });
  // On fait en sorte que ce soit toujours le joueur rouge qui commence
  player = "red";
  redCells = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  greenCells = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  document.getElementById("windlg").style.display = "none";
  document.getElementById("board").style.display = "grid";
  document.getElementById("reset").style.display = "block";
  document.getElementById("redwin").style.display = "none";
  document.getElementById("greenwin").style.display = "none";
});
