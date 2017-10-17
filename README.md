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
  - `reader`: a function that will parse the data after reading the file by the `read` and `readSync` methods.
  - `writer`: a function that will parse the data before writing the file by the `write` and `writeSync` methods.

Example with a path string: 

```javascript
var file = new floby('/path/to/my/file.txt', { encoding: 'utf8' });
```

Same example with a `pathObject`: 

```javascript
var file = new floby({ dir: '/path/to/my', base: 'file.txt' }, { encoding: 'utf8' });
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

## License

[MIT LICENSE](./LICENSE) &copy; Josemi Juanes.
