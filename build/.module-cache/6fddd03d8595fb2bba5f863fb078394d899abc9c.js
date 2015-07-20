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
                return {units: []}
            },
            handleCheck: function() {
                var newArr = this.state.units;
                newArr[0][0].checked = true;
                this.setState({units:newArr})
            },
            
            render: function() {
                var notes = [];
                    
                for (var i = 0; i < 15; i++) {
                    this.state.units.push([]);
                    for(var j = 0; j<15 ; j++){
                        var index= i.toString() +"_"+ j.toString(),
                            color="black";
                        
                        this.state.units[i].push({
              	            checked: false,
              	            color: ""
              	        });
                        notes.push( 
                            React.createElement("div", {className: color}, 
                          		React.createElement("input", {type: "checkbox", id: index, checked: this.state.units[i][j].checked}), 
                        	  	React.createElement("label", {htmlFor: index, onClick: this.handleCheck()})
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