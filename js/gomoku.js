var gomoku = (function () {
	var scriptQueue = [],
		numResourcesLoaded = 0,
		numResources = 0,
		executRunning = false;

	//execute the loaded scripts and callback
	var _executeScriptQueue = function () {
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
				_executeScriptQueue();
			};
			script.src = next.src;
			first.parentNode.insertBefore(script, first);
		}
		else{
			executRunning = false;
		}
	};

	//load scripts as images. They are not executed at this point
	var load = function (src, callback) {
		var image,
			queueEntry;
		numResources += 1;

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
				_executeScriptQueue();
			}
		};
		image.src = src;
	};

	//invoke after all the scripts loaded
	var init = function (){
		//console.log("scripts loaded successfully");
		gomoku.view.showScreen("splash_screen");
		gomoku.controller.init();
	};

	return {
		load: load,
		init: init
	};

})();