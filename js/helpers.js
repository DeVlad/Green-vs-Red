"use strict";

class Helpers {
  
  static inputValidator(input) {
    return /^[0-9|, ]+$/.test(input);
  }

  static gridRangeValidator(x, y) {
    return (x > -1 && y > -1 && x <= y && x < 1000 && y < 1000);
  }

  static async formatData(input) {
      let data = input.split("|");
      data = data.filter(entry => entry.trim().length > 0); // remove empty strings
      const cellCoordinatesAndTurns = data.slice(-1);
      const gridCoordinates = data.slice(0);
      const rows = Number(gridCoordinates[0].split(",")[0].trim());
      const columns = Number(gridCoordinates[0].split(",")[1].trim());
      const turns = Number(cellCoordinatesAndTurns[0].split(",")[2].trim());
      if(!this.gridRangeValidator(rows, columns)) return false;
      const cellRow = Number(cellCoordinatesAndTurns[0].split(",")[0].trim());
      const cellColumn = Number(cellCoordinatesAndTurns[0].split(",")[1].trim());
      let gridData = data.slice(1, -1);
      let grid = [];
      for (let i = 0; i < gridData.length; i++) {
        grid.push([...gridData[i]].map(Number));
      }
      return { "rows": rows, "columns": columns, "grid": grid, "cellRow": cellRow, "cellColumn": cellColumn, "turns": turns };
  }
}

export default Helpers;
