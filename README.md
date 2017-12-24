# floby

[![npm](https://img.shields.io/npm/v/floby.svg?style=flat-square)](https://www.npmjs.com/package/floby)
[![npm](https://img.shields.io/npm/dt/floby.svg?style=flat-square)](https://www.npmjs.com/package/floby)
[![npm](https://img.shields.io/npm/l/floby.svg?style=flat-square)](https://github.com/jmjuanes/floby)

> A class to work and manage files

## Installation

```
npm install --save floby
```

## API

Initialize **floby** on your project:

```javascript
var floby = require('floby');
```

### file = new floby(path, [ options])

Create a new file manager object to manage a file. This method accepts the following arguments:

- `path`: a string or a [`pathObject`](https://nodejs.org/api/path.html#path_path_format_pathobject) with the path to the file.
- `options`: an object with the following optative options:
  - `encoding`: a string with the file encoding. Default is `utf8`.
  - `reader`: a function that will parse the data after reading the file by the `read` method.
  - `writer`: a function that will parse the data before writing the file by the `write` method.

Example with a path string: 

```javascript
var file = new floby('/path/to/my/file.txt', { encoding: 'utf8' });
```

Same example with a `pathObject`: 

```javascript
var file = new floby({ dir: '/path/to/my', base: 'file.txt' }, { encoding: 'utf8' });
```

### file.exists(cb)

Check if the file exists. This method will execute the provided callback `cb` method with an `error` object if something went wrong, and an `exists` boolean that indicates if the file exists or not.

```javascript
file.exists(function(error, exists)
{
  //Check the error 
  if(error){ /* do something with the error */ } 
  
  //Check if the file exists 
  if(exists === true)
  {
    //Do your magic...
  }
});
```

### file.mkdir(cb)

Creates the parent directory of the file. The callback method will be executed with an `error` object if something went wrong.

```javascript
file.mkdir(function(error)
{
  //Check the error 
  if(error){ /* something went wrong */ } 
  
  //Parent folder created!
});
```

### file.read(cb)

Read the file content and emit the `cb` function with the same arguments as the [fs.readFile](https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback) function.

```javascript
file.read(function(error, data)
{
  //Check for error
  if(error){ /* print the error */ }

  //Do some stuff with your data
  //...
});
```

### file.unlink(cb)

Remove the file and execute the provided callback method with an `error` object if something went wrong. 

```javascript
file.unlink(function(error)
{
  //Check the error object 
  if(error){ /* something went wrong */ } 
  
});
```

### file.write(data, cb)

Write the `data` to the file, and emit the `cb` function with the same arguments as the [fs.writeFile](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) function.

If a `parse_write` function is provided on the options, the `data` will be parsed with this function and then saved to the file.

```javascript
file.write(data, function(error)
{
  //Check for error
  if(error){ /* print the error */ }

  //Continue
  //...
});
```

### var jsonFile = new floby.json(path [, options])

Create a new JSON file manager. It uses the `JSON.parse` and `JSON.stringify` methods to decode and encode the file content.

### var iniFile = new floby.ini(path [, options])

Create a new INI file manager. It uses the [`ini`](https://www.npmjs.com/package/ini) package to encode and decode the file content.


## License

[MIT LICENSE](./LICENSE) &copy; Josemi Juanes.
