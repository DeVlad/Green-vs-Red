"use strict";

import Grid from "./js/grid.js";
import Cell from "./js/cell.js";
import Helpers from "./js/helpers.js";
import readline from "readline";

const rl = readline.createInterface({ input: process.stdin });
let count = 0;

async function readInput() {
  let data = [];
  for await (const line of rl) data = data + "|" + line;
  return data;
}

readInput().then((data) => init(data));

async function init(data) {
  if (Helpers.inputValidator(data)) {
    const gameOptions = await Helpers.formatData(data);
    if (gameOptions) {
      const grid = await new Grid(gameOptions.rows, gameOptions.columns, gameOptions.grid);
      const cell = await new Cell(gameOptions.cellRow, gameOptions.cellColumn);
      const turns = gameOptions.turns;
      for (let t = 1; t <= turns; t++) {
        if (turns > 1 || turns === turns - 1) {
          grid.makeBlankGrid(grid.columns, grid.rows);
        }
        for (let r = 0; r < grid.columns; r++) {
          for (let c = 0; c < grid.rows; c++) {
            const neighbourCells = cell.getNeighbourCells(grid.grid, c, r);
            const greenNeighbourCells = cell.countOccurrences(Object.values(neighbourCells), 1);
            if (grid.grid[c][r] === 1) { // if cell is green
              if (greenNeighbourCells === 2 || greenNeighbourCells === 3 || greenNeighbourCells === 6) {
                grid.nextGenerationGrid[c][r] = 1; //the green cell will stay green
              } else {
                grid.nextGenerationGrid[c][r] = 0; //the green cell will become red
              }
            } else if (grid.grid[c][r] === 0) {
              if (greenNeighbourCells === 3 || greenNeighbourCells === 6) {
                grid.nextGenerationGrid[c][r] = 1; // the red cell will become green
              } else {
                grid.nextGenerationGrid[c][r] = 0; // red cell will stay red
              }
            }
          }
        }
        grid.grid = grid.nextGenerationGrid;
        if (cell.getCell(grid.grid, gameOptions.cellColumn, gameOptions.cellRow) === 1) {
          count++;
        }
      }
      console.log(count);
    } else {
      console.error("Error - Grid data out of range!");
    }
  } else {
    console.error("Error - Invalid input data!");
  }
  process.exit();
}
