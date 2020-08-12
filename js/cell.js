"use strict";

class Cell {
  
  getCell(grid, y, x) {
    try {
      if (grid[y][x] === 1) {
        return 1;
      } else if (grid[y][x] === 0) {
        return 0;
      }
    } catch (e) {
      return null; //out of the grid
    }
    return null;
  }

  getNeighbourCells(grid, y, x) {
    return {
      up: this.getCell(grid, y - 1, x),
      upRight: this.getCell(grid, y - 1, x + 1),
      right: this.getCell(grid, y, x + 1),
      downRight: this.getCell(grid, y + 1, x + 1),
      down: this.getCell(grid, y + 1, x),
      downLeft: this.getCell(grid, y + 1, x - 1),
      left: this.getCell(grid, y, x - 1),
      upLeft: this.getCell(grid, y - 1, x - 1),
    };
  }

  countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
}

export default Cell;
