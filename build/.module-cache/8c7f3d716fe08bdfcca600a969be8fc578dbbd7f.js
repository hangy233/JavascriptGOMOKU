 var Unit = React.createClass({displayName: "Unit",
            getInitialState: function() {
                return {checked: false}
            },
            handleCheck: function() {
                this.setState({checked: true});
            },
            render: function() {

                return (
                     React.createElement("div", {className: color}, 
                          		React.createElement("input", {type: "checkbox", id: index, name: "", onChange: this.handleCheck, defaultChecked: false}), 
                        	  	React.createElement("label", {htmlFor: index})
                     )
                );
            }
        });

React.render(React.createElement(Unit, null), document.getElementById('gomoku-container'));