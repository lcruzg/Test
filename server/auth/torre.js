var request = require('request');
var obj;


exports.getProfile = function(profileId, callback) {
 
  const education = {  
    url: 'https://torre.bio/api/bios/'+profileId+'/education',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'my-reddit-client'
    }
  };
  
  const achievement = {  
    url: 'https://torre.bio/api/bios/'+profileId+'/achievements',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'my-reddit-client'
    }
  };

  request(achievement, function(err, res, body) { 
	if (!err && res.statusCode == 200) {
	  result = JSON.parse(body);
	  return callback(null, result);
	} else {
	  return callback(error, null);
	}
  });  
}