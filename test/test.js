//Import dependencies
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var floby = require('../index.js');

describe('floby', function()
{
  describe('constructor', function()
  {
    it('should parse a string path', function(done)
    {
      var file_path = '/path/to/the/file.txt';
      var file = new floby(file_path);
      assert.equal(file.path, file_path);
      assert.equal(file.basename, path.basename(file_path));
      assert.equal(file.dirname, path.dirname(file_path));
      done();
    });

    it('should parse an object path', function(done)
    {
      var file_obj = { dir: '/path/to/the', base: 'file.txt' };
      var file = new floby(file_obj);
      assert.equal(file.path, path.format(file_obj));
      assert.equal(file.dirname, file_obj.dir);
      assert.equal(file.basename, file_obj.base);
      done();
    });
  });

  describe('exists', function()
  {
    it('should return true if file exists', function(done)
    {
      var file_path = path.join(__dirname, '/floby-exists.txt');
      fs.writeFileSync(file_path, 'File content', 'utf8');
      var file = new floby(file_path);
      file.exists(function(error, exists)
      {
        assert.equal(error, null);
        assert.equal(exists, true);
        done();
      });
    });

    it('should return false if file does not exists', function(done)
    {
      var file_path = path.join(__dirname, '/floby-not-exists.txt');
      var file = new floby(file_path);
      file.exists(function(error, exists)
      {
        assert.equal(error, null);
        assert.equal(exists, false);
        done();
      });
    });
  });

  describe('read', function()
  {
    it('should return the file content', function(done)
    {
      var file_path = path.join(__dirname, './floby-read.txt');
      var file_content = 'File content';
      fs.writeFileSync(file_path, file_content, 'utf8');
      var file = new floby(file_path);
      file.read(function(error, content)
      {
        assert.equal(error, null);
        assert.equal(content, file_content);
        done();
      });
    });

    it('should return error if file does not exists', function(done)
    {
      var file_path = path.join(__dirname, './floby-read-not-exists.txt');
      var file = new floby(file_path);
      file.read(function(error, content)
      {
        assert.notEqual(error, null);
        assert.equal(error.code, 'ENOENT');
        done();
      });
    });
  });
});