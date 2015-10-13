var path = Npm.require('path');
var fs = Npm.require('fs');

Package.describe({
  summary: 'Contains all your npm dependencies',
  version: '1.1.0',
  name: 'npm-container'
});

var packagesJsonFile = path.resolve('./packages.json');
try {
  var fileContent = fs.readFileSync(packagesJsonFile);
  var packages = JSON.parse(fileContent.toString());
  Npm.depends(packages);
} catch (ex) {
  console.error('ERROR: packages.json parsing error [ ' + ex.message + ' ]');
}

// Adding the app's packages.json as a used file for this package will get
// Meteor to watch it and reload this package when it changes
Package.onUse(function(api) {
  api.addFiles('index.js', 'server');
  api.addAssets('../../packages.json', 'server');
});

Cordova.depends({
    'cordova-plugin-calendar': 'https://github.com/EddyVerbruggen/Calendar-PhoneGap-Plugin.git#658d8ff078d44da4fd4d16f4b8a050115a625812',
    //'cordova-plugin-camera': '1.2.0'
    'cordova-plugin-dialogs': 'https://github.com/apache/cordova-plugin-dialogs#fb994515f0b8ff054482ebd5740964204c17c3b3'
});
