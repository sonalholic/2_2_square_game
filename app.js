
document.addEventListener('DOMContentLoaded', ()=>{
    const gridDisplay=document.querySelector('.grid');
    const scoreDisplay=document.querySelector('#score');
    const resultDisplay=document.getElementById('result');
    let width=4;
    const squares=[];
    let score=0;

    //creating gameBoard

    function createBoard(){
        for(let i=0;i<width*width;i++){
            square=document.createElement('div');
            square.innerHTML=0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
       
    }

    createBoard();

    //generate a number randomly
    function generate(){
        let j = Math.floor(Math.random()*squares.length);
        if(squares[j].innerHTML==0){
            squares[j].innerHTML=2;
            checkForGameOver();
        }else generate();
    }

    //swipe right
    function moveRight(){
        for(let i=0;i<16;i++){
            if(i%4===0){
                let totalOne=squares[i].innerHTML;
                let totalTwo=squares[i+1].innerHTML;
                let totalThree=squares[i+2].innerHTML;
                let totalFour=squares[i+3].innerHTML;
                let row=[parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                

                let filteredRow=row.filter(num => num);
                let missing=4-filteredRow.length;
                let zeros=Array(missing).fill(0);
                let newRow=zeros.concat(filteredRow);
                

                squares[i].innerHTML=newRow[0];
                squares[i+1].innerHTML=newRow[1];
                squares[i+2].innerHTML=newRow[2];
                squares[i+3].innerHTML=newRow[3];

            }
        }
    }


     //swipe Left
     function moveLeft(){
        for(let i=0;i<16;i++){
            if(i%4===0){
                let totalOne=squares[i].innerHTML;
                let totalTwo=squares[i+1].innerHTML;
                let totalThree=squares[i+2].innerHTML;
                let totalFour=squares[i+3].innerHTML;
                let row=[parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                

                let filteredRow=row.filter(num => num);
                
                let missing=4-filteredRow.length;
                let zeros=Array(missing).fill(0);
                
                let newRow=filteredRow.concat(zeros);
                

                squares[i].innerHTML=newRow[0];
                squares[i+1].innerHTML=newRow[1];
                squares[i+2].innerHTML=newRow[2];
                squares[i+3].innerHTML=newRow[3];

            }
        }
    }

    //swipe down
    function moveDown(){
        for(let i=0;i<4;i++){
            let totalOne=squares[i].innerHTML;
            let totalTwo=squares[i+width].innerHTML;
            let totalThree=squares[i+(width*2)].innerHTML;
            let totalFour=squares[i+(width*3)].innerHTML;

            let column=[parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
            let filteredColumn=column.filter(num => num);
            let missing=4-filteredColumn.length;
            let zeros=Array(missing).fill(0);
            let newColumn=zeros.concat(filteredColumn);

            squares[i].innerHTML=newColumn[0];
            squares[i+width].innerHTML=newColumn[1];
            squares[i+(width*2)].innerHTML=newColumn[2];
            squares[i+(width*3)].innerHTML=newColumn[3];


        }
    }

    //swipe Up
    function moveUp(){
        for(let i=0;i<4;i++){
            let totalOne=squares[i].innerHTML;
            let totalTwo=squares[i+width].innerHTML;
            let totalThree=squares[i+(width*2)].innerHTML;
            let totalFour=squares[i+(width*3)].innerHTML;

            let column=[parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
            let filteredColumn=column.filter(num => num);
            let missing=4-filteredColumn.length;
            let zeros=Array(missing).fill(0);
            let newColumn=filteredColumn.concat(zeros);

            squares[i].innerHTML=newColumn[0];
            squares[i+width].innerHTML=newColumn[1];
            squares[i+(width*2)].innerHTML=newColumn[2];
            squares[i+(width*3)].innerHTML=newColumn[3];


        }
    }


    //assign keycodes

    function control(e){
        if(e.keyCode===39){
            keyRight()
        }else if(e.keyCode===37){
            keyLeft()
        }else if(e.keyCode===38){
            keyUp()
        }else if(e.keyCode===40){
            keyDown()
        }
    }
    document.addEventListener('keyup', control)

    function keyRight(){
        moveRight();
        generate();
        score++;
        scoreDisplay.innerHTML=score;
    }
    function keyLeft(){
        moveLeft();
        generate();
        score++;
        scoreDisplay.innerHTML=score;
    }
    function keyDown(){
        moveDown();
        generate();
        score++;
        scoreDisplay.innerHTML=score;
    }
    function keyUp(){
        moveUp();
        generate();
        score++;
        scoreDisplay.innerHTML=score;
    }

    //check for Gameover
    function checkForGameOver(){
        let zeros=0;
        for(let i=0;i<squares.length;i++){
            if(squares[i].innerHTML==0){
                zeros++
            }
        }
        if(zeros===0){
            resultDisplay.innerHTML="GAME OVER!!!!"
            document.removeEventListener('keyup', control);
        }
    }

})