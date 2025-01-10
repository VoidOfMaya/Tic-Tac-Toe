console.log("im working");

//main gameboard
const Gameboard = (function(){
    
// co-responding index:=[1,2,3,4,5,6,7,8,9] this is index on a 3x3 grid starting from 1
    let gameboardArr =  [0,0,1,0,0,1,0,0,1];

    //creating players
    const playerOne = Player(gameboardArr);
    playerOne.Setmarker('x');

    const playerTwo = Player(gameboardArr);
    playerTwo.Setmarker('o');

    //playerTwo.OccupiePosition(4);
    //playerOne.OccupiePosition(3);

    
    console.log(`Player one: ${playerOne.DisplayMarker()},\nplayer two: ${playerTwo.DisplayMarker()}`)

    
    GameFlow(playerOne,playerTwo);
    //Checkwinner(gameboardArr);
}());

function Checkwinner(gameArray){
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

}

function GameFlow(playerX, playerO){

    let gameOver = false;
    let playerTurn = "";
    let turnCount =0;

    if(turnCount == 0){
        console.log('Welcome to Tic-Tac-Toe, to start a new game choos your team\n');
        let myTeam = ChooseTeam();
        switch (true){
            case (myTeam === "x" && gameOver === false):
                console.log("you have entered the X block");
                playerTurn = "x";
                while( gameOver===false || turnCount < 9){
                    if(playerTurn==="x"){
                        playerX.OccupiePosition(prompt('choose a position for X on the bored to occupie'));
                        playerTurn = "o";
                        turnCount + 1                    }
                    if(playerTurn==="o" || turnCount < 9){
                        playerO.OccupiePosition(prompt('choose a position for O on the bored to occupie'));
                        playerTurn = "x";
                        turnCount + 1
                    }
                }
                break;
            case(myTeam ==="o" && gameOver === false):
                playerTurn = "o";
                while( gameOver===false){
                    if(playerTurn==="o"){
                        playerX.OccupiePosition(prompt('choose a position for O on the bored to occupie'));
                        playerTurn = "x";
                    }
                    if(playerTurn==="x"){
                        playerO.OccupiePosition(prompt('choose a position for X on the bored to occupie'));
                        playerTurn = "o";
                    }
            }
                console.log("you have entered the O block");

                break;
            case(gameOver === true):
                console.log("you have entered the end game block, Announce winner");
                breaak;
            default:
                console.log('dead end here bud');
                break;
        }
    }
    function ChooseTeam(){
        return prompt("Choose your player by entering x or o, then press enter").toLocaleLowerCase();
    }


}
//factory function for player creation takes gameboard array so it can interact with it
function Player(gameboardArray){

    let marker = 'none';
    let internalArr = []
    let winCount = 0;

    function Setmarker(markerChoice){
        marker = markerChoice;
    }

    function DisplayMarker(){
        return marker;
    }

    function OccupiePosition(positionChoice){

        if (gameboardArray[positionChoice] !== 'x' || gameboardArray[positionChoice] !== 'o'){
            gameboardArray.splice(positionChoice, 1, marker);
        }
    }


    return{ Setmarker, 
            DisplayMarker, 
            OccupiePosition,}
}

//console.log(Gameboard);
//Checkwinner(gameboardArr);