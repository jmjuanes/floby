//Import dependencies
var fs = require('fs');
var path = require('path');
var pstat = require('pstat');

//File manager object
var file = function(p, opt)
{
  //Check the options
  if(typeof opt !== 'object'){ var opt = {}; }

  //Save the currect working directory
  this._cwd = (typeof opt.cwd === 'string') ? opt.cwd : process.cwd();

  //Save the file path
  this._path = path.resolve(this._cwd, p);

  //Default encoding
  this._encoding = (typeof opt.encoding === 'string') ? opt.encoding : 'utf8';

  //Save the parse_read function
  this._parse_read = (typeof opt.parse_read === 'function') ? opt.parse_read : null;

  //Save the parse_write function
  this._parse_write = (typeof opt.parse_write === 'function') ? opt.parse_write : null;

  //Return this
  return this;
};

//Get the encoding
file.prototype.encoding = function(){ return this._encoding; };

//Get the file path
file.prototype.path = function(){ return this._path; };

//Get the file name
file.prototype.name = function(){ return path.parse(this._path).name; };

//Get the file extension
file.prototype.ext = function(){ return path.extname(this._path); };

//Get the file base name
file.prototype.basename = function(){ return path.basename(this._path); };

//Get the directory name
file.prototype.dirname = function(){ return path.dirname(this._path); };

//Check if file exists
file.prototype.exists = function(cb){ return pstat.isFile(this._path, cb); };

//Check if file exists sync
file.prototype.existsSync = function(){ return pstat.isfileSync(this._path); };

//Get the file content
file.prototype.read = function(cb)
{
  //Save this
  var self = this;

  //Read the file
  return fs.readFile(this._path, this._encoding, function(error, data)
  {
    //Check for error
    if(error){ return cb(error); }

    //Parse the data
    if(self._parse_read){ data = self._parse_read(data); }

    //Do the callback with the data
    return cb(null, data);
  });
};

//Read the file sync
file.prototype.readSync = function()
{
  //Get the file content
  var data = fs.readFileSync(this._path, this._encoding);

  //Parse the data
  if(this._parse_read){ data = this._parse_read(data); }

  //Return the data
  return data;
};

//Write content to the file
file.prototype.write = function(data, cb)
{
  //Check the to string function
  if(this._parse_write){ data = this._parse_write(data); }

  //Write the file
  return fs.writeFile(this._path, data, this._encoding, cb);
};

//Write content to the file sync
file.prototype.writeSync = function(data)
{
  //Check the to string function
  if(this._parse_write){ data = this._parse_write(data); }

  //Write the file
  fs.writeFileSync(this._path, data, this._encoding);

  //Return this
  return this;
};

//Empty the file
file.prototype.empty = function(cb)
{
  //Empty the file
  return fs.writeFile(this._path, '', this._encoding, cb);
};

//Empty the file sync
file.prototype.emptySync = function()
{
  //Empty the file
  fs.writeFileSync(this._path, '', this._encoding);

  //Continue
  return this;
};

//Append to the file
file.prototype.append = function(data, cb)
{
  //Append to the file
  return fs.appendFile(this._path, data, this._encoding, cb);
};

//Append data to the file sync
file.prototype.appendSync = function(data)
{
  //Append data to the file
  fs.appendFileSync(this._path, data, this._encoding);

  //Continue
  return this;
};

//Delete the file
file.prototype.unlink = function(cb)
{
  return fs.unlink(this._path, cb);
};

//Unlink alias
file.prototype.delete = function(cb){ return this.unlink(cb); };

//Unlink the file sync
file.prototype.unlinkSync = function()
{
  //Delete the file
  fs.unlinkSync(this._path);

  //Continue
  return this;
};

//Unlink Sync alias
file.prototype.deleteSync = function(){ return this.unlinkSync(); };

//Exports to node
module.exports = file;
