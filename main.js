console.log("im working");

//main gameboard
const Gameboard = (function(){
    
// corisponding index:= [1,2,3,4,5,6,7,8,9] this is index on a 3x3 grid starting from 1
    let gameboardArr =  [0,0,1,0,0,1,0,0,1];

    return { gameboardArr,};
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

console.log(Gameboard);
Checkwinner(Gameboard.gameboardArr);