/**
 * Sudoku Solver.
 * 
 * @returns {Solver}
 */
var Solver = function () {
    this.data;
    this.flag;
    this.tempData;
};

/**
 * Solve Sudoku puzzle.
 *
 * @param {Array} data
 * @returns {Array}
 */
Solver.prototype.solve = function (data) {
    this.data = data;
    this.tempData = [];
    this.flag = false;

    for (var x = 0; x <= 8; x++) {
        this.tempData[x] = [];
        for (var y = 0; y <= 8; y++) {
            this.tempData[x][y] = this.preparePossible(x, y);
        }
    }

    for (var x = 0; x <= 8; x++) {
        for (var y = 0; y <= 8; y++) {
	    if (typeof this.tempData[x][y] == 'object' && this.tempData[x][y].length > 1) {
		for (t = 0; t < this.tempData[x][y].length; t++) {
		    if (this.checkUnique(x, y, this.tempData[x][y][t]) == 1) {
			this.tempData[x][y] = this.tempData[x][y][t];
		    }
		}
	    }
        }
    }

    console.table(this.tempData);
    console.log(this.flag);
    return this.tempData;
};


/**
 * Prepare possible data for each cell.
 *
 * @param {integer} x
 * @param {integer} y
 * @returns {integer|Array}
 */
Solver.prototype.preparePossible = function (x, y) {
    var currentValue = (typeof this.data[x][y] != 'number') ? 0 : this.data[x][y];
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

    if (currentArray.length == 1) {
        this.flag = true;
        return currentArray[0];
    } else {
//	currentArray = currentArray.join('');
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

Solver.prototype.prettyPrint = function (data) {
    var res = '<table style="border: 1px solid black; margin-top: 15px;">';
    var cellStyleDefault = 'border: 1px dotted grey;';
    var cellStyleRow = 'border-bottom: 2px solid black;';
    var cellStyleColumn = 'border-right: 2px solid black;';
    for (i = 0; i <= 8; i++) {
        res += '<tr>';
	var rclass = (i%3==2) ? cellStyleRow : '';
        for (j = 0; j <= 8; j++) {
	    var cclass = (j%3==2) ? cellStyleColumn : '';
	    res += '<td style="text-align: center; width: 60px; border: 1px dotted grey; ' + rclass + cclass+ '">' + data[i][j] + '</td>';
        }
        res += '</tr>';
    }
    res += '</table>';
    return res;
};

Solver.prototype.checkUnique = function (x, y, v) {
    // check unique value in current square
    // 0, 3, 6
    var sx = x - x % 3, ex = sx + 3, sy = y - y % 3, ey = sy + 3;
    var counter = 0;
    for (i = sx; i < ex; i++) {
        for (j = sy; j < ey; j++) {
            if (typeof this.tempData[i][j] == 'object') {
		if (this.tempData[i][j].indexOf(v) != -1) {
		    counter++;
		}
            } else {
		if (this.tempData[i][j] == v) {
		    counter++;
		}
	    }
        }
    }
    return counter;
}
