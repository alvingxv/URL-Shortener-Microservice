const monggose = require('mongoose');

const urlSchema = new monggose.Schema({
    original_url: String,
    short_url: String
});

//exports
module.exports = monggose.model('Url', urlSchema);