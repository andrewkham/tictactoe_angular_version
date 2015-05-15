var cells = document.getElementsByClassName("cell");
var turn = 0;
var Lakers = '<img src="images/lakers_logo_mini.png">';
var Celtics = '<img src="images/celtics_logo_mini.gif">';
var Winner = "";
var rings = document.getElementsByClassName("ring");
var lakersRings = 0;
var celticsRings = 0;
var lakersRing = '<img src="images/lakers_ring_mini.jpeg" style = "margin-bottom: 23px">';
var celticsRing = '<img src="images/celtics_ring_mini.jpeg" style = "margin-bottom: 18px">';

function takeTurns() {
    turn++;
    if ((turn + 2) % 2 === 0) {
        return Lakers;
    } else return Celtics;
}

chooseBox();

function chooseBox() {
    for (var i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', function() {
            if (this.innerHTML !== "") {
                alert("Box taken!");
            } else this.innerHTML = takeTurns();
            getWinner();
        })
    }
}

function getWinner() {
    // Lakers // 
    if (((cells[0].innerHTML == Lakers) && (cells[1].innerHTML == Lakers) && (cells[2].innerHTML == Lakers)) ||
        ((cells[3].innerHTML == Lakers) && (cells[4].innerHTML == Lakers) && (cells[5].innerHTML == Lakers)) ||
        ((cells[6].innerHTML == Lakers) && (cells[7].innerHTML == Lakers) && (cells[8].innerHTML == Lakers)) ||
        ((cells[0].innerHTML == Lakers) && (cells[3].innerHTML == Lakers) && (cells[6].innerHTML == Lakers)) ||
        ((cells[1].innerHTML == Lakers) && (cells[4].innerHTML == Lakers) && (cells[7].innerHTML == Lakers)) ||
        ((cells[2].innerHTML == Lakers) && (cells[5].innerHTML == Lakers) && (cells[8].innerHTML == Lakers)) ||
        ((cells[0].innerHTML == Lakers) && (cells[4].innerHTML == Lakers) && (cells[8].innerHTML == Lakers)) ||
        ((cells[6].innerHTML == Lakers) && (cells[4].innerHTML == Lakers) && (cells[2].innerHTML == Lakers))) {
        Winner = Lakers;
        countScore();
        updateScoreboard();
        boardReset();
    }
    // Celtics //
    if (((cells[0].innerHTML == Celtics) && (cells[1].innerHTML == Celtics) && (cells[2].innerHTML == Celtics)) ||
        ((cells[3].innerHTML == Celtics) && (cells[4].innerHTML == Celtics) && (cells[5].innerHTML == Celtics)) ||
        ((cells[6].innerHTML == Celtics) && (cells[7].innerHTML == Celtics) && (cells[8].innerHTML == Celtics)) ||
        ((cells[0].innerHTML == Celtics) && (cells[3].innerHTML == Celtics) && (cells[6].innerHTML == Celtics)) ||
        ((cells[1].innerHTML == Celtics) && (cells[4].innerHTML == Celtics) && (cells[7].innerHTML == Celtics)) ||
        ((cells[2].innerHTML == Celtics) && (cells[5].innerHTML == Celtics) && (cells[8].innerHTML == Celtics)) ||
        ((cells[0].innerHTML == Celtics) && (cells[4].innerHTML == Celtics) && (cells[8].innerHTML == Celtics)) ||
        ((cells[6].innerHTML == Celtics) && (cells[4].innerHTML == Celtics) && (cells[2].innerHTML == Celtics))) {
        Winner = Celtics;
        countScore();
        updateScoreboard();
        boardReset();
    }
    // Cat's Game // 
    if (((cells[0].innerHTML !== "") && (cells[1].innerHTML !== "") && (cells[2].innerHTML !== "")) &&
        ((cells[3].innerHTML !== "") && (cells[4].innerHTML !== "") && (cells[5].innerHTML !== "")) &&
        ((cells[6].innerHTML !== "") && (cells[7].innerHTML !== "") && (cells[8].innerHTML !== ""))) {
        alert("DRAW!")
        countScore();
        boardReset();
    }
}

function boardReset() {
    for (i = 0; i <= cells.length; i++) {
        cells[i].innerHTML = "";
    }
}

function countScore() {
    if (Winner == Lakers) {
        lakersRings++;
    }
    if (Winner == Celtics) {
        celticsRings++;
    }
}

function updateScoreboard() {
    if (lakersRings == 1) {
        rings[0].innerHTML = lakersRing;
    }
    if (lakersRings==2) {
        rings[1].innerHTML = lakersRing;
    }
    if (lakersRings==3) {
        rings[2].innerHTML = lakersRing;
    }
    if (lakersRings==4) {
        rings[3].innerHTML = lakersRing;
    }
    if (lakersRings==5) {
        rings[4].innerHTML = lakersRing;
        alert("Lakers are NBA Champions!")
        location.reload();
    }
    if (celticsRings==1) {
        rings[5].innerHTML = celticsRing;
    }
    if (celticsRings==2) {
        rings[6].innerHTML = celticsRing;
    }
    if (celticsRings==3) {
        rings[7].innerHTML = celticsRing;
    }
    if (celticsRings==4) {
        rings[8].innerHTML = celticsRing;
    }
    if (celticsRings==5) {
        rings[9].innerHTML = celticsRing;
        alert("Celtics are NBA Champions!")
        location.reload();
    }
}

