#!/usr/bin/env node

/*
* Disable bitcode for iOS 9 projects.
*/

var xcode = require('xcode');
var fs = require('fs');
var cordova = require('cordova');
var projectName = new cordova.cordova_lib.configparser(cordova.findProjectRoot() + '/config.xml').name();
var projectPath = './platforms/ios/' + projectName + '.xcodeproj/project.pbxproj';

module.exports = function() {
  var myProj = xcode.project(projectPath);

  //We need to use parseSync because async causes problems when other plugins
  //are handling pbxproj file.
  myProj.parseSync();
  myProj.updateBuildProperty('ENABLE_BITCODE', 'NO');
  fs.writeFileSync(projectPath, myProj.writeSync());
  console.log('✔ BITCODE disable');
};
