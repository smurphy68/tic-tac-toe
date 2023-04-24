board = document.getElementById("board");

let player1 = true;
let player2 = false;

let player = document.getElementById("player-turn");

let currentState = [
    ["", "", ""], // row 1
    ["", "", ""], // row 2
    ["", "", ""] // row 3
];

const getColumns = () => {
    let col1 = currentState.map((row) => { return row[0] });
    let col2 = currentState.map((row) => { return row[1] });
    let col3 = currentState.map((row) => { return row[2] });
    return [col1, col2, col3];
};

const getDiagonals = () => {
    let diag1 = [currentState[0][0], currentState[1][1], currentState[2][2]]
    let diag2 = [currentState[0][2], currentState[1][1], currentState[2][0]]
    return [diag1, diag2]
}

const checkWinCon = () => {
    let winCon = false

// checking for win con in rows
    currentState.forEach((row) => {
        if (row.toString() === "x,x,x" || row.toString() === "o,o,o") {
            console.log("row")
            winCon = row;
        };
    });

// checking for win cons in columns
    getColumns(currentState).forEach((column) => {
        if (column.toString() === "x,x,x" || column.toString() === "o,o,o") {
            winCon = column;
        };
    });

// checking for win cons in the diagonals
    getDiagonals().forEach((diagonal) => {
        if (diagonal.toString() === "x,x,x" || diagonal.toString() === "o,o,o") {
            winCon = diagonal;
        };
    });

// check if all elements of the board is full and the game is a draw (i.e no other win cons)
    let truthyCheck = Array.from(board.children).map((e) => {
        if (e.innerHTML === "x" || e.innerHTML === "o") {
            return true;
        };
        return false;
    });

// draw condition
    if (winCon === false && truthyCheck.every(e => e === true)) {
        player.innerHTML = "It's a draw! Click the button below to reset!"
    };
    return winCon;
};

const toggleTurn = () => {
    if (player1 === true) {
        player2 = true;
        player1 = false;
        player.innerHTML = "Player 2, it's your turn!"
        return;
    };
    if (player2 === true) {
        player1 = true;
        player2 = false;
        player.innerHTML = "Player 1, it's your turn!"
        return;
    };
};

const updateBoard = () => {
    let array = Array.from(board.children);
    currentState[0] = [array[0].innerHTML, array[1].innerHTML, array[2].innerHTML];
    currentState[1] = [array[3].innerHTML, array[4].innerHTML, array[5].innerHTML];
    currentState[2] = [array[6].innerHTML, array[7].innerHTML, array[8].innerHTML];
};

const makeMove = (e) => {
    toggleTurn();
    e.target.removeEventListener("click", makeMove);
    if (player1 === true) {
        e.target.innerHTML = "x";
    } else if (player2 === true) {
        e.target.innerHTML = "o";
    };
    updateBoard()
    let winCon = checkWinCon()
    if (winCon) {
        Array.from(board.children).forEach((e) => {
            e.removeEventListener("click", makeMove);
        })
        if (winCon.toString() === "x,x,x") {
            player.innerHTML = "Player 2, you win!"
        };
        if (winCon.toString() === "o,o,o") {
            player.innerHTML = "Player 1, you win!"
        };
    };
};

const refresh = () => {
    Array.from(board.children).forEach((e) => {
        e.innerHTML = "";
        e.addEventListener("click", makeMove)
        player.innerHTML = "Player 1, it's your turn!"
    })
}

for (let i = 0; i < 9; i++) {
    tempElement = document.createElement("div");
    tempElement.setAttribute("id", i);
    tempElement.setAttribute("class", "grid-square");
    tempElement.addEventListener("click", makeMove);
    board.append(tempElement);
};