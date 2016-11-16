angular.module('avanteApp')
.service('AuthService', ['Constants','$http','localStorageService',
	function(Constants,$http,localStorageService){
		var Loginurl = Constants.API.baseUrl + "user/login",
		loggedInUserId = undefined;
		loggedInMerchantDb = undefined;
		loggedInSerialNo = undefined;
		var Authsrv ={
			loginUser:function(loginParams){
			//console.log(loginParams);
               // console.log(Loginurl);
              // localStorageService.set(Constants.API.userIdToken,userId);
               return $http.post(Loginurl,loginParams);
               
           },
           setLoginUserIdToken:function(userId){
			localStorageService.remove(Constants.API.userIdToken);
           	localStorageService.set(Constants.API.userIdToken,userId);
			//localStorage.setItem(Constants.API.userIdToken,userId);
		},


		removeUserToken:function(){
			localStorageService.remove(Constants.API.userIdToken);
			loggedInUserId = undefined;
                window.localStorage.clear();
			//localStorage.removeItem(Constants.API.userIdToken);
		},
		getLoggedInUserToken:function(){
			loggedInUserId= localStorageService.get(Constants.API.userIdToken);
			return loggedInUserId
			//return localStorage.getItem(Constants.API.userIdToken);
		},
		//use to set merchantdb local storage

		setMerchantDbToken:function(merchantdb){
			localStorageService.set(Constants.API.merchantDbToken,merchantdb);
                //localStorage.setItem(Constants.API.userIdToken,userId);
            },

            removeMerchantDbToken:function(){
            	localStorageService.remove(Constants.API.merchantDbToken);
            	loggedInMerchantDb = undefined;
                //localStorage.removeItem(Constants.API.userIdToken);
            },
            getMerchantDbToken:function(){
            	loggedInMerchantDb= localStorageService.get(Constants.API.merchantDbToken);
            	return loggedInMerchantDb
                //return localStorage.getItem(Constants.API.userIdToken);
            },


            //use to set SerialNo local storage

            setSerialNoToken:function(serialno){
            	localStorageService.set(Constants.API.serialNoToken,serialno);
                //localStorage.setItem(Constants.API.userIdToken,userId);
            },

            removeSerialNoToken:function(){
            	localStorageService.remove(Constants.API.serialNoToken);
            	loggedInSerialNo = undefined;
                //localStorage.removeItem(Constants.API.userIdToken);
            },
            getSerialNoToken:function(){
            	loggedInSerialNo= localStorageService.get(Constants.API.serialNoToken);
            	return loggedInSerialNo
                //return localStorage.getItem(Constants.API.userIdToken);
            },



            forgotPass:function(applicant){
                //console.log(applicant);
                return $http.post(Constants.API.baseUrl + "users/forgotpass" ,applicant);
            },

            registerApplicant:function(applicant){
			//console.log(applicant);
			return $http.post(Constants.API.baseUrl + "users/register" ,applicant);
		},
		getUserProfile:function(id){
			return $http.get(Constants.API.baseUrl + "user/profile?id="+id);
		},

		updateUserProfile:function(applicant){
			return $http.post(Constants.API.baseUrl + "user/update",applicant);
		}


	}

	return Authsrv;
	
}])


.filter('searchByPurchase', function(){
	return function(items,search){
		var filtered = [];
		// $scope.TotalAccural = 0;
		// $scope.TotalRedemption = 0;
		if(!search){return items;}
		angular.forEach(items,function(item){
			if(angular.lowercase(item.Purchased).indexOf(angular.lowercase(search))!= -1){
				filtered.push(item);
			}
		});
        // for (var i = 0; i < filtered.length; i++) {
        //      $scope.TotalAccural += 0;//AccuralDetails[i];
        //      $scope.TotalRedemption +=0;// RedemptionDetails[i];
        // }
		return filtered;
	};
})
.filter('searchBySubmarchantId',function(){
	return function(items,search){
		var filtered = [];
		if(!search){return items;}
		angular.forEach(items,function(item){
			if(angular.lowercase(item.SubMarchantId).indexOf(angular.lowercase(search))!= -1){
				filtered.push(item);
			}
		});
		return filtered;
	};
})
.service('TransactionService', ['Constants','$http', function(Constants,$http){
	var transactionsurl = Constants.API.baseUrl + "transactions/all";
	var Transactionsrv ={
		//getAllTransactions:function(){
		//	return $http.get(transactionsurl);
		//},
		//applyForJob:function(job){
		//	return $http.post(Constants.API.baseUrl + "job/apply",job);
		//},
		getUserTransaction:function(transact){
			 console.log(Constants.API.baseUrl + "voucher/getMyTransaction" + transact);
			return $http.post(Constants.API.baseUrl + "transact/getMyTransaction",transact);
		}
	}

	return Transactionsrv;
	
}])

.service('WalletService', ['Constants','$http','$interval', function(Constants,$http,$interval){
	var transactionsurl = Constants.API.baseUrl + "transactions/all";
	var Walletsrv ={

		getUserBalance:function(wall){
               
			return $http.post(Constants.API.baseUrl + "wallet/getMybalance",wall);
		}
	}
	console.log('Fetched data!');
	return Walletsrv;

}])

 .service('VoucherSetupService', ['Constants','$http', function(Constants,$http){
        //var transactionsurl = Constants.API.baseUrl + "transactions/all";
        var Vouchersrv ={

            getVoucherData:function(vou){
               // console.log(Constants.API.baseUrl + "voucher/getVoucherdata" + vou);
                return $http.post(Constants.API.baseUrl + "voucher/getVoucherdata",vou);
            }

           // getLineGraphData:function(gff){
             //   return $http.post(Constants.API.baseUrl + "graph/getLineGraphdata",gff);
            //}

        }

        return Vouchersrv;

    }])

 .service('VoucherDataService', ['Constants','$http', function(Constants,$http){
        //var transactionsurl = Constants.API.baseUrl + "transactions/all";
        var Vouchersrv ={

            getVoucherData:function(vou){
                console.log("from service");
                return $http.post(Constants.API.baseUrl + "voucher/getMyVrecord",vou);
            }

           // getLineGraphData:function(gff){
             //   return $http.post(Constants.API.baseUrl + "graph/getLineGraphdata",gff);
            //}

        }

        return Vouchersrv;

    }])
 
.service('GraphService', ['Constants','$http','localStorageService', function(Constants,$http,localStorageService){
        //var transactionsurl = Constants.API.baseUrl + "transactions/all";
        var Graphsrv ={

        	getGraphData:function(gra){
                //console.log("from service",gra);
        		return $http.post(Constants.API.baseUrl + "graph/getGraphdata",gra);
        		//localStorageService.set(graphicData1,return $http.post(Constants.API.baseUrl + "graph/getGraphdata",gra);)
        	},

        	getLineGraphData:function(gff){
        		return $http.post(Constants.API.baseUrl + "graph/getLineGraphdata",gff);
        		//localStorageService.set(graphicLineData1,return $http.post(Constants.API.baseUrl + "graph/getLineGraphdata",gff);)
        	}

        }
        		console.log(Graphsrv);
            localStorageService.set('cacheGraphData',Graphsrv);
        return Graphsrv;


    }])

.factory('$fileFactory', ['$q', function($q){
	var File = function() { };

	File.prototype = {

		getParentDirectory: function(path) {
			var deferred = $q.defer();
			window.resolveLocalFileSystemURI(path, function(fileSystem) {
				fileSystem.getParent(function(result) {
					deferred.resolve(result);
				}, function(error) {
					deferred.reject(error);
				});
			}, function(error) {
				deferred.reject(error);
			});
			return deferred.promise;
		},

		getEntriesAtRoot: function() {
			var deferred = $q.defer();
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
				var directoryReader = fileSystem.root.createReader();
				directoryReader.readEntries(function(entries) {
					deferred.resolve(entries);
				}, function(error) {
					deferred.reject(error);
				});
			}, function(error) {
				deferred.reject(error);
			});
			return deferred.promise;
		},

		getEntries: function(path) {
			var deferred = $q.defer();
			window.resolveLocalFileSystemURI(path, function(fileSystem) {
				var directoryReader = fileSystem.createReader();
				directoryReader.readEntries(function(entries) {
					deferred.resolve(entries);
				}, function(error) {
					deferred.reject(error);
				});
			}, function(error) {
				deferred.reject(error);
			});
			return deferred.promise;
		}

	};

	return File;
}])

