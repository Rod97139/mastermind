'use strict'

$(document).ready(function(){

    let guess = 0;
    let selectedColor = '';
    let bGround = 'rgba(0, 0, 0, 0) linear-gradient(rgb(0, 0, 102), rgb(0, 0, 255)) repeat scroll 0% 0% / auto padding-box border-box';

    $('.submit-btn').hide();

    let clickCount = 0;
    let isSelected = false;

    const makeAnswer = () => { // la fonction dot être déclarée avant l'affectaton
        let ray = [];
        for(let i = 0; i < 4; i++) {
            // console.log(x);
            ray.push(Math.floor(Math.random()*6));
        }
        return ray;
    }

    let answerRay = makeAnswer();
    // console.log(answerRay);

    let tempRay = $('.guess-pegs');
    let guessBoxArray = [];
    let nextGrade = $($('.first-grade')[0]).parent()[0];

    for (let i = 9; i >= 0; i--) {
        guessBoxArray.push(tempRay[i]);   
    }

    for (let i = 0; i < 10; i++) {
        let guessArray = guessBoxArray[i].getElementsByClassName('guess-peg');
        // console.log(guessArray);        
        for (let j = 0; j < 4; j++) {
            $(guessArray[j]).attr('id',`g-${i}-${j}`);
        } 
    }
    
    

    let superGuessArray = [
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1]
     ];

    //  console.log(superGuessArray);

     

    $('.submit-btn').click(function(){
        $('.active').removeClass('active');
        let gradeRay = getGrade();
        checkWin(gradeRay);
        // console.log(gradeRay);
        // console.log(answerRay);
        let gradeBox = getGradeBox(); 
        placePegs(gradeRay, gradeBox);
        // console.log(gradeBox);
        guess++;
        for(let i = 0; i < 4; i++){
            $(`#g-${guess}-${i}`).addClass('active');
        }
        $('.submit-btn').hide();
    });

    $('.selector-inner').click(function(){
        isSelected = true;
        $('.selector-outer').css('background-color', 'blue');
        let peg = ($(this).parent())[0];
        selectedColor = $(this).css('background-color');
        $(peg).css('background-color', selectedColor);
        
    });

    $('.guess-peg').click(function(){
        if(isSelected) { //true par défault
             
        
            if ($(this).hasClass('active')){
                    let number = parseInt($(this).css('border'));
                if (number === 1) {//insert peg
                    $(this).css('background', "none");
                    $(this).css('background-color', selectedColor);
                    $(this).css('border', '2px solid white');
                    
                    let coord = $(this).attr('id');  // coord
                    updateSuperGuessArray(selectedColor, coord); // col, yx

                    clickCount++;
                    if (clickCount === 4) {
                        $('.submit-btn').show();
                        clickCount = 0;
                    }
                } else {// peg removed
                    $(this).css('background', bGround);
                    $(this).css('border', '1px solid white');
                    // updateSuperGuessArray(selectedColor, coord);
                    clickCount--;
                }
            } 
        }       
    });

    const updateSuperGuessArray = (col, xy) => {
       
        
        let ray = xy.split('-');
        let x = ray[1];
        let y = ray [2];

        superGuessArray[x][y] = makeColorANumber(col);

        // console.log(superGuessArray);

    };

    const makeColorANumber = (col) => {
        if(col === 'rgb(255, 0, 0)') return 0
        if(col === 'rgb(0, 128, 0)') return 1;
        if(col === 'rgb(255, 255, 0)') return 2;
        if(col === 'rgb(0, 0, 0)') return 3;
        if(col === 'rgb(255, 255, 255)') return 4;
        if(col === 'rgb(255, 165, 0)') return 5;
    };
  
    const getGrade = () => {
        let gradeRay = [];
        let aRay = [];
        for(let i = 0; i < 4; i++){
            aRay.push(answerRay[i]);
        }

        // red peg check
        for(let i = 0; i < 4; i++) {
            if(superGuessArray[guess][i] === aRay[i]){
                gradeRay.push('red-peg');
                aRay[i] = -1;
                superGuessArray[guess][i] = -2;
            }
            
        }
                
        // white peg check

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (superGuessArray[guess][i] === aRay[j]) {
                    gradeRay.push('white-peg');
                    aRay[j] = -1;
                    superGuessArray[guess][i] = -2;
                }
                
            }
            
        }

        return gradeRay;
    };
    

    // console.log(activeGrade);

    const getGradeBox = () => {
        console.log(nextGrade);
        let activeGrade = nextGrade.getElementsByClassName('grade-pegs')[0];
        console.log(activeGrade);
        nextGrade = $(nextGrade).prev()[0];
        
        return activeGrade;
    };

    const placePegs = (ray, box) => {
        let pegRay = box.getElementsByClassName('grade-peg');
        console.log(pegRay);
        for(let i = 0; i< ray.length; i++) {
            $(pegRay[i]).addClass(`${ray[i]}`)
        }
        $('.white-peg').css('background', 'none').css('background-color', 'white');
        $('.red-peg').css('background', 'none').css('background-color', 'red');
    };

    const checkWin = (ray) => {
        console.log(ray);
        let rayStr = ray.join();
        console.log(rayStr);
        if (rayStr === "red-peg,red-peg,red-peg,red-peg") {
            $('.modal').fadeIn(200);
        }
    };
});
