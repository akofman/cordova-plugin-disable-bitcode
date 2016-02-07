#!/usr/bin/env node

/*
* Disable bitcode for iOS 9 projects.
*/

var fs = require('fs');
var xcode = require('xcode');
var cmp = require('semver-compare');

module.exports = function(context) {
  var projectName, projectPath, myProj, ConfigParser;
  var projectRoot = context.opts.projectRoot;

  if(cmp(context.opts.cordova.version, '5.4.0') >= 0) {
    ConfigParser = context.requireCordovaModule('cordova-common/src/ConfigParser/ConfigParser');
  } else {
    ConfigParser = context.requireCordovaModule('cordova-lib/src/ConfigParser/ConfigParser');
  }

  projectName = new ConfigParser(projectRoot + '/config.xml').name();
  projectPath = projectRoot + '/platforms/ios/' + projectName + '.xcodeproj/project.pbxproj';
  myProj = xcode.project(projectPath);

  //We need to use parseSync because async causes problems when other plugins
  //are handling pbxproj file.
  myProj.parseSync();
  myProj.updateBuildProperty('ENABLE_BITCODE', 'NO');
  fs.writeFileSync(projectPath, myProj.writeSync());
  console.log('✔ BITCODE disable');
};
