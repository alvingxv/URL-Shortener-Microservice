const Url = require('../models/url');

const isValidUrl = (url) => {
    const regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    return regex.test(url);
}


exports.home = async (req, res, next) => {

    res.render('index')
}

exports.create = async (req, res, next) => {
    const { short_url, original_url } = req.body;
    if (!isValidUrl(original_url)) {
        res.json({ error: 'invalid url' })
    }

    const url = await Url.create({ original_url: original_url, short_url: short_url });
    console.log(url);

    res.json({
        original_url: url.original_url,
        short_url: url.short_url
    })
}

exports.redirect = async (req, res, next) => {
    const halo = await Url.findOne({ short_url: req.params.short_url })
    if (halo) {
        res.redirect(halo.original_url);
        return;
    }
    return res.json({ msg: `not found` })
}