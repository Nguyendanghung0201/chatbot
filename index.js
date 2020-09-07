var express = require('express');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', key: 'sid' }));
 app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'))
const http = require('http');
var server = http.createServer(app);
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
var config_fb = require("./config/config-facebook")
var faceBookRouter = require('./router/facebook-api');
var appRouter = require('./router/index');
var userRouter = require('./router/userRouter');
var pageRouter = require('./router/pageRouter');
var botRouter = require('./router/botRouter');
var botActionRouter = require('./router/botActionRouter')
var UserService = require('./controller/user/user-Service');
require('./config/config-db')
// Passport session setup. 
passport.serializeUser(function (user, done) {
  done(null, user);
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization,Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', 'Authorization,Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');
    return res.status(200).json({});
  };
  next();
});
passport.use(new FacebookStrategy(config_fb,
 async function (accessToken, refreshToken, profile, done) {
    if (accessToken && profile.id) {
      await UserService.LoginByFaceBook(accessToken, profile);
      done(null, profile)
    }
  }
));

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
app.use(passport.initialize());
app.use(passport.session());





app.use('/facebook', faceBookRouter);
app.use('/', appRouter);
app.use('/user', userRouter);
app.use('/page', pageRouter);
app.use('/bot', botRouter);
app.use('/action', botActionRouter)


// catch 404 and forward to error handler


// Đây là function dùng api của facebook để gửi tin nhắn

app.set('port', process.env.PORT || 8080);
app.set('ip', process.env.IP || "0.0.0.0");

server.listen(app.get('port'), app.get('ip'), function () {
  console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port'));
});