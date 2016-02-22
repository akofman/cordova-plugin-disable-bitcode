#!/usr/bin/env node

/*
* Disable bitcode for iOS 9 projects.
*/

var fs = require('fs');
var xcode = require('xcode');
var path = require('path');

module.exports = function(context) {
  var projectName, projectPath, xcodeProj;
  var projectRoot = context.opts.projectRoot;

  projectName = getConfigParser(context, path.join(projectRoot, 'config.xml')).name();
  pbxPath = path.join(projectRoot, 'platforms', 'ios', projectName + '.xcodeproj/project.pbxproj');
  xcodeProj = xcode.project(pbxPath);

  //We need to use parseSync because async causes problems when other plugins
  //are handling pbxproj file.
  xcodeProj.parseSync();
  xcodeProj.updateBuildProperty('ENABLE_BITCODE', 'NO');
  fs.writeFileSync(pbxPath, xcodeProj.writeSync());
};

function getConfigParser(context, config){
  var semver = context.requireCordovaModule('semver');

  if(semver.lt(context.opts.cordova.version, '5.4.0')) {
    ConfigParser = context.requireCordovaModule('cordova-lib/src/ConfigParser/ConfigParser');
  } else {
    ConfigParser = context.requireCordovaModule('cordova-common/src/ConfigParser/ConfigParser');
  }

  return new ConfigParser(config);
}
