var gomoku = (function(){
    var units = [],
        settings = {
            size: 15,
            rule: "freestyle",
            AI: false
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
    
    var initUnits = function(size){
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
        if(i < 0 || i > settings.size-1 || j < 0 || j > settings.size-1){
            return null;
        }
        else {
            return units[i][j].firstHand;
        }
    };
    
    var checkRow = function(i,j) {
        var color = getColor(i,j),
            left = 0,
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
                left : left,
                right : right,
                down :down,
                up : up,
                upLeft : upLeft,
                upRight : upRight,
                downLeft : downLeft,
                downRight :downRight
            };
    };
    
    var freestyleWin = function(i,j) {
        var counts = checkRow(i,j);
        
        for (var directions in counts) {
            if (counts.hasOwnProperty(directions)) {
                if(counts[directions]>=4){
                    return true;
                }
            }
        }
        return false;
    };

    return {
        init: init,
        initUnits: initUnits,
        checkRow: checkRow,
        updateUnits: updateUnits,
        freestyleWin: freestyleWin
    };
})();

