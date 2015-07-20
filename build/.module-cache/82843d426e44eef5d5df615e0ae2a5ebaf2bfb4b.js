 var Board = React.createClass({displayName: "Board",
            getInitialState: function() {
                return {checked: false}
            },
            handleCheck: function() {
                this.setState({checked: true})
            },
            render: function() {
                var units = [];
                    
                for (var i = 0; i < 15; i++) {
                    for(var j = 0; j<15 ; j++){
                        var index= i.toString() +"_"+ j.toString(),
                            color="black";
                            
                        units.push( 
                            React.createElement("div", {className: color}, 
                          		React.createElement("input", {type: "checkbox", id: index, name: ""}), 
                        	  	React.createElement("label", {htmlFor: index})
                          	)
              	        );
                    }
                }
                
                return (
                    React.createElement("div", {className: "board"}, 
                        units
                    ));
            }
        });

React.render(React.createElement(Board, null), document.getElementById('gomoku-container'));