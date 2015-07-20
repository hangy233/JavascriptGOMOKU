 var Board = React.createClass({displayName: "Board",
            getInitialState: function() {
                return {checked: false}
            },
            handleCheck: function() {
                this.setState({checked: !this.state.checked})
            },
            render: function() {
                var index,
                    color;
                if(this.state.checked) {
                    msg = "checked";
                }
                else {
                    msg = "unchecked";
                }
                
                return (
                React.createElement("div", {className: color}, 
              		React.createElement("input", {type: "checkbox", id: "00", name: "", defaultChecked: this.state.checked, onChange: this.handleCheck}), 
            	  	React.createElement("label", {for: "00"})
              	));
            }
        });

React.render(React.createElement(Board, null), document.getElementById('gomoku-container'));