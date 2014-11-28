/**
 * Sudoku Solver.
 * 
 * @returns {Solver}
 */
var Solver = function () {
    this.data;
    this.flag;
};

/**
 * Solve Sudoku puzzle.
 *
 * @param {Array} data
 * @returns {Array}
 */
Solver.prototype.solve = function (data) {
    this.data = data;
    var tempData = [];
    this.flag = false;
    for (var x = 0; x <= 8; x++) {
        tempData[x] = [];
        for (var y = 0; y <= 8; y++) {
            var p = this.preparePossible(x, y);
            if (typeof p !== 'number') {
                if (p.length == 1) {
                    p = p[0];
                    this.flag = true;
                } else {
                    p = p.join();
                }
            }
            tempData[x][y] = p;
        }
    }
    console.table(tempData);
    return tempData;
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
        var square = this.checkSquare(x, y, p);
        var line = this.checkRow(x, y, p);
        var post = this.checkColumn(x, y, p);
        currentArray[p] = this.merge(square, line, post);
    }
    currentArray = currentArray.filter(function (e) {
        return e != 0
    });
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
    var sx = x - x % 3, ex = sx + 3, sy = y - y % 3, ey = sy + 3;
    for (i = sx; i < ex; i++) {
        for (j = sy; j < ey; j++) {
            if (this.data[i][j] == p) {
                return 0;
            }
        }
    }
    return p;
};

/**
 * Check current row.
 *
 * @param {type} x
 * @param {type} y
 * @param {type} p
 * @returns {integer}
 */
Solver.prototype.checkRow = function (x, y, p) {
    for (j = 0; j <= 8; j++) {
        if (this.data[x][j] == p) {
            return 0;
        }
    }
    return p;
};

/**
 * Check current column.
 *
 * @param {type} x
 * @param {type} y
 * @param {type} p
 * @returns {integer}
 */
Solver.prototype.checkColumn = function (x, y, p) {
    for (i = 0; i <= 8; i++) {
        if (this.data[i][y] == p) {
            return 0;
        }
    }
    return p;
};

Solver.prototype.merge = function (a, b, c) {
    //return [a,b,c];
    return ((a == b) && (a == c)) ? a : 0;
};
