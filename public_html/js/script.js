/**
 * Sudoku Solver.
 * 
 * @returns {Solver}
 */
var Solver = function () {
    this.data;
};

/**
 * Solve Sudoku puzzle.
 *
 * @param {Array} data
 * @returns {Array}
 */
Solver.prototype.solve = function (data) {
    this.data = data;
    console.table(this.data);
    var tempData = [];
    for (var x = 0; x < 8; x++) {
        tempData[x] = [];
        for (var y = 0; y < 8; y++) {
            tempData[x][y] = this.preparePossible(x, y);
        }
    }
    console.table(tempData);
};


/**
 * Prepare possible data for each cell.
 *
 * @param {integer} x
 * @param {integer} y
 * @returns {integer|Array}
 */
Solver.prototype.preparePossible = function (x, y) {
    var currentValue = this.data[x][y];
    if (currentValue != 0) {
        return currentValue;
    }
    currentArray = [];
    for (p = 1; p < 10; p++) {
        currentArray[p] = this.checkSquare(x, y, p);
    }
    return currentArray;
};

/**
 * Check current square.
 *
 * @param {type} x
 * @param {type} y
 * @param {type} p
 * @returns {integer}
 */
Solver.prototype.checkSquare = function (x, y, p) {
    // 0, 3, 6
    var sx = x-x%3, ex = sx+3, sy = y-y%3, ey = sy+3;
    for (i = sx; i < ex; i++) {
        for (j = sy; j < ey; j++) {
            if (this.data[i][j] == p) {
                return 0;
            }
        }
    }
    return p;
};

