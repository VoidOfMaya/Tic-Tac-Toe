console.log("im working");

//main gameboard
const Gameboard = (function () {
    
    //instentiates display array and players
    let gameboardArr = ["", "", "", "", "", "", "", "", ""];
    const playerOne = Player(gameboardArr);
    const playerTwo = Player(gameboardArr);


    //mapping gameboard postions with corisponding index

    let innerGameboard =[];
    for(let i = 0; i < 9; i++){
        innerGameboard.push(document.getElementById(`${i}`));
    }
    console.log(innerGameboard);
    for(let i = 0; i < 9; i++){
        innerGameboard[i].addEventListener('click',()=>{
            console.log(`position: ${i}`);
        })
    }
    

    //handles modal and player selection;-
    const dialog = document.getElementById("modal");
    const selectXPlayerBtn = document.getElementById("x_button");
    const selectOPlayerBtn = document.getElementById("o_button");

    dialog.showModal();
    selectXPlayerBtn.addEventListener('click', () => {

        playerOne.Setmarker('x');
        playerTwo.Setmarker('o');
        console.log(`marker has been choosen: ${playerOne.GetMarker()}`);
        dialog.close();
        dialog.style.display = 'none';

    })
    selectOPlayerBtn.addEventListener('click', () => {

        playerOne.Setmarker('o');
        playerTwo.Setmarker('x');
        console.log(`marker has been choosen: ${playerOne.GetMarker()}`);
        dialog.close();
        dialog.style.display = 'none';

    })


    /*
       let xgovenor = GameFlow(playerOne);
       let ogovenor = GameFlow(playerTwo);
       let playerTurn = playerOne.GetMarker();
   
      for(let i= 0; i < 9; i++){
           console.log(i);
           let win = 0;
           if(playerTurn == 'x'){
               let XTurn = playerOne.OccupiePosition();
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
           else if(playerTurn == 'o') {
               let OTurn = playerTwo.OccupiePosition();
               if( OTurn != 0){
                   win = ogovenor.Checkwinner();
                   console.log(gameboardArr);
                   playerTurn ='x';
                   if ( win == 1){
                       break;
                   }                             
               }
               else{
                   i--
                   playerTurn = 'o';
               }
           }
           if(i = 8 && win != 1){
               console.log('no winner here, good luck next time');
           }
       }
   */

}());
function GameFlow(player) {
    return {
        //gameArray: gameArray,
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
        Checkwinner() {

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
                    console.log(`no win here`);
                }

            }
            console.log(`gameboard: ${playerArr}`)
        },
        IsATie() {
        }
        //turn taking function:
    }

}
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

//return{ Setmarker, 
//        DisplayMarker,
// OccupiePosition,}


//console.log(Gameboard);
//Checkwinner(gameboardArr);
