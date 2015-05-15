angular
    .module("tictactoeApp")
    .controller("tictactoeController", tictactoeController);

tictactoeController.$inject = ['$firebaseArray'];

function tictactoeController($firebaseArray) {
    var self = this;
    self.Lakers = '<img src="images/lakers_logo_mini.png">';
    self.Celtics = '<img src="images/celtics_logo_mini.gif">';
    self.chooseBox = chooseBox;
    self.turn = 0;
    self.takeTurns = takeTurns;
    self.getWinner = getWinner;
    self.Winner = "";
    self.catsGame = catsGame;
    self.boardReset = boardReset;
    self.lakersRingCount = 0;
    self.celticsRingCount = 0;
    self.updateScoreboard = updateScoreboard;



    self.cells = [
        {isLakers:false, isCeltics:false},
        {isLakers:false, isCeltics:false},
        {isLakers:false, isCeltics:false},
        {isLakers:false, isCeltics:false},
        {isLakers:false, isCeltics:false},
        {isLakers:false, isCeltics:false},
        {isLakers:false, isCeltics:false},
        {isLakers:false, isCeltics:false},
        {isLakers:false, isCeltics:false},
    ];
    self.lakersRings = [
        {lakersRing: false}, 
        {lakersRing: false},
        {lakersRing: false},  
        {lakersRing: false},
        {lakersRing: false},
        ];
    self.celticsRings = [
        {celticsRing: false},
        {celticsRing: false},
        {celticsRing: false},
        {celticsRing: false},
        {celticsRing: false},
    ];
/*
This function essentially initiates the game by establishing which
cells are taken and inserting input values per cell.
*/
    function chooseBox($index) {
        if ((self.cells[$index].isLakers == true)||(self.cells[$index].isCeltics == true)) {
            alert("Box taken!");
        } else {
            takeTurns($index);
        }
    }

    /*
    This function dictates whose turn it is, Lakers or Celtics. 
    */

    function takeTurns($index) {
        self.turn++;
        if ((self.turn + 2) % 2 === 0) {
            console.log(self.cells[$index])
            self.cells[$index].isLakers = true;
        } else {
            self.cells[$index].isCeltics = true;
        } getWinner ($index);
    }

    function getWinner ($index) {
          // Output Lakers as winners if Lakers player inputs 3 in a row horizontally, vertically or diagonally// 
    if (((self.cells[0].isLakers == true) && (self.cells[1].isLakers == true) && (self.cells[2].isLakers == true)) ||
        ((self.cells[3].isLakers == true) && (self.cells[4].isLakers == true) && (self.cells[5].isLakers == true)) ||
        ((self.cells[6].isLakers == true) && (self.cells[7].isLakers == true) && (self.cells[8].isLakers == true)) ||
        ((self.cells[0].isLakers == true) && (self.cells[3].isLakers == true) && (self.cells[6].isLakers == true)) ||
        ((self.cells[1].isLakers == true) && (self.cells[4].isLakers == true) && (self.cells[7].isLakers == true)) ||
        ((self.cells[2].isLakers == true) && (self.cells[5].isLakers == true) && (self.cells[8].isLakers == true)) ||
        ((self.cells[0].isLakers == true) && (self.cells[4].isLakers == true) && (self.cells[8].isLakers == true)) ||
        ((self.cells[6].isLakers == true) && (self.cells[4].isLakers == true) && (self.cells[2].isLakers == true))) {
        self.lakersRingCount++;
        console.log(self.lakersRingCount)
        boardReset($index);
        updateScoreboard($index);
    }
    // Output Celtics as winners if Celtics player inputs 3 in a row horizontally, vertically or diagonally//
    if (((self.cells[0].isCeltics == true) && (self.cells[1].isCeltics == true) && (self.cells[2].isCeltics == true)) ||
        ((self.cells[3].isCeltics == true) && (self.cells[4].isCeltics == true) && (self.cells[5].isCeltics == true)) ||
        ((self.cells[6].isCeltics == true) && (self.cells[7].isCeltics == true) && (self.cells[8].isCeltics == true)) ||
        ((self.cells[0].isCeltics == true) && (self.cells[3].isCeltics == true) && (self.cells[6].isCeltics == true)) ||
        ((self.cells[1].isCeltics == true) && (self.cells[4].isCeltics == true) && (self.cells[7].isCeltics == true)) ||
        ((self.cells[2].isCeltics == true) && (self.cells[5].isCeltics == true) && (self.cells[8].isCeltics == true)) ||
        ((self.cells[0].isCeltics == true) && (self.cells[4].isCeltics == true) && (self.cells[8].isCeltics == true)) ||
        ((self.cells[6].isCeltics == true) && (self.cells[4].isCeltics == true) && (self.cells[2].isCeltics == true))) {
        self.celticsRingCount++;
        console.log(self.celticsRingCount)
        boardReset($index);
        updateScoreboard($index);

    } else {
        catsGame ($index);
    }
        // countScore();
        // boardReset();
    }
    function catsGame ($index) {
        if (self.turn == 9) {
            alert("Draw!");
            boardReset($index);
        }
    }

    function updateScoreboard($index) {
        if (self.lakersRingCount > 0) {
            self.lakersRings[self.lakersRingCount-1].lakersRing = true;
        }
        if (self.lakersRingCount == 5) {
            alert("Lakers are NBA Champions!")
            location.reload();
        }
        if (self.celticsRingCount > 0) {
            self.celticsRings[self.celticsRingCount-1].celticsRing = true;
        }
        if (self.celticsRingCount == 5) {
            alert("Celtics are NBA Champions!")
            location.reload();
        }
    }
    function boardReset($index) {
    for ($index = 0; $index < self.cells.length; $index++) {
        self.cells[$index].isLakers = false;
        self.cells[$index].isCeltics = false;
        self.turn=0;
        }
    }

}