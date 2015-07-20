 var Board = React.createClass({displayName: "Board",
            getInitialState: function() {
                return {checked: false}
            },
            handleCheck: function() {
                this.setState({checked: !this.state.checked})
            },
            render: function() {
                var index="00",
                    color="black";
                
                return (
                React.createElement("div", {className: color}, 
              		React.createElement("input", {type: "checkbox", id: index, name: ""}), 
            	  	React.createElement("label", {for: index})
              	));
            }
        });

React.render(React.createElement(Board, null), document.getElementById('gomoku-container'));