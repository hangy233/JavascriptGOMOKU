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
              	            color: ""
              	        });
                    }
                 }
                return {units: tempUnits}
            },
            handleCheck: function(i,g) {
                console.log(g);
                var newArr = this.state.units;
                newArr[i][j].checked = true;
                this.setState({units:newArr})
            },
            
            render: function() {
                var notes = [];
                    
                for (var i = 0; i < 15; i++) {
                    for(var j = 0; j<15 ; j++){
                        var index= i.toString() +"_"+ j.toString(),
                            color="black";
                        
                        notes.push( 
                            React.createElement("div", {className: color}, 
                          		React.createElement("input", {type: "checkbox", id: index, checked: this.state.units[i][j].checked}), 
                        	  	React.createElement("label", {htmlFor: index, onClick: this.handleCheck.bind(i,j)})
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