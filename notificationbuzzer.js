/* A user access token with manage_notifications permission is needed */




var fbtoken=process.env.FB_ACCESS_TOKEN;
var spark_core_id=process.env.SPARK_CORE_ID;
var spark_access_token=process.env.SPARK_ACCESS_TOKEN;

var FB=require('FB');
FB.setAccessToken(fbtoken);
var unixtime = Math.round((new Date()).getTime()/1000);
var request=require('request');

/*setInterval Method calls FB api after every 2 seconds to see if there is a new notification */
setInterval(function() {
		FB.api('/me/notifications','get',{since: unixtime}, function (res) {
  			if(!res || res.error ) {
   				console.log(res.error);
  			}
  			else {
  				if (res.data.length>0) {
  					unixtime = Math.round((new Date()).getTime()/1000);
  					console.log("There is a notification");
  					var url='https://api.spark.io/v1/devices/'+spark_core_id+'/poke?access_token='+spark_access_token;
  					request.post(url, function (err, res,body) {
  						if (!err && res.statusCode == 200) {
  							console.log("Post request successful");
  						}
  						else {
        					console.log('error: '+ res.statusCode);
        					console.log(body);
  						}
  					});
  				}
			}
		});

},2000); 