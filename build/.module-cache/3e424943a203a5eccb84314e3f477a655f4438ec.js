// var gomoku = (function(){
//     var units = [];
        
//     var initUnits = (function(i,j){
//         for (var i = 0; i < 15; i++) {
//             units.push([]);
//             for(var j = 0; j<15 ; j++){
//                 units[i].push({
//                     checked: false,
//                     color: ""
//                 });
//             }
//         }
//     })(15,15);

//     return {
//         foo: foo
//     }
// })()





 var Board = React.createClass({displayName: "Board",

            getInitialState: function() {
                var  tempUnits = [];
                 for (var i = 0; i < 15; i++) {
                    tempUnits.push([]);
                    for(var j = 0; j<15 ; j++){
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
                this.handleCheck(key,newArr);
                this.colorChange(newArr);
                this.setState({units:newArr});
            },
            
            handleCheck: function(key, newArr) {
                newArr[key[0]][key[1]].checked = true;
            },
            colorChange: function(newArr) {
                for(var i=0; i < 15; i++){
                    for(var j=0;j<15; j++){
                        if(!newArr[i][j].checked){
                            newArr[i][j].firstHand = !newArr[i][j].firstHand;
                        }
                    }
                }
            },
            
            render: function() {
                var notes = [];

                for (var i = 0; i < 15; i++) {
                    for(var j = 0; j<15 ; j++){
                        var index= i.toString() +"_"+ j.toString(),
                            color;
                        
                        if(this.state.units[i][j].firstHand){
                            color = "black";
                        }else{
                            color = "white";
                        }
                        
                        notes.push( 
                            React.createElement("div", {className: color}, 
                          		React.createElement("input", {type: "checkbox", id: index, checked: this.state.units[i][j].checked}), 
                        	  	React.createElement("label", {htmlFor: index, onClick: this.clickEvent.bind(this,[i,j])})
                          	)
              	        );
              	        
                    }
                }
                

                
                return (
                    React.createElement("div", {className: "board"}, 
                        notes
                    ));
            }
        });

React.render(React.createElement(Board, null), document.getElementById('gomoku-container'));