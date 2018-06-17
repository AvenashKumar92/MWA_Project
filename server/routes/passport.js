const passport    = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;
var user={email:"", passport:""};
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(username, password, done) {
        //User.findOne({ username: username }, function (err, user) {
          //if (err) { return done(err); }
          user.email=username;
          user.password=password;
          if (!user) { return done(null, false); }
          //if (!user.verifyPassword(password)) { return done(null, false); }
          return done(null, user);
        //});
      //}
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {

        if(jwtPayload.email=="email1"){
            return cb(null, user);
        }
        else{
            return cb(null,{err:"Not found"});
        }
        //find the user in db if needed
        /*return UserModel.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });*/
    }
));