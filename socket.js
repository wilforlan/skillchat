var conn = new WebSocket('ws://localhost:8080');
var store = window.sessionStorage;

$(document).ready(function(){

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}
  (function(){
    conn.onopen = function(e) {
      document.getElementById('welcome').innerHTML = "Connection established!"
    };
    conn.onmessage = function(e){
      var rawOutput = e.data.split("%s");
      var username = store.getItem('SkrillChatUsername');
      var el_class = 'other';
      var avatar = "<img src='http://i.imgur.com/DY6gND0.png' draggable='false'/>"
      var time = timeSince(new Date);
      if (username != rawOutput[1]) {
        el_class = "self";
        avatar = "<img src='http://i.imgur.com/HYcn9xO.png' draggable='false'/>"
        var title = 'New message from:'+rawOutput[1];
        handler.dispatchNotification(title, rawOutput[0]);
      }
      $(".chat").append( "<li class='"+el_class+"'><div class='avatar'>"+avatar+"</div><div class='msg'><p><b>"+rawOutput[1]+"</b></p><p>"+rawOutput[0]+'</p><time>'+time+'</time></div></li>' );
      document.getElementById('chatlogs').lastChild.scrollIntoView(false);
      // var elem = document.getElementById('chatlogs');
      
    };

  })();

  var el = document.getElementById('messagebox');
    if(el){
      el.addEventListener('keypress', function(e){
        var code = (e.keyCode ? e.keyCode : e.which);
          if (code == 13) {
              var username = store.getItem('SkrillChatUsername');
              var message = el.value.trim();
              if (message.length) {
                conn.send([message+'%s'+username]);
              }
              el.value = ''; 
              var logs = document.getElementById('chatlogs');
              logs.scrollTop = logs.clientHeight;
        }
    })
  }    
})
