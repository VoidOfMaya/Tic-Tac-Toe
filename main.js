console.log("im working");
//main gameboard
const Gameboard = (function () {
    //populates gameboard array with relevant dom object
    let board = ["", "", "", "", "", "", "", "", ""];
    //player turn boverner 
    //gameboardArr.push(document.getElementById(`${i}`));
    let elementArray = board.map((id, index) => document.getElementById(index));
    //creates players
    const playerOne = Player(board);
    const playerTwo = Player(board);
    //mapping dom objects to variables for the dialog modal window:-
    const dialog = document.getElementById("modal");
    const selectXPlayerBtn = document.getElementById("x_button");
    const selectOPlayerBtn = document.getElementById("o_button");
    return {
        board,
        playerOne,
        playerTwo,
        //triggers the player markes selection dialog modal
        PlayerMarkerSelect() {
            let turn ='';
            dialog.showModal();
            selectXPlayerBtn.addEventListener('click', () => {

                playerOne.Setmarker('x');
                playerTwo.Setmarker('o');
                dialog.close();
                dialog.style.display = 'none';    
                console.log(`marker has been set to: ${playerOne.GetMarker()}`);
                turn = playerOne.GetMarker();      
            })
            selectOPlayerBtn.addEventListener('click', () => {

                playerOne.Setmarker('o');
                playerTwo.Setmarker('x');
                dialog.close();
                dialog.style.display = 'none';
                console.log(`marker has been set to: ${playerTwo.GetMarker()}`);  
                turn = playerTwo.GetMarker();    
            })
            return turn;
        },
        populate(index, playerMark){
            if(elementArray[index].textContent ===""){
                elementArray[index].textContent = playerMark;
            }
        }
    }
}());
function GameFlow (gameboard, playerA, playerB){
let turn = gameboard.PlayerMarkerSelect();
const displayBoard =gameboard.board.map((id, index) => document.getElementById(index));

return{
    startGame(){
        console.log(displayBoard);
        displayBoard.map((cell, index)=> {
            console.log(cell);
            cell.addEventListener('click', ()=>{
                console.log(`addressing button no,: ${index}\ninternal element: ${cell}`)
                gameboard.populate(index, playerA.GetMarker())
                playerA.OccupiePosition(index);
                console.log('current players internal array ' +playerA.GetArray());
                playerA.Checkwinner();
                
            })
        });
    },
}
}
//factory function for player creation takes gameboard array so it can interact with it
function Player(gameboardArray) {
    let marker = 'none';
    let innerArray = ["", "", "", "", "", "", "", "", ""]

    //converts each array from blank space to a 0 and player marker to a 1 at index
    const readArray = (array) =>{
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
        GetArray(){
            return innerArray;
        },
        // takes a players position index and inputs marker to the coresponding position on the gameboard array
        OccupiePosition(positionChoice) {

            //console.log(`first gameboard array: ${gameboardArray}`)

            if (gameboardArray[positionChoice] == "x" && gameboardArray[positionChoice] == "o") {
                console.log(`you are trying to occupie position: ${positionChoice}\n in gameboard array: ${gameboardArray}`);
                console.log("Action youre trying to make is not possible, This position is already occupied!")

            }
            if (gameboardArray[positionChoice] == "") {
                gameboardArray.splice(positionChoice, 1, marker);
                innerArray.splice(positionChoice, 1, marker);                
            }
        },
        Checkwinner() {
            const winningArr = [[1, 1, 1, 0, 0, 0, 0, 0, 0], //1
            [0, 0, 0, 1, 1, 1, 0, 0, 0], //2
            [0, 0, 0, 0, 0, 0, 1, 1, 1], //3
            [1, 0, 0, 1, 0, 0, 1, 0, 0], //4
            [0, 1, 0, 0, 1, 0, 0, 1, 0], //5
            [0, 0, 1, 0, 0, 1, 0, 0, 1], //6
            [1, 0, 0, 0, 1, 0, 0, 0, 1], //7
            [0, 0, 1, 0, 1, 0, 1, 0, 0]];//8 possible winn positions 

            //converts array to a readable format
            let boardArray = readArray(gameboardArray);
            //function for comparing the array with each winning position:
            for(let i = 0; i < winningArr.length; i++){
                if (winningArr[i].toString() === boardArray.toString()) {
                    console.log(`we have a winner `);
                    break;
                }
                else {
                    console.log(`no winner here`);
                }               
            }
            console.log(boardArray);

        }
    }
}
//GAME START
const Game = function (gameflow, board) {
    const newGame = gameflow(board, board.playerOne, board.playerTwo);
    newGame.startGame();

}
Game(GameFlow, Gameboard);
