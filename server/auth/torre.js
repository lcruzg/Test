var request = require('request');
var obj;


exports.getProfile = function(profileId) {
 
  const options = {  
    url: 'https://torre.bio/api/bios/'+profileId+'/education',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'my-reddit-client'
    }
  };

  request(options, function(err, res, body) {  
    let json = JSON.parse(body);
	obj = json;
  }); 

  return obj;
}