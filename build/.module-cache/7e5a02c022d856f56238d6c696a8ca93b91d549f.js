
 var Board = React.createClass({displayName: "Board",

            getInitialState: function() {
                var  tempUnits = [];
                 for (var i = 0; i < this.props.size; i++) {
                    tempUnits.push([]);
                    for(var j = 0; j< this.props.size ; j++){
                          tempUnits[i].push({
              	            checked: false,
              	            firstHand: true
              	        });
                    }
                 }
                return {
                    units: tempUnits,
                    endGame: false,
                    info:"",
                    rule: "freestyle",
                    AI: "off",
                    showRuleOption: false,
                    showAIOption: false,
                    currentPlayer: true
                };
            },
            
            toggleShowRuleOption: function() {
                this.setState({
                    showRuleOption:!this.state.showRuleOption,
                    showAIOption: false,
                    info: ""
                });
            },
            toggleShowAIOption: function() {
                this.setState({
                    showAIOption:!this.state.showAIOption,
                    showRuleOption: false,
                    info: ""
                });
            },
            
            newGame: function(newRule) {
              gomoku.setUp(this.props.size, newRule);
              
               var  tempUnits = [];
                 for (var i = 0; i < this.props.size; i++) {
                    tempUnits.push([]);
                    for(var j = 0; j< this.props.size ; j++){
                          tempUnits[i].push({
              	            checked: false,
              	            firstHand: true
              	        });
                    }
                 }
                 
              this.setState({
                  units:tempUnits,
                  endGame: false,
                  info:"",
                  rule: newRule,
                  AI: "off",
                  showRuleOption: false,
                  showAIOption: false,
                  currentPlayer: true
              });
              
            },
            
            setAI: function(AIColor){
                var tempAIColor = AIColor;
                
                if(this.state.AI === tempAIColor){
                    tempAIColor = "off";
                }
                
              this.setState({
                  AI:tempAIColor,
                  showAIOption:false
              });  
              forceUpdate(this.AIPutChess());
            },
            
            AIPutChess: function(){
                  if(this.state.AI === "black" && this.state.currentPlayer){
                    var tempPos = gomoku.AIMove(true);
                    this.putChess([tempPos.i, tempPos.j]);
                }
                else if(this.state.AI === "white" && !this.state.currentPlayer){
                    var tempPos = gomoku.AIMove(false);
                    this.putChess([tempPos.i, tempPos.j]);
                }
            },
            
            putChess: function(key) {
                if(!this.state.endGame){
                    
                    var newArr = this.state.units;
                    if(!newArr[key[0]][key[1]].checked){
                        this.handleCheck(key,newArr);
                        this.colorChange(newArr);
                    }
                    this.setState({units:newArr});
                    gomoku.updateUnits(newArr);
                    if(gomoku.gameWin(key[0], key[1], gomoku.getColor(key[0], key[1]))){
                        this.setState({
                            endGame:true,
                            showAIOption: false,
                            showRuleOption: false,
                        });
                        if(this.state.units[key[0]][key[1]].firstHand){
                            this.setState({info:"Black Wins"});
                        }
                        else{
                            this.setState({info:"White Wins"});
                        }
                    }
                    else if(this.state.AI === "black" && !this.state.units[key[0]][key[1]].firstHand){
                        var tempPos = gomoku.AIMove(true);
                        this.putChess([tempPos.i, tempPos.j]);
                    }
                    else if(this.state.AI === "white" && this.state.units[key[0]][key[1]].firstHand){
                        var tempPos = gomoku.AIMove(false);
                        this.putChess([tempPos.i, tempPos.j]);
                    }
                }
            },
            
            handleCheck: function(key, newArr) {
                newArr[key[0]][key[1]].checked = true;
            },
            colorChange: function(newArr) {
                
                this.setState({currentPlayer: !this.state.currentPlayer}); 
                for(var i=0; i < this.props.size; i++){
                    for(var j=0;j< this.props.size; j++){
                        if(!newArr[i][j].checked){
                            newArr[i][j].firstHand = !newArr[i][j].firstHand;
                        }
                    }
                }
            },
            
            render: function() {
                var nodes = [],
                    menuNewClass = this.state.showRuleOption ? "active":"",
                    menuAIClass = this.state.showAIOption ? "active":"";
                    
                if(this.state.AI!=="off"){
                    menuAIClass = "active";
                }

                for (var i = 0; i < this.props.size; i++) {
                    for(var j = 0; j< this.props.size ; j++){
                        var index= i.toString() +"_"+ j.toString(),
                            color;
                        
                        if(this.state.units[i][j].firstHand){
                            color = "black";
                        }else{
                            color = "white";
                        }
                        
                        nodes.push( 
                            React.createElement("div", {className: color}, 
                          		React.createElement("input", {type: "checkbox", id: index, checked: this.state.units[i][j].checked}), 
                        	  	React.createElement("label", {htmlFor: index, onClick: this.putChess.bind(this,[i,j])})
                          	)
              	        );
              	        
                    }
                }

                
                return (
                    React.createElement("div", {className: "gomoku"}, 
                        React.createElement("div", {className: "board"}, 
                            nodes
                        ), 
                        React.createElement("div", {className: "menu"}, 
                                React.createElement("div", {id: "new", className: menuNewClass, onClick: this.toggleShowRuleOption}, 
                                    "NEW"
                                ), 
                                
                                 this.state.showRuleOption ? React.createElement(Rules, {newGame: this.newGame}) : null, 

                                React.createElement("p", {id: "winner"}, this.state.info), 
                                
                                 this.state.showAIOption ? React.createElement(AIOption, {setAI: this.setAI, AI: this.state.AI}) : null, 

                                React.createElement("div", {id: "AI", className: menuAIClass, onClick: this.toggleShowAIOption}, 
                                    "AI"
                                )
                        )
                    )
                );
            }
});


var Rules = React.createClass({displayName: "Rules",
    render: function() {
        return (
            
            React.createElement("div", {id: "rules"}, 
                React.createElement("div", {id: "standard", onClick: this.props.newGame.bind(this,"standard")}, "STANDARD"), 
                React.createElement("div", {id: "freestyle", onClick: this.props.newGame.bind(this,"freestyle")}, "FREESTYLE")
            )
            
        );
    }
});

var AIOption = React.createClass({displayName: "AIOption",
    render: function() {
         var menuAIblackClass = "",
             menuAIwhiteClass = "";
        
         switch (this.props.AI) {
            case 'off':
                menuAIblackClass = "";
                menuAIwhiteClass = "";
                break;

            case 'black':
                menuAIblackClass = "active";
                menuAIwhiteClass = "";
                break;
                
            case 'white':
               menuAIblackClass = "";
                menuAIwhiteClass = "active";
                break;
            
            default:
                menuAIblackClass = "";
                menuAIwhiteClass = "";
        }
        
        return (
            React.createElement("div", {id: "AIOption"}, 
                React.createElement("div", {id: "AIblack", className: menuAIblackClass, onClick: this.props.setAI.bind(this,"black")}, "BLACK"), 
                React.createElement("div", {id: "AIwhite", className: menuAIwhiteClass, onClick: this.props.setAI.bind(this,"white")}, "WHITE")
            )
            
        );
    }
});