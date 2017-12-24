//Import libs
var file = require('./file.js');
var ini = require('ini');

//Create a new ini file manager
var iniFile = function(obj, opt)
{
  //Check the options
  if(typeof opt !== 'object'){ opt = {}; }

  //Call the file constructor
  file.call(this, obj, { cwd: opt.cwd, encoding: opt.encoding });

  //Check the parse read function
  if(typeof opt.reader !== 'function'){ opt.reader = function(d){ return d; }; }

  //Check the parse write function
  if(typeof opt.writer !== 'function'){ opt.writer = function(d){ return d; }; }

  //Parse the whitespace option
  opt.whiteSpace = (typeof opt.whiteSpace === 'boolean') ? opt.whiteSpace : false;

  //Add the read parser
  this._reader = function(data)
  {
    //Return the parsed data
    return opt.reader(ini.decode(data));
  };

  //Add the write parser
  this._writer = function(data)
  {
    //Encode the data object
    var out = ini.encode(data, { whitespace: opt.whiteSpace });

    //Return the parsed ini content
    return opt.writer(out);
  };

  //Return the new json object
  return this;
};

//Extend the prototype
iniFile.prototype = Object.create(file.prototype, {});

//Export the ini manager
module.exports = iniFile;