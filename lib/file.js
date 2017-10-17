//Import dependencies
var fs = require('fs');
var path = require('path');
var utily = require('utily');

//File manager object
var file = function(obj, opt)
{
  //Check the options
  if(typeof opt !== 'object'){ opt = {}; }

  //Check the object type
  if(typeof obj === 'string'){ obj = path.parse(obj); }

  //Check for no object
  if(typeof obj !== 'object')
  {
    //Throw a new error -> invalid path
    throw new Error('Invalid file path. Expected object or string');
  }

  //Save the file path
  this.path = path.resolve(process.cwd(), path.format(obj));

  //Save the file directory
  this.dirname = path.dirname(this.path);

  //Save the extension name
  this.extname = path.extname(this.path);

  //Save the file name
  this.basename = path.basename(this.path);

  //Default encoding
  this.encoding = (typeof opt.encoding === 'string') ? opt.encoding : 'utf8';

  //Save the reader function
  this._reader = (typeof opt.reader === 'function') ? opt.reader : null;

  //Save the writer function
  this._writer = (typeof opt.writer === 'function') ? opt.writer : null;

  //Return this
  return this;
};

//Check if file exists
file.prototype.exists = function(cb)
{
  //Check if the file exists
  return utily.fs.isFile(this.path, cb);
};

//Get the file content
file.prototype.read = function(cb)
{
  //Save this
  var self = this;

  //Read the file
  return fs.readFile(this.path, this.encoding, function(error, data)
  {
    //Check for error
    if(error){ return cb(error); }

    //Parse the data
    if(self._reader){ data = self._reader(data); }

    //Do the callback with the data
    return cb(null, data);
  });
};

//Create a read stream of the object
file.prototype.readStream = function(opt)
{
  //Check the options
  if(typeof opt !== 'object'){ opt = {}; }

  //Extend the options
  opt = Object.assign(opt, { defaultEncoding: this.encoding });

  //Get the stream and return
  return fs.createReadStream(this.path, opt);
};

//Write content to the file
file.prototype.write = function(data, cb)
{
  //Check the to string function
  if(this._writer){ data = this._writer(data); }

  //Write the file
  return fs.writeFile(this.path, data, this.encoding, cb);
};

//Create a write stream
file.prototype.writeStream = function(opt)
{
  //Check the options
  if(typeof opt !== 'object'){ opt = {}; }

  //Extend the options
  opt = Object.assign(opt, { defaultEncoding: this.encoding });

  //Get the stream and return
  return fs.createWriteStream(this.path, opt);
};

//Empty the file
file.prototype.empty = function(cb)
{
  //Empty the file
  return fs.writeFile(this.path, '', this.encoding, cb);
};

//Append to the file
file.prototype.append = function(data, cb)
{
  //Append to the file
  return fs.appendFile(this.path, data, this.encoding, cb);
};

//Update the file content
file.prototype.update = function(fn, cb)
{
  //Save this
  var self = this;

  //Read the file content
  return this.read(function(error, data)
  {
    //Check for error
    if(error){ return cb(error); }

    //Update the cata content
    data = fn(data);

    //Check for undefined data
    if(typeof data === 'undefined'){ return cb(null); }

    //Write the data and continue
    return self.write(data, cb);
  });
};

//Delete the file
file.prototype.unlink = function(cb)
{
  //Delete the file
  return utily.fs.unlink(this.path, cb);
};

//Unlink alias
file.prototype.delete = function(cb){ return this.unlink(cb); };

//Exports to node
module.exports = file;
