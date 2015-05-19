angular
    .module("tictactoeApp")
    .controller("tictactoeController", tictactoeController);

tictactoeController.$inject = ['$firebaseObject'];

function tictactoeController($firebaseObject) {
    var self = this;
    self.Lakers = '<img src="images/lakers_logo_mini.png">';
    self.Celtics = '<img src="images/celtics_logo_mini.gif">';
    self.chooseBox = chooseBox;
    self.getWinner = getWinner;
    self.catsGame = catsGame;
    self.takeTurns = takeTurns;
    self.boardReset = boardReset;
    self.gameReset = gameReset;
    self.updateScoreboard = updateScoreboard;
    self.Game = getGame();

    function getGame() {
        var ref = new Firebase("https://nbatictactoe.firebaseio.com/");
        var Game = $firebaseObject(ref);
        return Game;
    }

    function chooseBox($index) {
        console.log(self.Game)
        if ((self.Game.cells[$index].isLakers == true) || (self.Game.cells[$index].isCeltics == true)) {
            alert("Box taken!");
        } else {
            takeTurns($index);
        }
    }

    function takeTurns($index) {
        self.Game.turn++;
        if ((self.Game.turn + 2) % 2 === 0) {
            self.Game.cells[$index].isLakers = true;
        } else {
            self.Game.cells[$index].isCeltics = true;
        }
        getWinner();
        self.Game.$save(self.Game.turn);
        self.Game.$save(self.Game.cells);
    }

    function getWinner() {
        // Output Lakers as winners if Lakers player inputs 3 in a row horizontally, vertically or diagonally// 
        if (((self.Game.cells[0].isLakers == true) && (self.Game.cells[1].isLakers == true) && (self.Game.cells[2].isLakers == true)) ||
            ((self.Game.cells[3].isLakers == true) && (self.Game.cells[4].isLakers == true) && (self.Game.cells[5].isLakers == true)) ||
            ((self.Game.cells[6].isLakers == true) && (self.Game.cells[7].isLakers == true) && (self.Game.cells[8].isLakers == true)) ||
            ((self.Game.cells[0].isLakers == true) && (self.Game.cells[3].isLakers == true) && (self.Game.cells[6].isLakers == true)) ||
            ((self.Game.cells[1].isLakers == true) && (self.Game.cells[4].isLakers == true) && (self.Game.cells[7].isLakers == true)) ||
            ((self.Game.cells[2].isLakers == true) && (self.Game.cells[5].isLakers == true) && (self.Game.cells[8].isLakers == true)) ||
            ((self.Game.cells[0].isLakers == true) && (self.Game.cells[4].isLakers == true) && (self.Game.cells[8].isLakers == true)) ||
            ((self.Game.cells[6].isLakers == true) && (self.Game.cells[4].isLakers == true) && (self.Game.cells[2].isLakers == true))) {
            self.Game.lakersRingCount++;
            self.Game.$save(self.Game.lakersRingCount);
            boardReset();
            updateScoreboard();
        }
        // Output Celtics as winners if Celtics player inputs 3 in a row horizontally, vertically or diagonally//
        if (((self.Game.cells[0].isCeltics == true) && (self.Game.cells[1].isCeltics == true) && (self.Game.cells[2].isCeltics == true)) ||
            ((self.Game.cells[3].isCeltics == true) && (self.Game.cells[4].isCeltics == true) && (self.Game.cells[5].isCeltics == true)) ||
            ((self.Game.cells[6].isCeltics == true) && (self.Game.cells[7].isCeltics == true) && (self.Game.cells[8].isCeltics == true)) ||
            ((self.Game.cells[0].isCeltics == true) && (self.Game.cells[3].isCeltics == true) && (self.Game.cells[6].isCeltics == true)) ||
            ((self.Game.cells[1].isCeltics == true) && (self.Game.cells[4].isCeltics == true) && (self.Game.cells[7].isCeltics == true)) ||
            ((self.Game.cells[2].isCeltics == true) && (self.Game.cells[5].isCeltics == true) && (self.Game.cells[8].isCeltics == true)) ||
            ((self.Game.cells[0].isCeltics == true) && (self.Game.cells[4].isCeltics == true) && (self.Game.cells[8].isCeltics == true)) ||
            ((self.Game.cells[6].isCeltics == true) && (self.Game.cells[4].isCeltics == true) && (self.Game.cells[2].isCeltics == true))) {
            self.Game.celticsRingCount++;
            self.Game.$save(self.Game.celticsRingCount);
            boardReset();
            updateScoreboard();

        } else {
            catsGame();
        }
    }

    function catsGame() {
        if (self.Game.turn == 9) {
            alert("Draw!");
            boardReset();
        }
    }

    function updateScoreboard() {
        if (self.Game.lakersRingCount > 0) {
            self.Game.lakersRings[self.Game.lakersRingCount - 1] = true;
            self.Game.$save(self.Game.lakersRings);
        }
        if (self.Game.lakersRingCount == 5) {
            alert("Lakers are NBA Champions!")
            gameReset();
        }
        if (self.Game.celticsRingCount > 0) {
            self.Game.celticsRings[self.Game.celticsRingCount - 1] = true;
            self.Game.$save(self.Game.celticsRings);
        }
        if (self.Game.celticsRingCount == 5) {
            alert("Celtics are NBA Champions!")
            gameReset();
        }
    }

    function boardReset() {
        for (i = 0; i < self.Game.cells.length; i++) {
            self.Game.cells[i].isLakers = false;
            self.Game.cells[i].isCeltics = false;
            self.Game.turn = 0;
            self.Game.$save();
        }
    }

    function gameReset() {
        console.log("game reset is running");
        self.Game.celticsRingCount = 0;
        self.Game.lakersRingCount = 0;
        if (self.Game.lakersRingCount == 0) {
            for (i = 0; i < self.Game.lakersRings.length; i++) {
                self.Game.lakersRings[i] = false;
                self.Game.$save(self.Game.lakersRings);
            }
        }
        if (self.Game.celticsRingCount == 0) {
            for (i = 0; i < self.Game.celticsRings.length; i++) {
                self.Game.celticsRings[i] = false;
                self.Game.$save(self.Game.celticsRings);
            }
        }


    }

}




// self.cells = [
//     {isLakers:false, isCeltics:false},
//     {isLakers:false, isCeltics:false},
//     {isLakers:false, isCeltics:false},
//     {isLakers:false, isCeltics:false},
//     {isLakers:false, isCeltics:false},
//     {isLakers:false, isCeltics:false},
//     {isLakers:false, isCeltics:false},
//     {isLakers:false, isCeltics:false},
//     {isLakers:false, isCeltics:false},
// ];
// self.lakersRings = [
//     {lakersRing: false}, 
//     {lakersRing: false},
//     {lakersRing: false},  
//     {lakersRing: false},
//     {lakersRing: false},
//     ];
// self.celticsRings = [
//     {celticsRing: false},
//     {celticsRing: false},
//     {celticsRing: false},
//     {celticsRing: false},
//     {celticsRing: false},
//     ];
/*
This function essentially initiates the game by establishing which
cells are taken and inserting input values per cell.
*/


/*
This function dictates whose turn it is, Lakers or Celtics. 
*/
