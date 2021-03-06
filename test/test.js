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

  describe('write', function()
  {
    it('should write the file', function(done)
    {
      var file_path = path.join(__dirname, './floby-write.txt');
      var file_content = 'File content';
      var file = new floby(file_path);
      file.write(file_content, function(error)
      {
        assert.equal(error, null);
        assert.equal(file_content, fs.readFileSync(file_path, 'utf8'));
        done();
      });
    });
  });

  describe('unlink', function()
  {
    it('should remove the file', function(done)
    {
      var file_path = path.join(__dirname, './floby-unlink-1.txt');
      fs.writeFileSync(file_path, 'Hello', 'utf8');
      var file = new floby(file_path);
      assert.equal(fs.existsSync(file.path), true);
      file.unlink(function(error)
      {
        assert.equal(error, null);
        assert.equal(fs.existsSync(file.path), false);
        done();
      });
    });

    it('should not throw an error if file does not exists', function(done)
    {
      var file_path = path.join(__dirname, './floby-unlink-2.txt');
      var file = new floby(file_path);
      assert.equal(fs.existsSync(file.path), false);
      file.unlink(function(error)
      {
        assert.equal(error, null);
        assert.equal(fs.existsSync(file.path), false);
        done();
      });
    });
  });

  describe('mkdir', function()
  {
    it('should create the parent directory', function(done)
    {
      var file_path = path.join(__dirname, './floby-mkdir-1/file.txt');
      var file = new floby(file_path);
      //assert.equal(fs.existsSync(file.path), false);
      //assert.equal(fs.existsSync(file.dirname), false);
      file.mkdir(function(error)
      {
        assert.equal(error, null);
        assert.equal(fs.existsSync(file.dirname), true);
        done();
      });
    });
  });
});