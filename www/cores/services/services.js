angular.module('avanteApp')
/* .factory('Data', function (toaster) { // This service connects to our REST API
			return{
       // var serviceBase = 'api/v1/';
 
       // var obj = {};
 toast: function (data) {
           return toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
        }
		}
		})
		 */
.factory('ApplicantService',function($http){

	return{

		registerApplicant:function(applicant){
			return $http.post("http://127.0.0.1/JobApplication/v1/register",applicant);
		},
		getAllUsers:function(){

			return $http.get("http://127.0.0.1/JobApplication/v1/allusers");
		},

		getAllUsersById:function(id){
			return $http.get("http://127.0.0.1/JobApplication/v1/userbyId?id=" + id);
		},

        postlogin:function(login){
            return $http.post("http://127.0.0.1/JobApplication/v1/login",login)
        }
	}

	})
	
	
	.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})