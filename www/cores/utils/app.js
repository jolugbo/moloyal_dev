angular.module('avanteApp', ['ionic','ionicMaterialInk ','ionMdInput'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			
			StatusBar.styleLightContent();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider

  // setup an abstract state for the tabs directive
  .state('reg', {
  	url: '/reg',
  	templateUrl: 'templates/applicantreg.html',
  	controller:'ApplicantController'
  })
        .state('login',{
            url:'/login',
            templateUrl:'templates/login.html',
            controller:'LoginController'
        })
        .state('forgotpassword',{
            url:'/forgotpassword',
            templateUrl:'templates/forgotpassword.html',
            controller:'ForgotPassController'
        })


  
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

        .state('tab.users',{
            url:'/users',
            views: {
                'tab-users': {
                    templateUrl: 'templates/users.html',
                    controller: 'ApplicantController'
                }
            }
        })
        .state('tab.userdetails',{
            url:'/userdetails/:id',
            views: {
                'tab-users': {
                    templateUrl: 'templates/userdetails.html',
                    controller: 'UserDetailController'
                }
            }
        })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
	.state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })



    ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
