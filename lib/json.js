//Import libs
var file = require('./file.js');

//Create a new json file manager
var jsonFile = function(obj, opt)
{
  //Check the options
  if(typeof opt !== 'object'){ opt = {}; }
  
  //Call the file constructor
  file.call(this, obj, { cwd: opt.cwd, encoding: opt.encoding });

  //Check the parse read function
  if(typeof opt.reader !== 'function'){ opt.reader = function(d){ return d; }; }

  //Check the parse write function
  if(typeof opt.writer !== 'function'){ opt.writer = function(d){ return d; }; }

  //Add the read parser
  this._reader = function(data)
  {
    //Return the parsed data
    return opt.reader(JSON.parse(data));
  };

  //Add the write parser
  this._writer = function(data)
  {
    //Return the data in string version
    return JSON.stringify(opt.writer(data), null, '  ');
  };

  //Return the new json object
  return this;
};

//Extend the prototype
jsonFile.prototype = Object.create(file.prototype, {});

//Add the assign function
jsonFile.prototype.assign = function(obj, cb)
{
  //Save this
  var self = this;

  //Read the json file
  return self.read(function(error, data)
  {
    //Check the error
    if(error){ return cb(error, null); }

    //Merge the two objects
    data = Object.assign(data, obj);

    //Write the json file again
    return self.write(data, function(error)
    {
      //Call the callback with the error and the new data object
      return cb(error, data);
    });
  });
};

//Exports the json manager
module.exports = jsonFile;
