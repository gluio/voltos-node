#!/usr/bin/env node
var fs = require('fs')
 , request = require('request')
 , tar = require('tar')
 , unzip = require('unzip')
 , zlib = require('zlib')


var extractTarballDownload = function(url, destination, cb) {
  request.get(url)
    .pipe(zlib.createGunzip())
    .pipe(tar.Extract({ path: destination }))
    .on('end', function() {
      if (cb) { cb() }
    })
}

var downloadBinary = function(platform) {
  var latestBinary = 'https://voltos.online/v1/download/'+platform;
  var localBinPath = __dirname + '/../bin/';
  switch(platform) {
    case 'osx':
      request.get(latestBinary)
      .pipe(unzip.Extract({ path: localBinPath }))
      .on('close', function() {
         //fs.chmodSync(localBinPath+'voltos', 0711);
       })
      break;
    case 'linux64':
      extractTarballDownload(latestBinary , localBinPath, function() {
        //fs.chmodSync(localBinPath+'voltos', 0711);
      })
      break;
    default:
      break;
  }
}

switch(process.platform) {
  case 'darwin':
    downloadBinary('osx');
    break;
  case 'freebsd','linux','sunos':
    downloadBinary('linux64');
    break;
  case 'win32':
    downloadBinary('windows');
    break;
  default:
    console.log('This OS does not currently have binary support for Voltos. Skipping.')
    break;
}
