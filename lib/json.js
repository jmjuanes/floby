//Import dependencies
var file = require('./file.js');

//Create a new json file manager
var json = function(path, opt)
{
  //Check the options
  if(typeof opt !== 'object'){ var opt = {}; }
  
  //Call the file constructore
  file.call(this, path, { cwd: opt.cwd, encoding: opt.encoding });

  //Check the parse read function
  if(typeof opt.parse_read !== 'function'){ opt.parse_read = function(d){ return d; }; }

  //Check the parse write function
  if(typeof opt.parse_write !== 'function'){ opt.parse_write = function(d){ return d; }; }

  //Add the read parser
  this._parse_read = function(data)
  {
    //Return the parsed data
    return opt.parse_read(JSON.parse(data));
  };

  //Add the write parser
  this._parse_write = function(data)
  {
    //Return the data in string version
    return JSON.stringify(opt.parse_write(data), null, '  ');
  };

  //Return the new json object
  return this;
};

//Extend the prototype
json.prototype = Object.create(file.prototype, {});

//Add the assign function
json.prototype.assign = function(obj, cb)
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
json.prototype.assignSync = function(obj)
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

//Exports the json manager
module.exports = json;
