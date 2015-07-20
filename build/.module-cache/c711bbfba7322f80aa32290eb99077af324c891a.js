var gomoku = (function(){
    var units = [],
        settings = {
            size: 15,
            rule: "freestyle"
        };
        
    var init = function() {
        React.render(React.createElement(Board, {size: settings.size}), document.getElementById('gomoku-container'));
        zoomBoard();
    };
    
    var zoomBoard = function(){
        var windowWidth = window.innerWidth,
            windowHeight = window.innerHeight;
            
        if ( windowHeight / windowWidth > 1.15){
            $('#gomoku-container').css('width',windowWidth);
            $('#gomoku-container').css('height',windowWidth * 1.15);
            $('.board').css('zoom',windowWidth/613);
            $('.menu').css('zoom',windowWidth/613).css('font-size',$('.menu').css('height')/3);
        } else {
            $('#gomoku-container').css('height',windowHeight);
            $('#gomoku-container').css('width',windowHeight / 1.15);
            $('.board').css('zoom',(windowHeight / 1.15)/613);
            $('.menu').css('zoom',(windowHeight / 1.15)/613).css('font-size',$('.menu').css('height')/3);
        }
    };
    
    var setUp = function(size,newRule){
        settings.rule = newRule;
        for (var i = 0; i < size; i++) {
            units.push([]);
            for(var j = 0; j< size ; j++){
                units[i].push({
                    checked: false,
              	    firstHand: true
                });
            }
        }
    };
    
    var updateUnits = function(arr) {
         units = arr;
    };
    
    var getColor = function(i,j) {
        if(i < 0 || i > settings.size-1 || j < 0 || j > settings.size-1 || !units[i][j].checked){
            return null;
        }
        else {
            return units[i][j].firstHand;
        }
    };
    
    var checkRow = function(i,j,color) {
        var left = 0,
            right = 0,
            down = 0,
            up = 0,
            upLeft = 0,
            upRight = 0,
            downLeft = 0,
            downRight = 0;
            
            while (color === getColor(i,j + right + 1)) {
                right += 1;
            }
            while (color ===  getColor(i,j - left - 1)) {
                left += 1;
            }
            while (color === getColor(i + down + 1,j)) {
                down += 1;
            }
            while (color ===  getColor(i - up - 1,j)) {
                up += 1;
            }
            while (color === getColor(i - upLeft - 1,j - upLeft - 1)) {
                upLeft += 1;
            }
            while (color === getColor(i - upRight - 1,j + upRight + 1)) {
                upRight += 1;
            }
            while (color === getColor(i + downLeft + 1,j - downLeft - 1)) {
                downLeft += 1;
            }
            while (color === getColor(i + downRight + 1,j + downRight + 1)) {
                downRight += 1;
            }
            return{
                horizontal : left + right,
                vertical : up + down,
                backslash  : upLeft + downRight,
                slash : upRight + downLeft
            };
    };
    
    var rowIsAlive = function(i,j,color) {
        var left = 0,
            right = 0,
            down = 0,
            up = 0,
            upLeft = 0,
            upRight = 0,
            downLeft = 0,
            downRight = 0,
            
            horizontal = 0,
            vertical = 0,
            slash = 0,
            backslash = 0;
            
            
            while (color === getColor(i,j + right + 1)) {
                right += 1;
            }
            while (color ===  getColor(i,j - left - 1)) {
                left += 1;
            }
            while (color === getColor(i + down + 1,j)) {
                down += 1;
            }
            while (color ===  getColor(i - up - 1,j)) {
                up += 1;
            }
            while (color === getColor(i - upLeft - 1,j - upLeft - 1)) {
                upLeft += 1;
            }
            while (color === getColor(i - upRight - 1,j + upRight + 1)) {
                upRight += 1;
            }
            while (color === getColor(i + downLeft + 1,j - downLeft - 1)) {
                downLeft += 1;
            }
            while (color === getColor(i + downRight + 1,j + downRight + 1)) {
                downRight += 1;
            }
            
            if(color === !getColor(i, j + right + 1)){
                horizontal += 1;
            }
            if(color === !getColor(i, j - left - 1)){
                horizontal += 1;
            }
            if(color === !getColor(i + down + 1,j)){
                vertical += 1;
            }
            if(color ===  !getColor(i - up - 1,j)){
                vertical += 1;
            }
            if(color === !getColor(i - upLeft - 1,j - upLeft - 1)){
                backslash += 1;
            }
            if(color === !getColor(i + downRight + 1,j + downRight + 1)){
                backslash += 1;
            }
            if (color === !getColor(i - upRight - 1,j + upRight + 1)) {
                slash += 1;
            }
            if (color === !getColor(i + downLeft + 1,j - downLeft - 1)) {
                slash += 1;
            }
            
            return{
                horizontal : horizontal,
                vertical : vertical,
                backslash  : backslash,
                slash : slash
            };
    };
    
    var calScoreBase = function(counts,live){

         var scoreBase = {
                deadFour: 0,
                liveFour: 0,
                deadThree: 0,
                liveThree: 0,
                deadTwo: 0,
                liveTwo: 0
            };
                    
         for (var directions in counts) {
            if (counts.hasOwnProperty(directions)) {
                if(counts[directions] === 3 ){
                    if(live[directions] === 0){
                        scoreBase.liveFour += 1;
                    }
                    else if(live[directions] === 1){
                        scoreBase.deadFour += 1;
                    }
                }
                if(counts[directions] === 2 ){
                    if(live[directions] === 0){
                        scoreBase.liveThree += 1;
                    }
                    else if(live[directions] === 1){
                        scoreBase.deadThree += 1;
                    }
                }
                if(counts[directions] === 1 ){
                    if(live[directions] === 0){
                        scoreBase.liveTwo += 1;
                    }
                    else if(live[directions] === 1){
                        scoreBase.deadTwo += 1;
                    }
                }
            }
        }
        
        return scoreBase;
    };
    
    var calScore = function(scoreBase) {
        var score =0;
        if(scoreBase.liveFour >=1 || scoreBase.deadFour>=2 || (scoreBase.deadFour === 1 && scoreBase.liveThree === 1)){
            score = 90;
        }
        else if(scoreBase.liveThree >=2){
            score = 80;
        }
        else if(scoreBase.liveThree === 1 && scoreBase.deadThree ===1){
            score = 70;
        }
        else if(scoreBase.deadFour ===1){
            score = 60;
        }
        else if(scoreBase.liveThree ===1){
            score = 50;
        }
        else if(scoreBase.liveTwo >= 2){
            score = 40;
        }
        else if(scoreBase.deadThree ===1){
            score = 30;
        }
        else if(scoreBase.liveTwo === 1){
            score = 20;
        }
        else if(scoreBase.deadTwo === 1){
            score = 10;
        }
        else{
            score = 1;
        }
        return score;
    };
    
    
    var AIMove = function(color){

            var unitsScore = [];
            
            for(var i = 0; i<settings.size; i++){
                for(var j = 0; j<settings.size; j++){
                    var score = 0;
                    
                    if(!units[i][j].checked){
                        if(gameWin(i, j, color)){
                            score += 100;
                        }
                        if(gameWin(i, j, !color)){
                            score += 100;
                        }
                        var counts = checkRow(i, j, color),
                            live = rowIsAlive(i, j, color),
                            humanCounts = checkRow(i, j, !color),
                            humanLive = rowIsAlive(i, j, !color),
                            AIScoreBase = {},
                            humanScoreBase = {};
                            
                        AIScoreBase = calScoreBase(counts, live);
                        humanScoreBase = calScoreBase(humanCounts, humanLive);
                        score +=calScore(AIScoreBase);
                        //score +=calScore(humanScoreBase);
                        
                    }
                    unitsScore.push({
                        score:score,
                        pos:{i:i,j:j}
                        });
                }
            }
            
            
            var max = settings.size*settings.size,
                key = 1;
                
            while( key<max ){
                //console.log(key+"/"+max+"/"+unitsScore.length);
                var curScore = unitsScore[key].score,
                    preScore = unitsScore[key-1].score;
                    
                if(curScore>preScore){
                    unitsScore.splice(0,key);
                    max -= key;
                    key = 1;
                }
                else if(curScore<preScore){
                    unitsScore.splice(key,1);
                    max -= 1;
                }
                else{
                    key += 1;
                }
            }
            
            console.log(unitsScore);
            return unitsScore[Math.floor(Math.random()*(unitsScore.length))].pos;
    };
    
    
    var gameWin = function(i,j,color) {
        var counts = checkRow(i,j,color);
        //console.log(counts);
        switch (settings.rule) {
            case 'freestyle':
                for (var directions in counts) {
                    if (counts.hasOwnProperty(directions)) {
                        if(counts[directions] >= 4){
                            return true;
                        }
                    }
                }
                return false;
                

            case 'standard':
                for (var directions in counts) {
                    if (counts.hasOwnProperty(directions)) {
                        if(counts[directions] === 4){
                            return true;
                        }
                    }
                }
                return false;
                
        }
        
        
        
    };
    


    return {
        init: init,
        setUp: setUp,
        checkRow: checkRow,
        updateUnits: updateUnits,
        gameWin: gameWin,
        getColor: getColor,
        AIMove: AIMove
    };
})();

