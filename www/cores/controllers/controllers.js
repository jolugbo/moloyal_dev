angular.module('avanteApp')

.controller('ApplicantController',function(ApplicantService,$scope,$state,$stateParams){

	$scope.user ={};
	$scope.items =[];
	$scope.register =function(){
		var users = {firstname: $scope.user.firstname,
			othername :$scope.user.othername,lastname:$scope.user.lastname,
			email:$scope.user.email,password:$scope.user.password};
			//console.log(users);
			ApplicantService.registerApplicant(users).then(function(data){
			 //ToasterService.toast(data);
//				window.localStorage.setItem('user_id',data.data.id);
$state.go('users');
})
		}

		ApplicantService.getAllUsers().then(function(data){
			//console.log(data.data.users);
			//ToasterService.toast(data);
			$scope.items =data.data.users;
		});
		
	})
.controller('UserDetailController',function(ApplicantService,$scope,$state,$stateParams){
	$scope.user={};
	
	ApplicantService.getAllUsersById($stateParams.id).then(function(data){
		
		$scope.user =data.data;
		//console.log($scope.user);
	});
})


    .controller('LoginController',function(ApplicantService,$scope,$state,$stateParams) {

        $scope.login = {};
        $scope.items = [];
        $scope.doLogin = function () {
            var loginuser = {email:$scope.login.email,password:$scope.login.password};
            //console.log(users);
            ApplicantService.postlogin(loginuser).then(function (data) {
                //ToasterService.toast(data);
                //console.log(data.data.email);
//				window.localStorage.setItem('user_id',data.data.id);
                $state.go('tab.dash');
            })
        }
    })
//added from tab

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});


