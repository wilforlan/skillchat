/** Init store variable as global **/
var store = window.sessionStorage;

/** Check if browser supports localStorage **/
var checkStorageSupport = function(){
	if (typeof(Storage) !== "undefined") {
	    return true;
	} 
	else {
	    return false;
	}

}

var checkAccess = function () {
	if (!checkLoggedState()) {
		window.location.replace('/');
	}
}

var updateGlobalVars = function (){
	var username = store.getItem('SkrillChatUsername');
	window.document.getElementById('username').innerHTML = username;
	window.document.getElementById('current_date').innerHTML = (new Date);

}
/** Check if a user is logged in **/
var checkLoggedState = function(){
	if(store.getItem("SkrillChatLoggedState")){
		return true
	}
	else {
		return false;
	}
}

var logOut = function(){
	store.removeItem('SkrillChatLoggedState');
	store.removeItem('SkrillChatUsername');
	window.location.replace("/");
}

var login = function(){
	var username = window.document.getElementById("login__username").value;
	if (typeof(username) == 'undefined') {
		return {
			status: false,
			message: 'Username is mandatory'
		}
	}
	else {
		store.setItem('SkrillChatLoggedState', 1);
		store.setItem('SkrillChatUsername', username);
		window.location.replace("/chat.html");
	}
}

var verifyFirstInputSpace = function(val){

}
