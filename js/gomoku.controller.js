gomoku.controller = (function () {
	var firstRun = true;

	//add event listener
	var _setup = function () {
		$(".menu_button").off().click( function (event){
			var clickedId = event.target.id;
		    //alert(event.target.id);
		    if ( clickedId === "one_player" || clickedId === "two_players" ){
		    	gomoku.view.showScreen("game_board");
		    	//gameMode = clickedId;
			}
			else if ( clickedId === "about" ){
				gomoku.view.showScreen("about_screen");
			}
		});
	};

	var init = function () {
		if (firstRun) {
			_setup();
			firstRun = false;
		}
	};

	return {
		init : init
	};
})();