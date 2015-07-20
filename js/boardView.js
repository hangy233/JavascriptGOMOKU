
 var Board = React.createClass({

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
                  showAIOption: false
              });
              
            },
            
            setAI: function(AIColor){
                var tempAIColor = AIColor;


                if(this.state.AI === tempAIColor){
                    tempAIColor = "off";
                }
                
              this.setState({
                  AI:tempAIColor
              });  
              
                if(tempAIColor === "black" && this.state.currentPlayer){
                    var tempPos = gomoku.AIMove(true);
                    this.putChess([tempPos.i, tempPos.j],true);
                }
                else if(tempAIColor === "white" && !this.state.currentPlayer){
                    var tempPos = gomoku.AIMove(false);
                    this.putChess([tempPos.i, tempPos.j],true);
                }
            },


            putChess: function(key, AI) {
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
                            AI:"off"
                        });
                        if(this.state.units[key[0]][key[1]].firstHand){
                            this.setState({info:"Black Wins"});
                        }
                        else{
                            this.setState({info:"White Wins"});
                        }
                    }
                }

                if(!AI && !this.state.endGame){
                    if(this.state.AI === "black" && !this.state.units[key[0]][key[1]].firstHand){
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
                            <div className={color}>
                          		<input type="checkbox" id={index} checked={this.state.units[i][j].checked}  />
                        	  	<label htmlFor={index} onClick={this.putChess.bind(this,[i,j],false)}></label>
                          	</div>
              	        );
              	        
                    }
                }

                
                return (
                    <div className="gomoku">
                        <div className="board">
                            {nodes}
                        </div>
                        <div className="menu">
                                <div id="new" className={menuNewClass} onClick={this.toggleShowRuleOption}>
                                    NEW
                                </div>
                                
                                { this.state.showRuleOption ? <Rules newGame={this.newGame}/> : null }

                                <p id="winner">{this.state.info}</p>
                                
                                { this.state.showAIOption ? <AIOption setAI={this.setAI} AI={this.state.AI} /> : null }

                                <div id="AI" className={menuAIClass} onClick={this.toggleShowAIOption}>
                                    AI
                                </div>
                        </div>
                    </div>
                );
            }
});


var Rules = React.createClass({
    render: function() {
        return (
            
            <div id="rules">
                <div id="standard" onClick={this.props.newGame.bind(this,"standard")}>STANDARD</div>
                <div id="freestyle" onClick={this.props.newGame.bind(this,"freestyle")}>FREESTYLE</div>
            </div>
            
        );
    }
});

var AIOption = React.createClass({
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
            <div id="AIOption">
                <div id="AIblack" className={menuAIblackClass}  onClick={this.props.setAI.bind(this,"black")} >BLACK</div>
                <div id="AIwhite" className={menuAIwhiteClass}  onClick={this.props.setAI.bind(this,"white")} >WHITE</div>
            </div>
            
        );
    }
});