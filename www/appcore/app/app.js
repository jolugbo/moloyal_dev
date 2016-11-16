angular.module('avanteApp',['ionic','LocalStorageModule','chart.js','angular-cache','ngCordova','ionic-material','ionMdInput'])

.run(function($ionicPlatform,CacheFactory,$cordovaSQLite,$state,$ionicHistory) {
	$ionicPlatform.ready(function() {

		if(window.Connection) {
			if(navigator.connection.type == Connection.NONE) {
				$ionicPopup.confirm({
					title: "Internet Disconnected",
					content: "The internet is disconnected on your device."
				})
				.then(function(result) {
					//if(!result) {
						//ionic.Platform.exitApp();
					//}
				});
			}
		}
		$ionicPlatform.registerBackButtonAction(function () {
		  if (condition) {
		    navigator.app.exitApp();
		  } else {
		     $state.go('login');
		  }
		}, 100);
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			
			StatusBar.styleLightContent();
		}

	});

      
$ionicPlatform.registerBackButtonAction(function(event) {
    // if ($ionicHistory.backView() == null && $ionicHistory.currentView().url != '/listing') {
    //   // Goto start view
    //   console.log("-> Going to start view instead of exiting");
    //   $ionicHistory.currentView($ionicHistory.backView()); // to clean history.
    //   // $rootScope.$apply(function() {
    //   //   $location.path('/landing');
    //   // });
    // } else 
    if ($ionicHistory.backView() == null ) {
    	navigator.app.exitApp();
    }
    else if ($ionicHistory.backView().stateId == 'landing' && $ionicHistory.currentView().url == '/landing') {
      console.log("-> Exiting app");
      navigator.app.exitApp();
    } else {
      // Normal back$ionicHistory.backView() 
      console.log("-> Going back");
      console.log("back View", $ionicHistory.backView());
      console.log("Current View", $ionicHistory.currentView().url);
      $ionicHistory.goBack();
    }
  }, 100);

	// $ionicPlatform.registerBackButtonAction(function(event) {
	//  if ($state.current.name == "login") { navigator.app.exitApp(); } 
	//  else{ navigator.app.backHistory();}
	// }, 100);

	
	// var  db = $cordovaSQLite.openDB("my.db");
 //     $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS secure (id integer primary key, firstname text, lastname text, status integer, serialNo integer)");
        
})



.config(function($ionicConfigProvider) {
	$ionicConfigProvider.tabs.position('bottom');
})



// .run(function($state,$rootScope,AuthService){
// 	$rootScope.$on('$stateChangeStart',function(event,next,nextParams,fromState){


// 		if(next.name !='login'){
// 			if(next.name !='app.listing'){
// 				if(AuthService.getLoggedInUserToken()==undefined 
// 					|| AuthService.getLoggedInUserToken()==null) {
// 					event.preventDefault();
// 				$state.go("login");

// 			}
// 		}

// 	}

// })


//})