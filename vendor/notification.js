var handler = {};

handler.checkNotificationCompatibility = function(){
	if (!("Notification" in window)) {
    return false;
  }
}

handler.requestPermission = function(){
	NotificatNotification.requestPermission().then(function(result) {
  		console.log(result);
	});
}

handler.dispatchNotification = function(title,body){
	var options = {
      body: body,
  }
  var trigger = new Notification(title,options);
  setTimeout(trigger.close.bind(n), 4000);
}

module.exports = handler;

