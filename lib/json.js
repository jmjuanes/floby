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

  //Add the assign function
  json.assign = function(obj, cb)
  {
    //Save this
    var self = this;

    //Read the json file
    return self.read(function(error, data)
    {
      //Check the error
      if(error){ return cb(error); }

      //Merge the two objects
      data = Object.assign(data, obj);

      //Write the json file again
      return self.write(data, function(error)
      {
        //Check the error
        if(error){ return cb(error); }

        //Do the callback with the new data object
        return cb(null, data);
      });
    });
  };

  //Add the assign sync function
  json.assignSync = function(obj)
  {
    //Get the json content
    var data = this.readSync();

    //Merge the two objects
    data = Object.assign(data, obj);

    //Write the new data
    this.writeSync(data);

    //Return the new data object
    return data;
  };

  //Return the new json object
  return json;
};
