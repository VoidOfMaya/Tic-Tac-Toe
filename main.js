console.log("im working");
//main gameboard
const Gameboard = (function () {

    let board = ["", "", "", "", "", "", "", "", ""];

    //links gameboard array with relevant dom 
    let elementArray = board.map((id, index) => document.getElementById(index));

    //creates players
    const playerOne = Player(board);
    const playerTwo = Player(board);

    //winner counter
    let xCounter = 0;
    let oCounter = 0;

    //dom element creation to display game wins to the side bars
    const oWin = document.getElementById('oWins');
    const xWin = document.getElementById('xWins');

    console.log(xWin)
    console.log(oWin)

    return {
        board,
        playerOne,
        playerTwo,
        //triggers the player markes selection dialog modal
        PlayerMarkerSelect(gameFlow) {
            //mapping dom objects to variables for the dialog modal window:-
            const dialog = document.getElementById("modal");
            const selectXPlayerBtn = document.getElementById("x_button");
            const selectOPlayerBtn = document.getElementById("o_button");


            dialog.showModal();
            selectXPlayerBtn.addEventListener('click', () => {

                playerOne.Setmarker('x');
                playerTwo.Setmarker('o');
                dialog.close();
                dialog.style.display = 'none';
                console.log(`marker has been set to: ${playerOne.GetMarker()}`);
                gameFlow.eventHandler(playerOne);
            })
            selectOPlayerBtn.addEventListener('click', () => {

                playerOne.Setmarker('o');
                playerTwo.Setmarker('x');
                dialog.close();
                dialog.style.display = 'none';
                console.log(`marker has been set to: ${playerOne.GetMarker()}`);
                gameFlow.eventHandler(playerOne);
            })

        },
        //populates the display gameboard array and displays it
        populate(index, playerMark) {
            if (elementArray[index].textContent === "") {
                elementArray[index].textContent = playerMark;
                board[index] = playerMark;
            }

            else {
                console.log('this position is already occupied');
            }
        },
        //takes.player.marker and updates winner view window
        displayWins(winningMarker) {
            if (winningMarker === 'x') {
                xCounter += 1;
                xWin.innerHTML = xCounter;
            }
            if (winningMarker === 'o') {
                oCounter += 1;
                oWin.innerHTML = oCounter;
            }
        },
        //resets gameboard and player elements within gameboard
        clearGame() {
            board.fill("");
            elementArray = board.map((id, index) => document.getElementById(index));
            elementArray.forEach(element => {
                element.textContent = "";
            })
            playerOne.clearPlayer();
            playerTwo.clearPlayer();
            console.log(`GAME OVER/RESET`)
            
        }
    }
}());
const GameFlow = (function () {

    let currentPlayer;
    let movesCounted = 0;

    //converts each array from blank space to a 0 and player marker to a 1 at index
    const readArray = (array) => {
        array.map((position, index) => {
            if (position === "") {
                array.splice(index, 1, 0)
            }
            if (position === "x" || position === "o") {
                array.splice(index, 1, 1);
            }
        })
        return array;
    }
    //compares the players array with an array of winning arrays returning back true if a win is detected
    function Checkwinner(player) {
        //0, 1, 2, 3, 4, 5, 6, 7, 8         
        const winningArr = [[1, 1, 1, 0, 0, 0, 0, 0, 0], //1
        [0, 0, 0, 1, 1, 1, 0, 0, 0], //2
        [0, 0, 0, 0, 0, 0, 1, 1, 1], //3
        [1, 0, 0, 1, 0, 0, 1, 0, 0], //4
        [0, 1, 0, 0, 1, 0, 0, 1, 0], //5
        [0, 0, 1, 0, 0, 1, 0, 0, 1], //6
        [1, 0, 0, 0, 1, 0, 0, 0, 1], //7
        [0, 0, 1, 0, 1, 0, 1, 0, 0]];//8 possible winn positions 

        let boardArray = readArray(player.GetArray());

        //function for comparing the array with each winning position:
        let matchesFound = 0;
        for (let i = 0; i < winningArr.length; i++) {
            matchesFound = 0;

            for (let z = 0; z < winningArr[i].length; z++) {

                if (winningArr[i][z] === 1 && boardArray[z] === 1) {
                    matchesFound += 1;
                }
            }
            if (matchesFound === 3) {
                return true;
            }
            console.log(`no win detected!`)
        }

    }
    //resets the gameboard  and calls eventHandler function to start new round
    function startNextRound() {
        Gameboard.clearGame();
        currentPlayer = Gameboard.playerOne;
        console.log(`NEW ROUND STARTS!`);
        eventHandler(currentPlayer);

    }
    //asignes  eventlisteners to the board array and invoking  game functionality on click
    function eventHandler(startingPlayer) {
          
        currentPlayer = startingPlayer;
        const buttonPress = document.querySelectorAll('.inner-gameboard');

        buttonPress.forEach((btn, index)=>{
            if (!btn.hasAttribute('data-listener')) {
                btn.addEventListener('click', () => gameLogic(index));
                btn.setAttribute('data-listener', 'true'); // Flag to indicate listener is attached
            }
        })

    }
    //handles game logic managing turns/populating displays/checking for wins&ties/ invoking a newgame
    function gameLogic(index) {
        movesCounted += 1;
        console.log(`moves made ${movesCounted}/9`)
        console.log(`clicked cell id: ${index}, player: ${currentPlayer.GetMarker()}`);

        if (Gameboard.board[index] === '') {

            currentPlayer.OccupiePosition(index);
            Gameboard.populate(index, currentPlayer.GetMarker());

            if(movesCounted !== 9){
                if (Checkwinner(currentPlayer)) {

                    console.log(`${currentPlayer.GetMarker()} wins`)
                    Gameboard.displayWins(currentPlayer.GetMarker());
                    movesCounted = 0;
                    startNextRound()
                    console.log(`Board after clear: ${Gameboard.board}`);
                    
                } else {

                    currentPlayer = currentPlayer === Gameboard.playerOne ? Gameboard.playerTwo : Gameboard.playerOne;
                }  
            }else if(movesCounted === 9){

                movesCounted = 0;
                console.log(`no winner this round! this is a tie `);
                startNextRound();
                console.log(`Board after clear: ${Gameboard.board}`);
                console.log(`Player X's score: ${Gameboard.xCounter}, Player O's score: ${Gameboard.oCounter}`);

            }
            
        } else {
            console.log('this position is already occupied!')
        }
    }
    return {
        eventHandler,
    };
})();
//factory function for player creation takes gameboard array so it can interact with it
function Player(gameboardArray) {
    let marker = 'none';
    let innerArray = ["", "", "", "", "", "", "", "", ""];
    return {
        //makes player marker changable outside of scope
        Setmarker(markerChoice) {
            marker = markerChoice;
        },
        //makes player marker readably outside of scope
        GetMarker() {
            return marker;
        },
        //makes player array readable outside of scope
        GetArray() {
            return innerArray;
        },
        // takes a players position index and inputs marker to the coresponding position on the gameboard array
        OccupiePosition(positionChoice) {
            if (gameboardArray[positionChoice] == "") {

                gameboardArray[positionChoice] = marker;
                innerArray[positionChoice] = marker;
            }
        },
        //clears innerArray
        clearPlayer() {
            innerArray.fill("");
        },

    }
}
//GAME START
const Game = function (gameBoard, gameFlow) {
    gameBoard.PlayerMarkerSelect(gameFlow);
}
Game(Gameboard, GameFlow);
