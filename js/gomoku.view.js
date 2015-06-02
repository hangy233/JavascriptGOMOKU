gomoku.view = (function () {
	//show active screen and hide other screens
	var showScreen = function (screenId){
		var activeScreen = $("#gomoku .active"),
			nextActiveScreen = $("#" + screenId);
		if(activeScreen){
			activeScreen.removeClass("active");
		}
		nextActiveScreen.addClass("active");
	};

	return {
		showScreen : showScreen
	};
})();
