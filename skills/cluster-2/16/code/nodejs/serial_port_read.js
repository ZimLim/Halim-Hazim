// const SerialPort = require('serialport')
// const port = new SerialPort('/dev/tty.SLAB_USBtoUART', {baudRate: 115200})
//
// // if (err) {
// //     return console.log('Error: ', err.message)
// //   }
//
//
//
// port.write('main screen turn on', function(err) {
//   if (err) {
//     return console.log('Error on write: ', err.message)
//   }
//   console.log('message written')
// })
//
// // Open errors will be emitted as an error event
// port.on('error', function(err) {
//   console.log('Error: ', err.message)
// })
//
//   // Read data that is available but keep the stream in "paused mode"
//   port.on('readable', function () {
//     console.log('Data:', port.read())
//   })
//
//   // Switches the port into "flowing mode"
//   port.on('data', function (data) {
//     console.log('Data:', data)
//   })
//
//   // Pipe the data into another stream (like a parser or standard out)
//   const lineStream = port.pipe(new Readline())
//code adapted from https://medium.com/@machadogj/arduino-and-node-js-via-serial-port-bcf9691fab6a and the serialport documentation

var SerialPort = require('serialport');
var Readline = require('@serialport/parser-readline');
var port = new SerialPort('/dev/cu.SLAB_USBtoUART', {
	autoOpen: false,
	baudRate: 115200
});
var parser = port.pipe(new Readline({ delimiter: '\n' }));

console.log("test");

port.open(function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message);
  }

  // Because there's no callback to write, write errors will be emitted on the port:
  port.write('main screen turn on');
});

// Read data that is available but keep the stream from entering "flowing mode"
port.on('readable', function () {
  port.read();
});

parser.on('data', data =>{
  console.log(data);
});
//var port = new SerialPort("/dev/cu.SLAB_USBtoUART", {
