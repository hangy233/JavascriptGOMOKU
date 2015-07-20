 var Board = React.createClass({displayName: "Board",
            getInitialState: function() {
                return {units: []}
            },
            handleCheck: function(i,j) {
                this.state.units[i][j]=true;
            },
            
            
            
            render: function() {
                var notes = [];
                    
                for (var i = 0; i < 15; i++) {
                    this.state.units.push([]);
                    for(var j = 0; j<15 ; j++){
                        var index= i.toString() +"_"+ j.toString(),
                            color="black";
                            
                        notes.push( 
                            React.createElement("div", {className: color}, 
                          		React.createElement("input", {type: "checkbox", id: index, checked: this.state.units[i][j], defaultChecked: false}), 
                        	  	React.createElement("label", {htmlFor: index, onClick: this.handleCheck})
                          	)
              	        );
              	        this.state.units[i].push(false);
                    }
                }
                
                return (
                    React.createElement("div", {className: "board"}, 
                        notes
                    ));
            }
        });

React.render(React.createElement(Board, null), document.getElementById('gomoku-container'));