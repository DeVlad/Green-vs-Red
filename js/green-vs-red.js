// Green vs. Red game - initial version
// Test case 1 - passed
// Example with test case 2

const turns = 15;
const cols = 4;
const rows = 4;
let count = 0;
let grid = [
  [1, 0, 0, 1],
  [1, 1, 1, 1],
  [0, 1, 0, 0],
  [1, 0, 1, 0]
];
// Target cell coordinates
const x = 2;
const y = 2;
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

function getCell(grid, y, x) {
  let value;
  let empty;
  try {
    empty = grid[y][x] !== undefined;
    value = empty ? grid[y][x] : null;
  } catch (e) {
    empty = null;
  }
  return value;
}

function getNeighbourCells(grid, y, x) {
  return {
    up: getCell(grid, y - 1, x),
    upRight: getCell(grid, y - 1, x + 1),
    right: getCell(grid, y, x + 1),
    downRight: getCell(grid, y + 1, x + 1),
    down: getCell(grid, y + 1, x),
    downLeft: getCell(grid, y + 1, x - 1),
    left: getCell(grid, y, x - 1),
    upLeft: getCell(grid, y - 1, x - 1)
  }
}

function makeBlankGrid(columns, rows) {
  return Array.from(Array(columns), () => new Array(rows));
}

function init() {
  let nextGenerationGrid = [];
  for (let z = 1; z <= turns; z++) {
    if (turns > 1 || turns === turns - 1) {
      nextGenerationGrid = makeBlankGrid(cols, rows);
    }
    for (let i = 0; i < cols; i++) { // walk order by columns
      for (let j = 0; j < rows; j++) {
        const neighbourCells = getNeighbourCells(grid, j, i);
        const greenNeighbourCells = countOccurrences(Object.values(neighbourCells), 1);
        if (grid[j][i] === 1) { // if cell is green
          if (greenNeighbourCells === 2 || greenNeighbourCells === 3 || greenNeighbourCells === 6) {
            nextGenerationGrid[j][i] = 1; //the green cell will stay green
          } else {
            nextGenerationGrid[j][i] = 0; //green cell will become red
          }
        } else if ((grid[j][i] === 0)) { // if cell is red
          if (greenNeighbourCells === 3 || greenNeighbourCells === 6) {
            nextGenerationGrid[j][i] = 1; // the red cell will become green
          } else {
            nextGenerationGrid[j][i] = 0; // red cell will stay red
          }
        } else {
          console.log('Error: Cell is not red or green!');
        }
      }
    }
    grid = nextGenerationGrid;
    const targetCellValue = getCell(grid, y, x);
    if (targetCellValue === 1) {
      count++
    }
  }
  console.log(count);
}
init();
