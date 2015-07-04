var AlchemyAPI = require('../alchemyapi');
var alchemyapi = new AlchemyAPI();

exports.index = function (req, res) {
    var apikey = req.cookies.name;
    if (apikey) {
        res.render('index', {keydef: apikey});
    }
    else {
        res.render('index');
    }
};

exports.user = function (req, res,next) {
    var apikey = req.body.keyinput;
    alchemyapi.apikey = apikey;

    if (apikey) {
        var test_text = 'Bob broke my heart, and then made up this silly sentence to test the Node.js SDK';
        alchemyapi.entities('text', test_text, null, function (response) {
            var stat = response['status'];
            if (stat === "OK") {
                res.cookie('name', apikey, {maxAge: 900000, httpOnly: true});
                res.render('index',{status: 'CORRECT'});

            }
            else {
                res.render('index',{status: 'WRONG API KEY/ TRY AGAIN'});

            }
        });

    } else {
        res.redirect('/');
    }
};
