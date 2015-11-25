#!/usr/bin/env node

/*
 * Disable bitcode for ios9 projects.
 */

var xcode = require('xcode');
var fs = require('fs');
var util = require('cordova-lib/src/cordova/util');
var ConfigParser = require('cordova-common/src/ConfigParser/ConfigParser');

var projectName = new ConfigParser(util.projectConfig(util.isCordova())).name();
var projectPath = './platforms/ios/' + projectName + '.xcodeproj/project.pbxproj';
var myProj = xcode.project(projectPath);

myProj.parse(function (err) {
  if(err){
    console.log('Error: ' + JSON.stringify(err));
  }
  else{
    myProj.updateBuildProperty('ENABLE_BITCODE', 'NO');
    fs.writeFileSync(projectPath, myProj.writeSync());
    console.log('✔ BITCODE disable');
  }
});
