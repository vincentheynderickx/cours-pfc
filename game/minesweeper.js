// Remarque : Je n'ai pas eu le temps de terminer ce jeu, mais le tic-tac-toe est fonctionnel.

window.addEventListener("load", () => {
  // Create grid
  const grid = document.getElementById("minesweeper-grid");
  const rows = 10;
  const cols = 10;

  for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.classList.add("minesweeper-row");
    grid.appendChild(row);

    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("div");
      cell.classList.add("minesweeper-cell");
      row.appendChild(cell);
    }
  }

  // Add mines

  const cells = document.querySelectorAll(".minesweeper-cell");
  const mines = 10;
  const mineIndexes = [];

  while (mineIndexes.length < mines) {
    const index = Math.floor(Math.random() * cells.length);

    if (!mineIndexes.includes(index)) {
      mineIndexes.push(index);
    }
  }

  mineIndexes.forEach((index) => {
    cells[index].classList.add("mine");
  });

  // Add numbers

  cells.forEach((cell, index) => {
    if (cell.classList.contains("mine")) {
      return;
    }

    const row = Math.floor(index / cols);
    const col = index % cols;
    const mines = [];

    for (let i = Math.max(0, row - 1); i <= Math.min(rows - 1, row + 1); i++) {
      for (
        let j = Math.max(0, col - 1);
        j <= Math.min(cols - 1, col + 1);
        j++
      ) {
        if (i === row && j === col) {
          continue;
        }

        const neighborIndex = i * cols + j;

        if (cells[neighborIndex].classList.contains("mine")) {
          mines.push(neighborIndex);
        }
      }
    }

    if (mines.length > 0) {
      cell.textContent = mines.length;
    }
  });

  // Reveal cells

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (cell.classList.contains("revealed")) {
        return;
      }

      cell.classList.add("revealed");

      if (cell.classList.contains("mine")) {
        cells.forEach((cell) => {
          cell.classList.add("revealed");
        });
      }

      if (cell.textContent === "") {
        const row = Math.floor(index / cols);
        const col = index % cols;

        for (
          let i = Math.max(0, row - 1);
          i <= Math.min(rows - 1, row + 1);
          i++
        ) {
          for (
            let j = Math.max(0, col - 1);
            j <= Math.min(cols - 1, col + 1);
            j++
          ) {
            const neighborIndex = i * cols + j;
            cells[neighborIndex].click();
          }
        }
      }
    });
  });

  // Flag cells

  cells.forEach((cell) => {
    cell.addEventListener("contextmenu", (event) => {
      event.preventDefault();

      if (cell.classList.contains("revealed")) {
        return;
      }

      if (cell.classList.contains("flag")) {
        cell.classList.remove("flag");
      } else {
        cell.classList.add("flag");
      }
    });
  });

  // Reset game

  const resetButton = document.getElementById("minesweeper-reset");

  resetButton.addEventListener("click", () => {
    cells.forEach((cell) => {
      cell.classList.remove("revealed", "mine", "flag");
      cell.textContent = "";
    });
  });

  // Show mines

  const showButton = document.getElementById("minesweeper-show");

  showButton.addEventListener("click", () => {
    cells.forEach((cell) => {
      if (cell.classList.contains("mine")) {
        cell.classList.add("revealed");
      }
    });
  });
});
