var passport = require('passport');
var db = require('../db');
var bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

passport.use('local', new LocalStrategy((username, password, cb) => {
    db.any('SELECT username, password FROM "Users" WHERE username=$1', [username])
    .then( result => {
        const first = result[0];
        bcrypt.compare(password, first.password, function(err, res) {
          if(res) {
            cb(null, { id: first.id, username: first.username, type: first.type })
           } else {
            cb(null, false)
           }
         })

       } 
    )
    .catch ( error => {
     
            console.log('Error when selecting user on login', error)
            return cb(error)

    })
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  
//   passport.deserializeUser((id, cb) => {
//     db.query('SELECT id, username, type FROM users WHERE id = $1', [parseInt(id, 10)], (err, results) => {
//       if(err) {
//         winston.error('Error when selecting user on session deserialize', err)
//         return cb(err)
//       }
  
//       return cb(null, results.rows[0])
//     })
//   })

passport.deserializeUser(function(user, done) {
done(null, user);
  });
  module.exports = passport;
