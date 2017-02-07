var handler = {};

handler.checkNotificationCompatibility = function(callback){
	if (!("Notification" in window)) {
    return false;
  }
  else{
    callback();
  }

}

handler.requestPermission = function(){
	Notification.requestPermission().then(function(result) {
  		if (result == 'granted') {
        handler.dispatchNotification('Skrill Chat Notification', 'Thank you for allowing Notification.')
      }
	});
}

handler.dispatchNotification = function(title,body){
	var options = {
      body: body,
  }
  var trigger = new Notification(title,options);
  setTimeout(trigger.close.bind(trigger), 4000);
}

