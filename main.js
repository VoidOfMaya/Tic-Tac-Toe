console.log("im working");
//main gameboard
const Gameboard = (function () {
    
    //populates gameboard array with relevant dom object
    let gameboardArr = ["","","","","","","","",""];
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
    function Display(id, playerMarker){
        id.innerText = playerMarker;
    }
    return{
        playerOne,
        playerTwo,
        
        //returns relevant dom object from gamebaord based on players click
        Position(playermarker){
            const element =elementArray;
            for(let i = 0; i < 9; i++){
                element[i].addEventListener('click', () => {
                    //console.log(i);
                    Display(element[i],playermarker.toString());
                })
                 
            }
        },
        //triggers the player markes selection dialog modal
        PlayerMarkerSelect(){
            dialog.showModal();
            selectXPlayerBtn.addEventListener('click', () => {
            
                playerOne.Setmarker('x');
                playerTwo.Setmarker('o');
                console.log(`marker has been choosen: ${playerOne.GetMarker()}`);
                dialog.close();
                dialog.style.display = 'none';
                return playerOne.GetMarker();
            
            })
            selectOPlayerBtn.addEventListener('click', () => {
            
                playerOne.Setmarker('o');
                playerTwo.Setmarker('x');
                console.log(`marker has been choosen: ${playerOne.GetMarker()}`);
                dialog.close();
                dialog.style.display = 'none';
                return playerOne.GetMarker();
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
const GameLogic = (function() {
    return {

        //converts player array to a readable form
        ReadArr(array) {
            let playerArr = array.GetInnerArray();
            for (let i = 0; i < playerArr.length; i++) {
                if (playerArr[i] == "") {
                    playerArr.splice(i, 1, 0);
                }
                if (playerArr[i] == 'x' || playerArr[i] == 'o') {
                    playerArr.splice(i, 1, 1);
                }
            }
            return playerArr
        },
        Checkwinner(player) {

            const playerArr = this.ReadArr(player);
            const winningArr = [[1, 1, 1, 0, 0, 0, 0, 0, 0], //1
                                [0, 0, 0, 1, 1, 1, 0, 0, 0], //2
                                [0, 0, 0, 0, 0, 0, 1, 1, 1], //3
                                [1, 0, 0, 1, 0, 0, 1, 0, 0], //4
                                [0, 1, 0, 0, 1, 0, 0, 1, 0], //5
                                [0, 0, 1, 0, 0, 1, 0, 0, 1], //6
                                [1, 0, 0, 0, 1, 0, 0, 0, 1], //7
                                [0, 0, 1, 0, 1, 0, 1, 0, 0]];//8 possible winn positions 

            //function for comparing the array with each winning position:
            for (let i = 0; i < winningArr.length; i++) {
                //console.log(`winning position ${winningArr[i]}`);
                var currentWinArr = winningArr[i].toString();
                if (currentWinArr === playerArr.toString()) {
                    console.log(`we have a winner at position ${i} `);
                    return 1;
                }
                else {
                    console.log(`no winner here`);
                }

            }
            console.log(`gameboard: ${playerArr}`)
        },
        GameFlow (playerOne, playerTwo){
            playerTurn = 0;
            for(let i = 0; i < 9; i++){
                if(playerTurn = 0){
                    playerOne.OccupiePosition(Gameboard.Position(playerOne));
                    this.Checkwinner(playerOne);
                    playerTurn = 1;
                }
                if(playerTurn = 1){
                    playerTwo.OccupiePosition(Gameboard.Position(playerTwo));
                    this.Checkwinner(playerTwo);
                    playerTurn = 0;                    
                }
            }
        },

    }

}());
//factory function for player creation takes gameboard array so it can interact with it
function Player(gameboardArray) {
    let marker = 'none';
    let innerArray = ["", "", "", "", "", "", "", "", ""]
    return {
        //get set methods for marker
        Setmarker(markerChoice) {
            marker = markerChoice;
        },
        GetMarker() {
            return marker;
        },
        //set for internal array =>this keeps track of game progress
        GetInnerArray() {
            return innerArray
        },
        // takes a players position index and inputs marker to the coresponding position on the gameboard array
        OccupiePosition(positionChoice) {


            if (gameboardArray[positionChoice] != "x" && gameboardArray[positionChoice] != "o") {
                gameboardArray.splice(positionChoice, 1, marker);
                innerArray.splice(positionChoice, 1, marker);
            }
            else {
                console.log("Action youre trying to make is not possible, This position is already occupied!")
                return 0;
            }
        }
    }
}
//GAME START
const Game = function(playerOne, PlayerTwo){
    playerOne = Gameboard.playerOne;
    playerTwo = Gameboard.playerTwo;
    Gameboard.PlayerMarkerSelect(); 
    GameLogic.GameFlow(playerOne, playerTwo);
}
Game();
