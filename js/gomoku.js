var gomoku = (function(){
	var scriptQueue = [],
		numResourcesLoaded = 0,
		numResources = 0,
		executRunning = false;

	var executeScriptQueue = function() {
		var next = scriptQueue[0],
			first,
			script;
		if(next && next.loaded){
			executRunning = true;
			//remove the first script in the queue
			scriptQueue.shift();
			first = document.getElementsByTagName("script")[0];
			script = document.createElement("script");
			script.onload = function(){
				if(next.callback){
					next.callback();
				}
				executeScriptQueue();
			};
			script.src = next.src;
			first.parentNode.insertBefore(script, first);
		}
		else{
			executRunning = false;
		}
	};

	//load scripts as images. They are not executed at this point
	var load = function(src, callback) {
		var image,
			queueEntry;
		numResources+=1;

		//add this resource to the execution queue
		queueEntry = {
			src: src,
			callback: callback,
			loaded: false
		};
		scriptQueue.push(queueEntry);

		image = new Image();
		image.onload = image.onerror = function(){
			numResourcesLoaded+=1;
			queueEntry.loaded = true;
			if(!executRunning){
				executeScriptQueue();
			}
		};
		image.src = src;
	};

	var showScreen = function(screenId){
		var activeScreen = $("#gomoku .screen .active"),
			nextActiveScreen = $("#" + screenId);
		if(activeScreen){
			activeScreen.removeClass("active");
		}
		nextActiveScreen.addClass("active");
	};

	var setup = function(){
		//console.log("scripts loaded successfully");
		gomoku.showScreen("splash-screen");
	};

	return {
		load: load,
		setup: setup,
		showScreen: showScreen
	};

})();