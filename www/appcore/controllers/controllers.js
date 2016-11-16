angular.module('avanteApp')

// Authentication Controller
.controller('AuthController', ['AuthService','$scope','$ionicLoading','$state',
    '$ionicPopup','$timeout','InternetMonitor','$ionicHistory','$cordovaSQLite',function(AuthService,$scope,$ionicLoading,$state,
        $ionicPopup,$timeout,InternetMonitor,$ionicHistory,$cordovaSQLite){
        // check if the user has previously logged in
        console.log("got heere");
        if(AuthService.getLoggedInUserToken()==null){
                $state.go('login');
            }
            else{
                $state.go("app.listing");
            }
            
        $scope.login ={};
        // do an error if Login Fails
        var error = function(error){
            $ionicLoading.hide();
        console.log(error);
            $scope.error = error == null ? error.data.statusText  : 'The internet is disconnected on your device.' ;
            $scope.title = error == null ? "Invalid Login" : 'Internet Disconnected';
            var errorPopup = $ionicPopup.show({
                templateUrl: 'views/common/erorr.html',
                title: $scope.title,
                scope: $scope,
                buttons: [
                { text: 'Ok' }
                ]
            });


            $timeout(function() {
                    errorPopup.close(); //close the popup after 3 seconds for some reason
                }, 4000);
        }

        // do a success if login pass, set local storage 
        var success = function(response){
            console.log(response);
                $ionicLoading.hide();
                if(response.data.error==true){
                    $scope.error = response.data.message;

                    var errorPopup = $ionicPopup.show({
                        templateUrl: 'views/common/erorr.html',
                        title: 'Error',
                        scope: $scope,
                        buttons: [
                        { text: 'Ok' }
                        ]
                    });


                    $timeout(function() {
                        errorPopup.close(); //close the popup after 3 seconds for some reason
                    }, 4000);

                    return;
                }
                //console.log(response.data.merchantDb);
                // if (response.data.def == '1') {
                //     $state.go("app.listing");
                // }
                AuthService.setLoginUserIdToken(response.data.id);
                AuthService.setMerchantDbToken(response.data.merchantDb);
                AuthService.setSerialNoToken(response.data.serialNo);
                
              console.log(response.data);
                console.log(AuthService.getSerialNoToken());
               $ionicHistory.clearCache().then(function(){ $state.go('app.listing',{},{reload:true})})

            }
            // do login 
            $scope.login =function(){

                window.localStorage.clear();
                    AuthService.loginUser({userno:$scope.login.userno,password:$scope.login.password})
                    .then(success,error);
            }
            // do logout and clear all data return user to login page
            $scope.logOut=function(){
                AuthService.removeUserToken();
                AuthService.removeSerialNoToken();
                AuthService.removeMerchantDbToken();
                window.localStorage.clear();
              console.log("Got here");
                $state.go('login');
               // $window.close()
               // ionic.Platform.exitApp()
            }

        }])

// Gate keeper 
.controller('LandingCtrl', ['AuthService','$scope','$state', 
    function(AuthService,$scope,$state){
        $scope.init =function(){
            if(AuthService.getLoggedInUserToken()==null){
                $state.go('login');
            }else{
                $state.go("app.listing");
            }
        }
    }])

// Forgot Password Controller
.controller('ForgotPassController', ['AuthService','$scope','$ionicLoading','$state','$ionicPopup','$timeout',
        function(AuthService,$scope,$ionicLoading,$state,$ionicPopup,$timeout){

            $scope.helper ={};
            var registerData = {userid: $scope.helper.userid,email: $scope.helper.email};

            var error = function(error){
                console.log(error);
                $ionicLoading.hide();

                $scope.error = error.data.statusText;

                var errorPopup = $ionicPopup.show({
                    templateUrl: 'views/common/erorr.html',
                    title: 'Error',
                    scope: $scope,
                    buttons: [
                        { text: 'Ok' }
                    ]
                });

                $timeout(function() {
                    errorPopup.close(); //close the popup after 3 seconds for some reason
                }, 4000);
            }

            var success = function(response){

                console.log(response.data.message);
                $ionicLoading.hide();
                if(response.data.error==true){
                    $scope.error = response.data.message;

                    var errorPopup = $ionicPopup.show({
                        templateUrl: 'views/common/erorr.html',
                        title: 'Error',
                        scope: $scope,
                        buttons: [
                            { text: 'Ok' }
                        ]
                    });

                    $timeout(function() { errorPopup.close();}, 4000);
                    //return;
                }else{
                    $scope.successmsg = response.data.message;

                    var successPopup = $ionicPopup.show({
                        templateUrl: 'views/common/success.html',
                        title: 'Information',
                        scope: $scope,
                        buttons: [
                            { text: 'Ok' }
                        ]
                    });
                    $timeout(function() {successPopup.close();}, 10000);

                    $state.go("login");
                }

            }

            $scope.sendhelp =function(){

                $ionicLoading.show({
                    templateUrl:"views/common/wait.html"
                });
                AuthService.forgotPass({userid: $scope.helper.userid,email: $scope.helper.email})
                    .then(success,error);
            }

        }])



.controller('QrController', ['AuthService','$scope','$ionicLoading',function(AuthService,$scope,$ionicLoading) {

                //console.log(response.data.serialNo);
                //console.log(AuthService.getSerialNoToken());
                $ionicLoading.show({
                    templateUrl:"views/common/wait.html"
                });
                $scope.ser = AuthService.getSerialNoToken()
                console.log($scope.ser);
                $ionicLoading.hide();
               // console.log(localStorage.getItem(Constants.API.userIdToken));

            }]
            )

.controller('FaqController', ['AuthService','$scope','$ionicLoading',function(AuthService,$scope,$ionicLoading) {

                //console.log(response.data.serialNo);
                //console.log(AuthService.getSerialNoToken());
                $ionicLoading.show({
                    templateUrl:"views/common/wait.html"
                });
               // $scope.ser = AuthService.getSerialNoToken()
                //console.log($scope.ser);
                $ionicLoading.hide();
                //console.log(response);

            }]
            )

.controller('HelpController', ['AuthService','$scope','$ionicLoading',function(AuthService,$scope,$ionicLoading) {

                //console.log(response.data.serialNo);
                //console.log(AuthService.getSerialNoToken());
                $ionicLoading.show({
                    templateUrl:"views/common/wait.html"
                });
               // $scope.ser = AuthService.getSerialNoToken()
                //console.log($scope.ser);
                $ionicLoading.hide();
                //console.log(response);

            }]
            )


.controller("DoughnutCtrl",['AuthService','GraphService','$scope','$ionicLoading','InternetMonitor',
    'localStorageService',
    function(AuthService,GraphService,$scope,$ionicLoading,InternetMonitor,localStorageService){
        $scope.labels = ["Accruals", "Redemption"];       
        $scope.data=[];
        $ionicLoading.show({
            templateUrl:"views/common/wait.html"
        });
        
        // do error function
        var error = function(error){
            $ionicLoading.hide();
            $scope.data = localStorageService.get('GraphData');
            console.log($scope.data);
        }
        
        // do success function
        var success = function(response){
            $ionicLoading.hide();
            $scope.data=[response.data.accrue.AccuralTrans,response.data.redeem.RedemTrans];
            localStorageService.remove('GraphData');
            localStorageService.set('GraphData',JSON.stringify($scope.data));
        }            
                
        // avoid caching function
        function getMeData(){
           $scope.ser =  GraphService.getGraphData({id:AuthService.getLoggedInUserToken(),dbname:AuthService.getMerchantDbToken(), serialnum:AuthService.getSerialNoToken()})
                .then(success,error);
            }
            
         // refreash graph every few seconds
            setInterval(function() {
                getMeData();
            }, 5000);
            
    }])



.controller('TableCtrl', function($scope, $stateParams, $http,$location,$ionicModal,$filter,localStorageService,$ionicLoading
    ,InternetMonitor,TransactionService,AuthService, $timeout, ionicMaterialMotion, ionicMaterialInk) {
  $scope.transactions=[];
  $scope.subMerchant = [];
  $scope.countTransaction;
  $scope.tabValues = [];
  var tabValuesHeader ='{ "values" : [';

        $ionicLoading.show({
            templateUrl:"views/common/wait.html"
        });

        var error = function(error){
            $ionicLoading.hide();
               // console.log(error.data);
                //$scope.error = error.data.text;

                var errorPopup = $ionicPopup.show({
                    templateUrl: 'views/common/erorr.html',
                    title: 'Error',
                    scope: $scope,
                    buttons: [
                    { text: 'Ok' }
                    ]
                });


                $timeout(function() {
                    errorPopup.close(); //close the popup after 3 seconds for some reason
                }, 1000);
            }


                var success = function(response){
                console.log('trans',response.data.transactions);
                $ionicLoading.hide();
                $scope.transactions=response.data.transactions;
                localStorageService.remove('user_transaction');
                localStorageService.set('user_transaction',JSON.stringify(response.data.transactions));
                $scope.countTransaction = Object.keys($scope.transactions).length
                getSubMerchants();
                console.log($scope.transactions);

            }
           function getSubMerchants(){
                $scope.subMerchant = {}
                for (var i = 0; i <  $scope.countTransaction ; i++) {
                    $scope.subMerchant[$scope.transactions[i].submerchantId] = $scope.transactions[i];
                }
                console.log(_.keys($scope.subMerchant));
                getTotalAccurals(201501);
               
            }

           
            // function createTabValues(){
            //     for (var i = 0; i < $scope.subMerchant.length ; i++) {
            //          tabValues.push(' {"id":"' + _.keys($scope.subMerchant[i])  +
            //                               '",  "Accurals":"' + getTotalAccurals(_.keys($scope.subMerchant[i])).toString() +
            //                               '", "Redemption":"' + getTotalRedemption(_.keys($scope.subMerchant[i])).toString()+ 
            //                               '"}') ;
            //     }
            //       var JsonResultText = tabValuesHeader + tabValues + ']}';
            //       $scope.outputData = JSON.parse(JsonResultText);
            //       console.log($scope.outputData);
            // }

            //TransactionService.getAllTransactions().then(success,error);

            if(InternetMonitor.isOnline()){
                TransactionService.getUserTransaction({id:AuthService.getLoggedInUserToken(),
                    dbname:AuthService.getMerchantDbToken(), serialnum:AuthService.getSerialNoToken()})
                .then(success,error);
            }else{
                $ionicLoading.hide();
                if(localStorageService.get('user_transaction') !==undefined){
                    //console.log("data gotten from localStorage");
                    $scope.transactions=JSON.parse(localStorageService.get('user_transaction'));
                    
                }
            }

    // Set Header
    // $scope.$parent.showHeader();
    // $scope.$parent.clearFabs();
    // $scope.isExpanded = false;
    // $scope.$parent.setExpanded(false);
    // $scope.$parent.setHeaderFab(false);
    // Set Motion
    // $timeout(function() {
    //     ionicMaterialMotion.slideUp({
    //         selector: '.slide-up'
    //     });
    // }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

})

.controller('TransactionsController', ['TransactionService','AuthService','$scope','$state','$ionicLoading',
    '$timeout','$ionicPopup','localStorageService','InternetMonitor','$stateParams',
    function(TransactionService,AuthService,$scope,$state,$ionicLoading,
        $timeout,$ionicPopup,localStorageService,InternetMonitor,$stateParams){
        $scope.transactions=[];
        $scope.transById=[];
        $scope.SubMerchantId =  $stateParams.subMerchantId;
        $scope.transType =  $stateParams.transType;
        $scope.Holder =  $stateParams.submerchantName;
        console.log($scope.SubMerchantId);
        // $ionicLoading.show({
        //     templateUrl:"views/common/wait.html"
        // });

        var error = function(error){
           
                 $scope.transactions= JSON.parse(localStorageService.get('user_transaction'));
                 console.log( $scope.transactions);
                $scope.countTransaction = Object.keys($scope.transactions).length;
                 getTransById();
                console.log('trans', $scope.transactions);
            }


            var success = function(response){
              
                //$ionicLoading.hide();
                $scope.transactions=response.data.transactions;
                $scope.countTransaction = Object.keys($scope.transactions).length
                localStorageService.remove('user_transaction');
                localStorageService.set('user_transaction',JSON.stringify(response.data.transactions));
                console.log(response);
                getTransById();

            }
            function getTransById(){
                $scope.transById = [];
                console.log($scope.transactions);
            console.log($scope.SubMerchantId);
            console.log($scope.transType);
            for (var i = 0; i < $scope.countTransaction; i++) {
               if (($scope.transactions[i].submerchantId == $scope.SubMerchantId) && ($scope.transactions[i].transType == $scope.transType)) {

                    $scope.transById.push($scope.transactions[i]);
                    console.log($scope.transactions[i]);
               }
            }
            console.log($scope.transById);
            }
             function getMeData(){
             TransactionService.getUserTransaction({id:AuthService.getLoggedInUserToken(),
                    dbname:AuthService.getMerchantDbToken(), serialnum:AuthService.getSerialNoToken()})
                .then(success,error);
            }

            setInterval(function() {
                getMeData();
            }, 4000
            );
                TransactionService.getUserTransaction({id:AuthService.getLoggedInUserToken(),
                    dbname:AuthService.getMerchantDbToken(), serialnum:AuthService.getSerialNoToken()})
                .then(success,error);
           
        }])

.controller('VoucherSetupController', ['VoucherSetupService','AuthService','$scope','$state','$ionicLoading',
        '$timeout','$ionicPopup','InternetMonitor','localStorageService','$stateParams','Constants',
        function(VoucherSetupService,AuthService,$scope,$state,$ionicLoading,
                 $timeout,$ionicPopup,InternetMonitor,localStorageService,$stateParams,Constants){
        //$scope.userLevel = 1000;
        $scope.vouchers=[];
        $scope.Holder =  $stateParams.submerchantName;
        $scope.url = Constants.API.imgurl;
        var error = function(error){
            $ionicLoading.hide();
   
                $ionicLoading.hide();
                if(localStorageService.get('user_voucher') !==undefined){
                    //console.log("data gotten from localStorage");
                    $scope.vouchers=JSON.parse(localStorageService.get('user_voucher'));
               
                }
                else{
                var errorPopup = $ionicPopup.show({
                    templateUrl: 'views/common/erorr.html',
                    title: 'Error',
                    scope: $scope,
                    buttons: [
                    { text: 'Ok' }
                    ]
                });


                $timeout(function() {
                    errorPopup.close(); //close the popup after 3 seconds for some reason
                }, 1000);
            }
        }

            var success = function(response){
                $ionicLoading.hide();
               // $scope.balances=response.data;
                $scope.vouchers=response.data;
                console.log('response', response);
                    console.log($scope.vouchers);
                localStorageService.remove('user_voucher');
                localStorageService.set('user_voucher',JSON.stringify(response.data));
                if ($scope.vouchers[0] !=null) {
                $scope.userLevel = $scope.vouchers[0].tierName;

                }
                //console.log('scope.userLevel', $scope.userLevel);

            }
            function getMeData(){
             VoucherSetupService.getVoucherData({id:AuthService.getLoggedInUserToken(),
                    dbname:AuthService.getMerchantDbToken(), serialnum:AuthService.getSerialNoToken()}).then(success,error);
            }
            setInterval(function() {
                getMeData();
            }, 4000
            );
                VoucherSetupService.getVoucherData({id:AuthService.getLoggedInUserToken(),
                    dbname:AuthService.getMerchantDbToken(), serialnum:AuthService.getSerialNoToken()}).then(success,error);
            
        }])
 
.controller('WalletController', ['WalletService','AuthService','$scope','$state','$ionicLoading',
    '$timeout','$ionicPopup','localStorageService','$interval','$ionicHistory','Constants',
    function(WalletService,AuthService,$scope,$state,$ionicLoading,$timeout,$ionicPopup,localStorageService,$interval,$ionicHistory,Constants){
        
        // variable declaration
        $scope.totalRedemption = 0;
        $scope.totalAccurals = 0;
        $scope.totalPoints = 0;
        $scope.wallets=[];
        $scope.url = Constants.API.imgurl;
       $scope.showStore = function(){ 
         console.log("got here");
         var ref = cordova.InAppBrowser.open("google.com", '_blank','location=yes');
       
        }

        var error = function(error){
          //  $ionicLoading.hide();
             
                $scope.wallets  = localStorageService.get('wallets')
               // console.log($scope.wallets);
                $scope.countTransaction = Object.keys($scope.wallets).length
                $ionicLoading.hide();
                $scope.balances=localStorageService.get('balance')
                getTotalAccurals();
                getTotalRedemption();
                getTotalPoint();
            }
            
            var success = function(response){
           // $scope.vouchers=JSON.parse(localStorageService.get('user_voucher'));
            //$scope.userLevel = $scope.vouchers[0].tierName;
                $scope.wallets = response.data.wallet;
               // console.log('wallets', $scope.wallets);
                localStorageService.set('wallets', $scope.wallets);
                $scope.countTransaction = Object.keys($scope.wallets).length
                $scope.balances=response.data.bal;
                localStorageService.set('balance', $scope.balances);
                getTotalAccurals();
                getTotalRedemption();
                getTotalPoint();
        
            }
            
             function getTotalAccurals(){
                $scope.totalAccurals = 0;
                for (var i = 0;i < $scope.countTransaction; i++ ){
                      $scope.totalAccurals  = parseInt($scope.wallets[i].accruedpoints) +   $scope.totalAccurals; 
                    
                }
              //  console.log('totalAccurals', $scope.totalAccurals );

            }

             function getTotalRedemption(){
                $scope.totalRedemption = 0;
                for (var i = 0;i < $scope.countTransaction; i++ ){
                      $scope.totalRedemption  = parseInt($scope.wallets[i].redeemableamt) +   $scope.totalRedemption; 
                   
                }
               // console.log('totalRedemption', $scope.totalRedemption );

            } 
            function getTotalPoint(){
                $scope.totalPoints = 0;
                for (var i = 0;i < $scope.countTransaction; i++ ){
                      $scope.totalPoints  = parseInt($scope.wallets[i].tierpoint) +   $scope.totalPoints; 
                   
                }
               // console.log('totalPoints', $scope.totalPoints );

            }
            function getMeData(){
             WalletService.getUserBalance({id:AuthService.getLoggedInUserToken(),dbname:AuthService.getMerchantDbToken(), serialnum:AuthService.getSerialNoToken()})
            .then(success,error);
            }

            setInterval(function() {
                getMeData();
            }, 4000
            );
            WalletService.getUserBalance({id:AuthService.getLoggedInUserToken(),dbname:AuthService.getMerchantDbToken(), serialnum:AuthService.getSerialNoToken()})
            .then(success,error);
  // $interval( WalletService.getUserBalance({id:AuthService.getLoggedInUserToken(),dbname:AuthService.getMerchantDbToken(), serialnum:AuthService.getSerialNoToken()})
  //           , 1000).then(success,error);

        }])

.controller("LinegraphCtrl", ['AuthService','GraphService','$scope','$ionicLoading',
    'InternetMonitor','localStorageService',
    function(AuthService,GraphService,$scope,$ionicLoading,InternetMonitor,localStorageService){
       




        $scope.labels = ["03 Dec", "04 Dec", "05 Dec",
            "06 Dec", "07 Dec","08 Dec", "09 Dec", "10 Dec","11 Dec", "12 Dec", "13 Dec", "14 Dec", "15 Dec","16 Dec"];
        $scope.series = ['Accruals', 'Redemption'];
        $scope.colours= [{
            fillColor: 'rgba(47, 132, 71, 0.8)',
            strokeColor: 'rgba(47, 132, 71, 0.8)',
            highlightFill: 'rgba(47, 132, 71, 0.8)',
            highlightStroke: 'rgba(47, 132, 71, 0.8)'
        }];
        $scope.data = [
            [65, 0, 80, 81, 56, 55, 40,35,67,78,33,24,12,45],
            [28, 48, 40, 19, 86, 27, 90,55,23,52,78,23,21,102]
        ];
//console.log($scope.data);
}])
.controller('AuthRegController', ['AuthService','$scope','$ionicLoading','$state','$ionicPopup','$timeout','Constants','$ionicHistory',
    function(AuthService,$scope,$ionicLoading,$state,$ionicPopup,$timeout,Constants,$ionicHistory){

        $scope.user ={};


        var registerData = {firstname: $scope.user.firstname,phoneno: $scope.user.phoneno, lastname: $scope.user.lastname,email: $scope.user.email, password: $scope.user.password };
        var error = function(response){
                console.log(response);
               $ionicLoading.hide();

              // $scope.error = error.data.statusText;

               var errorPopup = $ionicPopup.show({
                templateUrl: 'views/common/erorr.html',
                title: 'Error',
                scope: $scope,
                buttons: [
                { text: 'Ok' }
                ]
            });


               $timeout(function() {
                    errorPopup.close(); //close the popup after 3 seconds for some reason
                }, 4000);
           }


           var success = function(response){
            console.log(response);
            $ionicLoading.hide();
            if(response.data.error==false){

                $scope.error = response.data.message;
                var successPopup = $ionicPopup.show({
                    templateUrl: 'views/common/erorr.html',
                    title: 'info',
                    scope: $scope,
                    buttons: [
                    { text: 'Ok' }
                    ]
                });

                $timeout(function() { 
                    successPopup.close();
                }, 10000);
                    
                   window.localStorage.clear();
                    AuthService.loginUser({userno:$scope.user.phoneno,password:$scope.user.password})
                    .then(function(response){
                    console.log(response);
                    $ionicLoading.hide();
                    AuthService.setLoginUserIdToken(response.data.id);
                    AuthService.setMerchantDbToken(response.data.merchantDb);
                    AuthService.setSerialNoToken(response.data.serialNo);
                    console.log(response.data);
                    console.log(AuthService.getSerialNoToken());
                    $ionicHistory.clearCache().then(function(){ $state.go('app.listing',{},{reload:true})})

                },error);
                   // $state.go("login");
            
            //var login = 
                }
            }
            $scope.register =function(){
                console.log();
                $ionicLoading.show({
                    templateUrl:"views/common/wait.html"
                });
                AuthService.registerApplicant({firstname: $scope.user.firstname, lastname: $scope.user.lastname,phoneno: $scope.user.phoneno,email: $scope.user.email, password: $scope.user.password,merchantId: Constants.API.merchantIDToken})
                .then(success,error);
            }

        }])

.controller("LinegraphCtrl", ['AuthService','GraphService','$scope','$ionicLoading',
    'InternetMonitor','localStorageService',
    function(AuthService,GraphService,$scope,$ionicLoading,InternetMonitor,localStorageService){
       




        $scope.labels = ["03 Dec", "04 Dec", "05 Dec",
            "06 Dec", "07 Dec","08 Dec", "09 Dec", "10 Dec","11 Dec", "12 Dec", "13 Dec", "14 Dec", "15 Dec","16 Dec"];
        $scope.series = ['Accruals', 'Redemption'];
        $scope.colours= [{
            fillColor: 'rgba(47, 132, 71, 0.8)',
            strokeColor: 'rgba(47, 132, 71, 0.8)',
            highlightFill: 'rgba(47, 132, 71, 0.8)',
            highlightStroke: 'rgba(47, 132, 71, 0.8)'
        }];
        $scope.data = [
            [65, 0, 80, 81, 56, 55, 40,35,67,78,33,24,12,45],
            [28, 48, 40, 19, 86, 27, 90,55,23,52,78,23,21,102]
        ];
//console.log($scope.data);
}])
.controller("VoucherDataController", ['VoucherDataService','AuthService','GraphService','$scope','$ionicLoading',
    'InternetMonitor','localStorageService','$ionicPopup',
    function(VoucherDataService,AuthService,GraphService,$scope,$ionicLoading,InternetMonitor,localStorageService,$ionicPopup){
       
        $scope.voucherData = [];
        //$scope.Holder =  $stateParams.submerchantName;

       var error = function(error){
            $ionicLoading.hide();

            $scope.error = error == null ? error.data.statusText  : 'The internet is disconnected on your device.' ;
            $scope.title = error == null ? "Invalid Login" : 'Internet Disconnected';
            var errorPopup = $ionicPopup.show({
                templateUrl: 'views/common/erorr.html',
                title: $scope.title,
                scope: $scope,
                buttons: [
                { text: 'Ok' }
                ]
            });


            $timeout(function() {
                    errorPopup.close(); //close the popup after 3 seconds for some reason
                }, 1000);
        }


            var success = function(response){
                $ionicLoading.hide();
               // $scope.balances=response.data;
                $scope.voucherData=response.data.voucher;
                //localStorageService.remove('user_voucher');
                //localStorageService.set('user_voucher',JSON.stringify(response.data));
                console.log($scope.voucherData);

            }

   function getMeData(){
     VoucherDataService.getVoucherData({dbname:AuthService.getMerchantDbToken(), serialnum:AuthService.getSerialNoToken()}).then(success,error);
             
      }

            setInterval(function() {
                getMeData();
            }, 4000
            );
           
      
           // if(InternetMonitor.isOnline()){
                VoucherDataService.getVoucherData({dbname:AuthService.getMerchantDbToken(), serialnum:AuthService.getSerialNoToken()}).then(success,error);
               
           // }else{
               
           // }
       console.log($scope.voucherData);
//console.log($scope.data);
}])  

.controller('ProfileController', ['AuthService','$scope','$ionicLoading',
    '$timeout','$ionicPopup','$ionicModal','$ionicPlatform','InternetMonitor','localStorageService',
     '$timeout', 'ionicMaterialMotion', 'ionicMaterialInk',
    function(AuthService,$scope,$ionicLoading,$timeout,$ionicPopup,
        $ionicModal,$ionicPlatform,InternetMonitor,localStorageService,
         $timeout, ionicMaterialMotion, ionicMaterialInk){
  
         
        $scope.user={};
        var error = function(error){
            $ionicLoading.hide();

                if(localStorageService.get('user_profile') !==undefined){
                    $scope.user = JSON.parse(localStorageService.get('user_profile'));

                }
                else{
                      $state.go('login');
                }
               // $scope.user = JSON.parse(localStorageService.get('user_profile'));
                    console.log($scope.user);
            //End error Function
                }

            var loadsuccess = function(response){

                    $scope.user = response.data.user;
                   
              console.log('ProfileData',$scope.user);
                    if(localStorageService.get('user_profile') !== undefined){
                        localStorageService.remove('user_profile');
                    localStorageService.set('user_profile',JSON.stringify(response.data.user));
                    }
                    

                
            };//load Success function

            var updatesuccess = function(response){
                $ionicLoading.hide();
                if(response.data.error==true){
                    $scope.error = response.data.message;

                    var errorPopup = $ionicPopup.show({
                        templateUrl: 'views/common/erorr.html',
                        title: 'Error',
                        scope: $scope,
                        buttons: [
                        { text: 'Ok' }
                        ]
                    });
                    $timeout(function() {errorPopup.close();}, 4000);

                }

                else{

                    $scope.successmsg = "Your profile has been updated";

                    var successPopup = $ionicPopup.show({
                        templateUrl: 'views/common/success.html',
                        title: 'Information',
                        scope: $scope,
                        buttons: [
                        { text: 'Ok' }
                        ]
                    });
                    $timeout(function() {successPopup.close();}, 4000);
                }

            };

                AuthService.getUserProfile(AuthService.getLoggedInUserToken()).then(loadsuccess,error);
                 
               

            $scope.updateProfile =function(){
                var userPhone;
                var intialPhone = $scope.user.phone;
                if(intialPhone==undefined){
                    userPhone = " ";
                }else{
                    userPhone = intialPhone;
                }

                var sk = $scope.user.skill;
                var skill;

                if(sk==undefined){
                    skill = '';
                }else{
                    skill = sk;
                }
                var address;
                var Initialstreet = $scope.user.street1;
                if(Initialstreet==undefined){
                    address = " ";
                }else{
                    address = Initialstreet;
                }

                var ski = $scope.user.userId;
                var initialUID;

                if(ski==undefined){
                    initialUID = '';
                }else{
                    initialUID = ski;
                }

                AuthService.updateUserProfile({firstname: $scope.user.firstname,
                    othername: $scope.user.othername,
                    lastname: $scope.user.lastname,
                    UserId:initialUID,
                    id: AuthService.getLoggedInUserToken(),
                    address:address}).then(updatesuccess,error);
            } //End updateprofile Function

 }])