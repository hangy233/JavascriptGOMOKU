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
                React.createElement("div", {className: "black"}, 
              		React.createElement("input", {type: "checkbox", id: index, name: "", defaultChecked: this.state.checked, onChange: this.handleCheck}), 
            	  	React.createElement("label", {for: index})
              	)
              	);
            }
        });

React.render(React.createElement(Board, null), document.getElementById('gomoku-container'));