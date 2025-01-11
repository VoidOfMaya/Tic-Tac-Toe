console.log("im working");

//main gameboard
const Gameboard = (function(){
    
// co-responding index:=[1,2,3,4,5,6,7,8,9] this is index on a 3x3 grid starting from 1
    let gameboardArr =  ["","","","","","","","",""];

    //creating players
    const playerOne = Player(gameboardArr);
    playerOne.Setmarker('x');

    const playerTwo = Player(gameboardArr);
    playerTwo.Setmarker('o');

    
    console.log(`Player one: ${playerOne.GetMarker()},\nplayer two: ${playerTwo.GetMarker()}`)

    playerOne.OccupiePosition(1);
    console.log(gameboardArr);

    playerTwo.OccupiePosition(2);
    console.log(gameboardArr);

    playerOne.OccupiePosition(0);
    console.log(gameboardArr);

    playerTwo.OccupiePosition(7);
    console.log(gameboardArr);

    playerOne.OccupiePosition(7);
    console.log(gameboardArr);

    //GameFlow(playerOne,playerTwo);
    let govenor = GameFlow(gameboardArr, playerOne, playerTwo);
    
}());
function GameFlow(gameArray, playerX, playerOne)
{
    return{
        gameArray: gameArray,
        Checkwinner() {
// corisponding index:= [1,2,3,4,5,6,7,8,9] this is index on a 3x3 grid starting from 1          
    const winningArr = [[1,1,1,0,0,0,0,0,0], //1
                        [0,0,0,1,1,1,0,0,0], //2
                        [0,0,0,0,0,0,1,1,1], //3
                        [1,0,0,1,0,0,1,0,0], //4
                        [0,1,0,0,1,0,0,1,0], //5
                        [0,0,1,0,0,1,0,0,1], //6
                        [1,0,0,0,1,0,0,0,1], //7
                        [0,0,1,0,1,0,1,0,0]];//8 possible winn positions           
    //function for comparing the array with each winning position:
    for(let i = 0; i < winningArr.length; i++){
        //console.log(`winning position ${winningArr[i]}`);
        let currentWinArr = winningArr[i].toString();
        console.log(`sulotion:  ${currentWinArr} \ngameboard: ${gameArray}`)

        if(currentWinArr === gameArray.toString()){
            console.log(`we have a winner at position ${i} `);
        }
        else{
            console.log(`no win here`);
        }

    }

        },
        IsATie (){
        }
        //turn taking function:
        //is occupied:
    }
    //return{Checkwinner, IsATie,}; 
                        //PlayerTurn, 
                        //IsOccupied};
}
//factory function for player creation takes gameboard array so it can interact with it
function Player(gameboardArray){
    let marker = 'none';
    let innerArray =["","","","","","","","",""]
    return{
        //get set methods for marker
        Setmarker(markerChoice){
        marker = markerChoice;
        },
        GetMarker(){
        return marker;
        },
        //set for internal array =>this keeps track of game progress
        GetInnerArray(){
            return innerArray},

        // takes a players position index and inputs marker to the coresponding position on the gameboard array
        OccupiePosition(positionChoice){
            /*for(let i = 0; i < innerArray.length; i++){
                if(innerArray[i] !== 0 || enemyPositions !== 0){
                    gameboardArray.splice(positionChoice, 1, marker);
                }
                else{
                    console.log("Action youre trying to make is not possible, This position is already occupied!")
                }
            }*/

            if (gameboardArray[positionChoice] != "x" || gameboardArray[positionChoice] != "o"){
            gameboardArray.splice(positionChoice, 1, marker);
            }
            else{
                console.log("Action youre trying to make is not possible, This position is already occupied!")
            }
        }
    }
}

    //return{ Setmarker, 
    //        DisplayMarker, 
    // OccupiePosition,}


//console.log(Gameboard);
//Checkwinner(gameboardArr);
