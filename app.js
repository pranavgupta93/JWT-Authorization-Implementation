const express=require('express');
const fs=require('fs');
const app = express();
const http = require('http');
const appConfig = require('./config/appConfig');
const mongoose=require('mongoose');
const modelsPath = './app/models';
const controllersPath = './app/controllers';
const libsPath = './app/libs';
const middlewaresPath = './app/middlewares';
const routesPath = './app/routes';
var bodyParser=require('body-parser');
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
//     next();
// });

//Bootstrap models
fs.readdirSync(modelsPath).forEach(function (file) {
    if (~file.indexOf('.js')) require(modelsPath + '/' + file)
  });
  // end Bootstrap models
  
  // Bootstrap route
  fs.readdirSync(routesPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
      let route = require(routesPath + '/' + file);
      route.setRouter(app);
    }
  });

  const server=http.createServer(app);
  server.listen(appConfig.port);
server.on('error', onError);
server.on('listening', onListening);
function onError(error) {
    if (error.syscall !== 'listen') {
      console.log(error.code + ' not equal listen', 'serverOnErrorHandler')
      throw error;
    }
    switch (error.code) {
        case 'EACCES':
          console.log(error.code + ':elavated privileges required', 'serverOnErrorHandler');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.log(error.code + ':port is already in use.', 'serverOnErrorHandler');
          process.exit(1);
          break;
        default:
          console.log(error.code + ':some unknown error occured', 'serverOnErrorHandler');
          throw error;
      }
    }

    function onListening() {
  
        var addr = server.address();
        var bind = typeof addr === 'string'
          ? 'pipe ' + addr
          : 'port ' + addr.port;
        ('Listening on ' + bind);
        console.log('server listening on port' + addr.port+ 'serverOnListeningHandler');
        let db = mongoose.connect(appConfig.db.uri);
      }

      /**
 * database connection settings
 */
mongoose.connection.on('error', function (err) {
    console.log('database connection error');
    console.log(err)
    console.log(err,
      'mongoose connection on error handler', 10)
    //process.exit(1)
  }); // end mongoose connection error
  
  mongoose.connection.on('open', function (err) {
    if (err) {
      console.log("database error");
      console.log(err);
      console.log(err, 'mongoose connection open handler', 10)
    } else {
      console.log("database connection open success");
      console.log("database connection open"+
        'database connection open handler')
    }
    //process.exit(1)
  }); // enr mongoose connection open handler
module.exports=app;  