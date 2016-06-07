var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
// var config = require('../../../config');

var Account = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        index: { unique: true }
    },
    name: String,
    image: String,
    token: String,
    refreshTokens: [String],
    userinfo: {
      surname: String,
      phone: String,
      gender: String,
      country: String,
      city: String,
      day: Number,
      month: Number,
      year: Number,
      interests: [String]
    },
    //expires: { type: Date, expires: '24h', default: Date.now }
});


Account.plugin(passportLocalMongoose, { usernameField: 'email' });

Account.statics.findOrCreate = function(profile, cb) {
    var email = profile.emails.map(function(e) { return e.value })[0];
    var image = profile.photos.map(function(e) { return e.value })[0];
    if (!email) cb(new Error('Can\'t find email'));
    if (!image) image = 'http://www.gravatar.com/avatar/' + crypto.createHash('md5').update(email.trim().toLocaleLowerCase()).digest('hex');
    this.findOne({ email: email }, (err, account) => {
        if (err) cb(err);
        else if (account) cb(null, account);
        else new this({
            email: email,
            name: profile.displayName,
            image: image,
            token: undefined,
            expires: undefined
        }).save(function(err, account) {
            if (!err && account) cb(null, account);
            else cb(err || new Error());
        });
    });
};

Account.statics.makeTemp = function() {

};

module.exports = mongoose.model('Account', Account);
