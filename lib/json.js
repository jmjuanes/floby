//Import dependencies
var file = require('./file.js');

//Create a new json file manager
module.exports = function(path, opt)
{
  //Check the options
  if(typeof opt !== 'object'){ var opt = {}; }

  //Check the parse read function
  if(typeof opt.parse_read !== 'function'){ opt.parse_read = function(d){ return d; }; }

  //Check the parse write function
  if(typeof opt.parse_write !== 'function'){ opt.parse_write = function(d){ return d; }; }

  //Get the new options
  var opt_new = Object.assign({}, opt);

  //Add the read parser
  opt_new.parse_read = function(data)
  {
    //Return the parsed data
    return opt.parse_read(JSON.parse(data));
  };

  //Add the write parser
  opt_new.parse_write = function(data)
  {
    //Return the data in string version
    return JSON.stringify(opt.parse_write(data), null, '  ');
  };

  //Get the new file manager
  var json = new file(path, opt_new);

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
