angular.module('avanteApp')
.factory('InternetMonitor', ['$rootScope', '$cordovaNetwork', 
	function($rootScope, $cordovaNetwork){
		return {
			isOnline: function(){
				document.addEventListener("deviceready", function () {
				 if(ionic.Platform.isWebView()){
					return $cordovaNetwork.isOnline();    
				} else {
					return navigator.onLine;
				}
				}, true);

				// OR with Ionic

				// $ionicPlatform.ready(function() {
				//   $cordovaPlugin.someFunction().then(success, error);
				// });

			},
			startWatching: function(){
				if(ionic.Platform.isWebView()){

					$rootScope.$on('$cordovaNetwork:online', function(event, networkState){
						console.log("went online");
					});

					$rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
						console.log("went offline");
					});

				}
				else {

					window.addEventListener("online", function(e) {
						console.log("went online");
					}, false);    

					window.addEventListener("offline", function(e) {
						console.log("went offline");
					}, false);  
				}       
			}
		}
	}])