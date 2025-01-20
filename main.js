console.log("im working");
//main gameboard
const Gameboard = (function () {

    //populates gameboard array with relevant dom object
    let gameboardArr = ["", "", "", "", "", "", "", "", ""];
    //player turn boverner 
    let turnStatus = 0;
    //gameboardArr.push(document.getElementById(`${i}`));
    let elementArray = gameboardArr.map((id, index) => document.getElementById(index));
    //creates players
    const playerOne = Player(gameboardArr);
    const playerTwo = Player(gameboardArr);

    //mapping dom objects to variables for the dialog modal window:-
    const dialog = document.getElementById("modal");
    const selectXPlayerBtn = document.getElementById("x_button");
    const selectOPlayerBtn = document.getElementById("o_button");

    //displays player marker  on chosen segmant in gameboard
    function Display(id, playerMarker) {
        id.innerText = playerMarker;
    }

    return {
        gameboardArr,
        playerOne,
        playerTwo,
        //displays player marker  on chosen segmant in gameboard
        Display(id, playerMarker) {
            id.innerText = playerMarker;
        },
        //returns relevant dom object from gamebaord based on players click
        Position(playermarker) {
            const element = elementArray;
            for (let i = 0; i < 9; i++) {
                element[i].addEventListener('click', () => {
                    //console.log(i);
                    Display(element[i], playermarker.toString());
                })

            }
        },
        //triggers the player markes selection dialog modal
        PlayerMarkerSelect() {
            dialog.showModal();
            selectXPlayerBtn.addEventListener('click', () => {

                playerOne.Setmarker('x');
                playerTwo.Setmarker('o');
                dialog.close();
                dialog.style.display = 'none';             
            })
            selectOPlayerBtn.addEventListener('click', () => {

                playerOne.Setmarker('o');
                playerTwo.Setmarker('x');
                dialog.close();
                dialog.style.display = 'none';
            })
        }
    }
    /*
           let xgovenor = GameFlow(playerOne);
           let ogovenor = GameFlow(playerTwo);
           let playerTurn = playerOne.GetMarker();
      
          for(let i= 0; i < 9; i++){
               console.log(i);
               let win = 0;
               if(playerTurn == 'x'){
                   let XTurn = playerOne.OccupiePosition(choice());
                   if( XTurn != 0){
                       win = xgovenor.Checkwinner();
                       console.log(gameboardArr);
                       playerTurn ='o';
                       if ( win == 1){
                           break;
                       }
                   }
                   else{
                       i--
                       playerTurn = 'x';
                   }
               }
            }*/
}());
const GameLogic = (function () {
    return {
        //makes it so each player can take turn playing the game 
        GameFlow(playerOne, playerTwo,playerTurn) {

            const gameboardBtns = document.querySelectorAll('.inner-gameboard');
            Array.from(gameboardBtns).map((btn, index) => {
                if(playerTurn === 0){
                    btn.addEventListener('click', ()=>{
                        playerOne.OccupiePosition(index);
                        playerOne.Checkwinner();
                        console.log(playerOne.GetArray() + playerOne.GetMarker());
                        return 1;
                    })
                }
                if(playerTurn === 1){
                    btn.addEventListener('click', ()=>{
                        playerTwo.OccupiePosition(index);
                        playerTwo.Checkwinner();
                        console.log(playerTwo.GetArray() + playerTwo.GetMarker());
                        return 0;
                    })
                }

            })
        },
    }
}());
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
                Gameboard.Position(marker);                
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
const Game = function (gameboard, govener, playerX, playerO) {
    let turnStatus = 0;
    gameboard.PlayerMarkerSelect();
    govener.GameFlow(playerX,playerO, turnStatus);
    
}
Game(Gameboard, GameLogic,Gameboard.playerOne, Gameboard.playerTwo);
