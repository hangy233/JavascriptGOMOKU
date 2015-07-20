
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
                return {
                    units: tempUnits,
                    endGame: false
                };
            },
            
            clickEvent: function(key) {
                if(!this.state.endGame){
                    var newArr = this.state.units;
                    if(!newArr[key[0]][key[1]].checked){
                        this.handleCheck(key,newArr);
                        this.colorChange(newArr);
                    }
                    this.setState({units:newArr});
                    gomoku.updateUnits(newArr);
                    if(gomoku.freestyleWin(key[0],key[1])){
                        this.setState({endGame:true});
                    }
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

