const monggose = require('mongoose');

const urlSchema = new monggose.Schema({
    original_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
        required: true
    }
});

//exports
module.exports = monggose.model('Url', urlSchema);