'use strict';

class Grid {
  constructor(rows, columns, grid) {
    this.rows = rows;
    this.columns = columns;
    this.grid = grid;
    this.nextGenerationGrid = [];
  }

  makeBlankGrid(rows, columns) {
    this.nextGenerationGrid = Array.from(Array(columns), () => new Array(rows));
  }
}

export default Grid;
