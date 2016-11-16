angular.module('avanteApp')

.service('Constants', [function(){

	var _API ={
		//baseUrl:"http://127.0.0.1/loyaluserscript/api/",
		/*baseUrl:"http://www.moloyal.com/loyaluserscript/api/",

		userIdToken : "AppToken",
        merchantDbToken : "DbToken",
        serialNoToken : "SerialNoToken",
        imgurl:"http://www.moloyal.com/loyaltyadmin/ban_imgs/",
        merchantIDToken : "2015"*/
		//baseUrl:"http://127.0.0.1/loyaluserscript/api/",
		baseUrl:"http://www.avantesoft.com/loyaluserscript/api/",

		userIdToken : "AppToken",
        merchantDbToken : "DbToken",
        serialNoToken : "SerialNoToken",
        imgurl:"http://www.avantesoft.com/loyaltyadmin/ban_imgs/",
        merchantIDToken : "2015"

	}

	var constants={
		API :_API
	};

	return constants;
	
}])