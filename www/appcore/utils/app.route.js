angular.module('avanteApp')

.config(function($stateProvider, $urlRouterProvider) {
	
	$stateProvider
	
	.state('login', {
		url: '/login',
		templateUrl: 'views/auth/login.html',
		controller:'AuthController'
	})

        .state('forgotpass', {
            url: '/forgotpass',
            templateUrl: 'views/auth/forgotpass.html',
            controller:'ForgotPassController'
        })

        .state('landing', {
		url: '/landing',
		templateUrl: 'views/landing.html',
		controller:'LandingCtrl'
	})
	.state('reg', {
		url: '/reg',
		templateUrl: 'views/auth/register.html',
		controller:"AuthRegController"
	})
	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'views/sidemenu.html',
		controller:"AuthController"
	})
	.state('tab', {
		url: '/tab',
		abstract: true,
		templateUrl: 'views/tab.html'
	})


	.state('app.listing', {
		url: '/listing',
		views: {
			'menuContent': {
				templateUrl:'views/coreviews/listing.html',
				controller:''
			}
		}
	})

.state('app.buy', {
		url: '/buy',
		views: {
			'menuContent': {
				templateUrl:'views/coreviews/buy.html',
				controller:''
			}
		}
	})
	.state('app.transactions', {
		url: '/transactions',
		views: {
			'menuContent': {
				templateUrl:'views/coreviews/transactions.html',
				controller:''
			}
		}
	})

	.state('app.transactionsBreakDown', {
		url: '/transactionsBreakDown/:subMerchantId/:transType/:submerchantName',
		views: {
			'menuContent': {
				templateUrl:'views/coreviews/transactionsBreakDown.html',
				controller:'TransactionsController'
			}
		}
	})

	.state('app.voucherTrans', {
		url: '/voucherTrans/:submerchantName',
		views: {
			'menuContent': {
				templateUrl:'views/coreviews/voucherTrans.html',
				controller:'VoucherDataController'
			}
		}
	})

.state('app.voucher', {
		url: '/voucher',
		views: {
			'menuContent': {
				templateUrl:'views/coreviews/voucher.html',
				controller:'VoucherSetupController'
			}
		}
	})

	.state('app.qr', {
		url: '/qr',
		views: {
			'menuContent': {
				templateUrl:'views/coreviews/qr.html',
				controller:'QrController'
			}
		}
	})


	.state('app.help', {
		url: '/help',
		views: {
			'menuContent': {
				templateUrl:'views/coreviews/help.html',
				controller:'HelpController'
			}
		}
	})
.state('app.faq', {
		url: '/FAQ',
		views: {
			'menuContent': {
				templateUrl:'views/coreviews/FAQ.html',
				controller:'FaqController'
			}
		}
	})

	.state('app.jobdetails', {
		url: '/jobdetails',
		views: {
			'menuContent': {
				templateUrl:'views/coreviews/jobdetails.html',
				controller:'JobDetailController'
			}
		}
	})

	.state('app.profile', {
		url: '/profile',
		views: {
			'menuContent': {
				templateUrl: 'views/coreviews/profile.html',
				controller:"ProfileController"
			}
		}
	})

	//



	$urlRouterProvider.otherwise('/landing');

})
