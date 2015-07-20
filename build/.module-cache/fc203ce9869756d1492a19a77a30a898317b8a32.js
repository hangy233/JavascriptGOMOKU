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
            handleCheck: function() {
                this.props.units[1][1].checked = true;
                alert(this.props.units[1][1].checked);
            },
            
            
            render: function() {
                var notes = [];
                    
                for (var i = 0; i < 15; i++) {
                    this.props.units.push([]);
                    for(var j = 0; j<15 ; j++){
                        var index= i.toString() +"_"+ j.toString(),
                            color="black";
                        
                        this.props.units[i].push({
              	            checked: false,
              	            color: ""
              	        });
                        notes.push( 
                            React.createElement("div", {className: color}, 
                          		React.createElement("input", {type: "checkbox", id: index, checked: this.props.units[i][j].checked}), 
                        	  	React.createElement("label", {htmlFor: index, onClick: this.handleCheck})
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

React.render(React.createElement(Board, {units: []}), document.getElementById('gomoku-container'));