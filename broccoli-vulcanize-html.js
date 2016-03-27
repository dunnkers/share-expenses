/* global require, module */
var Writer = require('broccoli-writer');
var RSVP = require('rsvp');
var VulcanizeHTML = require('vulcanize');

var path = require('path');
var mkdirp = require('mkdirp');
var clone = require('clone');
var fs = require('fs');

module.exports = Vulcanize;
Vulcanize.prototype = Object.create(Writer.prototype);
Vulcanize.prototype.constructor = Vulcanize;

function Vulcanize(inputTree, options) {
  if (!(this instanceof Vulcanize)) {
    return new Vulcanize(inputTree, options);
  }

  // Clone the options otherwise any alterations after this writer is called
  // will be picked up.
  this.options = clone(options) || {};
  this.inputTree = inputTree;
  this.outputFilepath = options.output || path.basename(options.input);
}

Vulcanize.prototype.vulcanize = function(options) {
  return new RSVP.Promise(function(resolve, reject) {
    mkdirp(path.dirname(options.output), function(error) {
      if (error) {
        reject(error);
      }

      var vulcanizeInstance = new VulcanizeHTML(options);

      vulcanizeInstance.process(options.input, function(error, html) {
        if (error) {
          reject(error);
        }

        fs.writeFileSync(options.output, html);
        resolve();
      });
    });
  });
};

Vulcanize.prototype.write = function(readTree, destDir) {
  // We have to clone options again as vulcanize changes the hash which causes
  // the hash grow when called repeatedly.
  var options = clone(this.options);
  options.output = path.join(destDir, this.outputFilepath);

  return readTree(this.inputTree).then(function(srcPath) {
    options.input = path.join(srcPath, options.input);

    return this.vulcanize(options);
  }.bind(this));
};
