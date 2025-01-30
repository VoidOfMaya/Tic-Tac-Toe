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
    const oWin =document.getElementById('oWins');
    const xWin =document.getElementById('xWins');

    console.log(xWin)
    console.log(oWin)

    return {
        board,
        playerOne,
        playerTwo,
        xCounter,
        oCounter,
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
                gameFlow.turnManager(playerOne);
            })
            selectOPlayerBtn.addEventListener('click', () => {

                playerOne.Setmarker('o');
                playerTwo.Setmarker('x');
                dialog.close();
                dialog.style.display = 'none';
                console.log(`marker has been set to: ${playerOne.GetMarker()}`);      
                gameFlow.turnManager(playerOne);
            })
            
        },
        //populates the display gameboard array and displays it
        populate(index, playerMark){
            if(elementArray[index].textContent ===""){
                elementArray[index].textContent = playerMark;
                board[index] =playerMark;
                console.log(elementArray[index].textContent);
            }

            else{
                console.log('this position is already occupied');
            }
        },
    //takes.player.marker and updates winner view window
        displayWins(winningMarker){
            if(winningMarker === 'x'){
                xCounter += 1;
                xWin.innerHTML = xCounter;
            }
            if(winningMarker === 'o'){
                oCounter += 1;
                oWin.innerHTML = oCounter;
            }
        },
        getXScore(){
            return xCounter
        },
        getOScore(){
            return oCounter
        },
        clearGame(){
            board.fill("");
            elementArray = board.map((id, index) => document.getElementById(index));
            elementArray.forEach(element =>{
                element.textContent = "";     
            })
            

            playerOne.clearPlayer();
            playerTwo.clearPlayer();

            console.log(`GAME OVER/RESET`)
            //console.log(`display array:${elementArray[0]}\nboard array: ${board}\nplayer pne array: ${playerOne.GetArray()}\nplayer two array: ${playerTwo.GetArray()}`)
            
            //GameFlow.turnManager(Gameboard.playerOne);        
        }       
    }
}());
const GameFlow = (function (){

    let currentPlayer;
    let hasWin = false;

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

        //converts array to a readable format
        let boardArray = readArray(player.GetArray());
        //function for comparing the array with each winning position:
        let matchesFound = 0;           
        for(let i = 0; i < winningArr.length; i++){
            matchesFound = 0;
              
            for(let z = 0; z < winningArr[i].length; z++){

                if(winningArr[i][z] === 1 && boardArray[z] === 1){
                    matchesFound +=1 ;   
                } 
            } 
            if(matchesFound === 3){
                hasWin = true;
                return hasWin;  
            }
            console.log(`no matches where found ,next combo`) 
            //console.log(`${currentPlayer.GetMarker()}PLAYER =>match found count: ${matchesFound}`);  
        }
        
    }
    function startNextRound(){
        Gameboard.clearGame();
        currentPlayer =Gameboard.playerOne;
        turnManager(currentPlayer);

    }
    function turnManager(startingPlayer){
        currentPlayer = startingPlayer;
        const buttonPress =document.querySelectorAll(".inner-gameboard")

            

        buttonPress.forEach((btn, index) =>{   
            btn.removeEventListener('click', clickHandler());           
            btn.addEventListener('click', ()=>{clickHandler(index)})    
            
        });
    function clickHandler(index){
            if( Gameboard.board[index] === '' ){
                currentPlayer.OccupiePosition(index);
                Gameboard.populate(index, currentPlayer.GetMarker())

                console.log(Gameboard.board);
                if(Checkwinner(currentPlayer)){
                    console.log(`${currentPlayer.GetMarker()} wins`)
                    Gameboard.displayWins(currentPlayer.GetMarker());
                    
                    if(currentPlayer.GetMarker() === 'x'){
                        Gameboard.xCounter++

                    }else{
                        Gameboard.oCounter++
                    }
                    Gameboard.clearGame();
                    console.log(`Board after clear: ${Gameboard.board}`);
                    console.log(`Player X's score: ${Gameboard.xCounter}, Player O's score: ${Gameboard.oCounter}`);
                    startNextRound()

                }else {    
                    currentPlayer = currentPlayer === Gameboard.playerOne? Gameboard.playerTwo : Gameboard.playerOne; 
                }                        
            } else{
                console.log('this position is already occupied!')
            } 
        }                  
    } 
    return{
        //manages each turn between each player object.
        turnManager,
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
        GetArray(){
            return innerArray;
        },
        // takes a players position index and inputs marker to the coresponding position on the gameboard array
        OccupiePosition(positionChoice) {

            //console.log(`first gameboard array: ${gameboardArray}`)

            /*if (gameboardArray[positionChoice] == "x" && gameboardArray[positionChoice] == "o") {
                console.log(`you are trying to occupie position: ${positionChoice}\n in gameboard array: ${gameboardArray}`);
                console.log("Action youre trying to make is not possible, This position is already occupied!")

            }*/
            if (gameboardArray[positionChoice] == "") {
                //gameboardArray.splice(positionChoice, 1, marker);
                //innerArray.splice(positionChoice, 1, marker);
                gameboardArray[positionChoice] = marker;
                innerArray[positionChoice]= marker;                
            }
        },
<<<<<<< HEAD
        clearPlayer(){
            innerArray.fill("");
        },

=======
        Checkwinner() {
                               //0, 1, 2, 3, 4, 5, 6, 7, 8
            const winningArr = [[1, 1, 1, 0, 0, 0, 0, 0, 0], //1
                                [0, 0, 0, 1, 1, 1, 0, 0, 0], //2
                                [0, 0, 0, 0, 0, 0, 1, 1, 1], //3
                                [1, 0, 0, 1, 0, 0, 1, 0, 0], //4
                                [0, 1, 0, 0, 1, 0, 0, 1, 0], //5
                                [0, 0, 1, 0, 0, 1, 0, 0, 1], //6
                                [1, 0, 0, 0, 1, 0, 0, 0, 1], //7
                                [0, 0, 1, 0, 1, 0, 1, 0, 0]];//8 possible winn positions 
            
            //converts array to a readable format
            let boardArray = readArray(innerArray);
            //function for comparing the array with each winning position:
            let matchesFound = 0; 
            let winnerStatus = false;
            //making i adressable outside of the forloop          
            for(let i = 0; i < winningArr.length; i++){
                for(let z = 0; z < winningArr[i].length; z++){
                    if(winningArr[i][z] === 1 && boardArray[z] === 1){
                        matchesFound = matchesFound + 1 ;
                    }
                    else{
                        continue;
                    }   
                }
                //checks if there is a win
                if(matchesFound === 3){
                    console.log(`we have a winner`)
                    winnerStatus = true;
                    break;
                }
                else{
                    console.log(`no matches where found ,next combo`)
                    matchesFound = 0 ;
                }

            }
        }
>>>>>>> e8922cada24259a5c1922328dd1575c1d1883b9a
    }
}
//GAME START
const Game = function (gameBoard,gameFlow) {
    gameBoard.PlayerMarkerSelect(gameFlow);
}
Game(Gameboard, GameFlow);
