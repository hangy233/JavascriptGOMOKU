var gomoku = (function(){
    var units = [],
        settings = {
            size: 15
        };
        
    var init = function() {
        React.render(React.createElement(Board, {size: settings.size}), document.getElementById('gomoku-container'));
    }    
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
            while (color === getColor(i + downRight + 1,j - downRight - 1)) {
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

    return {
        init: init,
        initUnits: initUnits,
        checkRow: checkRow,
        updateUnits: updateUnits
    };
})();





 var Board = React.createClass({displayName: "Board",

            getInitialState: function() {
                var  tempUnits = [];
                 for (var i = 0; i < this.props.size; i++) {
                    tempUnits.push([]);
                    for(var j = 0; j< this.props.size ; j++){
                          tempUnits[i].push({
              	            checked: false,
              	            firstHand: true
              	        });
                    }
                 }
                return {units: tempUnits};
            },
            
            clickEvent: function(key) {
                var newArr = this.state.units;
                if(!newArr[key[0]][key[1]].checked){
                    this.handleCheck(key,newArr);
                    this.colorChange(newArr);
                }
                this.setState({units:newArr});
                gomoku.updateUnits(newArr);
                if(gomoku.checkRow(key[0],key[1]).left>=5){
                    alert("nice");
                }
            },
            
            handleCheck: function(key, newArr) {
                newArr[key[0]][key[1]].checked = true;
            },
            colorChange: function(newArr) {
                for(var i=0; i < this.props.size; i++){
                    for(var j=0;j< this.props.size; j++){
                        if(!newArr[i][j].checked){
                            newArr[i][j].firstHand = !newArr[i][j].firstHand;
                        }
                    }
                }
            },
            
            render: function() {
                var nodes = [];

                for (var i = 0; i < this.props.size; i++) {
                    for(var j = 0; j< this.props.size ; j++){
                        var index= i.toString() +"_"+ j.toString(),
                            color;
                        
                        if(this.state.units[i][j].firstHand){
                            color = "black";
                        }else{
                            color = "white";
                        }
                        
                        nodes.push( 
                            React.createElement("div", {className: color}, 
                          		React.createElement("input", {type: "checkbox", id: index, checked: this.state.units[i][j].checked}), 
                        	  	React.createElement("label", {htmlFor: index, onClick: this.clickEvent.bind(this,[i,j])})
                          	)
              	        );
              	        
                    }
                }
                

                
                return (
                    React.createElement("div", {className: "board"}, 
                        nodes
                    ));
            }
        });

gomoku.init();