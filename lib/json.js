//Import dependencies
var file = require('./file.js');

//Create a new json file manager
module.exports = function(path, opt)
{
  //Check the options
  if(typeof opt !== 'object'){ var opt = {}; }

  //Add the read parser
  opt.parse_read = function(data){ return JSON.parse(data); };

  //Add the write parser
  opt.parse_write = function(data){ return JSON.stringify(data, null, '  '); };

  //Get the new file manager
  var json = new file(path, opt);

  //Return the new json object
  return json;
};
