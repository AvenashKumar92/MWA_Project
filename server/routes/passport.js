const passport    = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;

const User = require('../model/user.model');

var user={email:"", password:""};
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {

        User.validateCredentials(email, password, function(err, data){
            if(err){
                return done(err);
            }
            if(!data || data.length<=0){
                err="Email or password incorrect";
                return done(err);
            }
            let user = {
                'email': data[0].email,
                'password': data[0].password
              };
            return done(null, user);
        })
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'my_jwt_secret'
    },
    function (jwtPayload, done) {

        User.validateCredentials(jwtPayload.email, jwtPayload.password, function(err, data){
            if(err){
                return done(err);
            }
            if(!data || data.length<=0){
                err="Unauthorized access";
                return done(err);
            }
            let user = {
                'email': data[0].email,
                'password': data[0].password
              };
            return done(null, user);
        })
    }
));