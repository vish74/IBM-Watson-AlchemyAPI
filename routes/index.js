var AlchemyAPI = require('../alchemyapi');
var alchemyapi = new AlchemyAPI();

var init_text = 'Yesterday dumb Bob destroyed my fancy iPhone in beautiful Denver, Colorado. I guess I will have to head over to the Apple Store and buy a new one.';
var init_url = 'http://www.npr.org/2013/11/26/247336038/dont-stuff-the-turkey-and-other-tips-from-americas-test-kitchen';
var init_html = '<html><head><title>Node.js Demo | AlchemyAPI</title></head><body><h1>Did you know that AlchemyAPI works on HTML?</h1><p>Well, you do now.</p></body></html>';

//Index Redirection
exports.index = function (req, res) {
    var apikey = req.cookies.alcname;
    if (apikey) {
        res.render('index', {keydef: apikey});
    }
    else {
        res.render('index');
    }
};

//Check API key by one api call and set cookie
exports.user = function (req, res,next) {
    var apikey = req.body.keyinput;
    alchemyapi.apikey = apikey;
    //Simple API Call to test provided key is correct or not.
    if (apikey) {
        var test_text = 'Bob broke my heart, and then made up this silly sentence to test the Node.js SDK';
        alchemyapi.entities('text', test_text, null, function (response) {
            var stat = response['status'];
            if (stat === "OK") {
                res.cookie('alcname', apikey, {maxAge: 900000, httpOnly: true});
                res.redirect('home');
                next();
            }
            else {
                res.clearCookie('alcname', { path: '/' });
                res.render('index',{status: 'WRONG API KEY/ TRY AGAIN'});
            }
        });

    } else {
        res.redirect('/');
    }
};

//Home Page Redirection
exports.home = function (req, res,next) {
    res.render('home',{data_text:init_text, linklocation:'/entity_call',api:'Entity Extraction'});
};


//All other pages redirection
exports.entity = function (req, res,next) {
  res.render('home',{data_text:init_text, linklocation:'/entity_call',api:'Entity Extraction'});
};

exports.entity_call = function (req, res,next) {
    var apikey = req.cookies.alcname;
    alchemyapi.apikey = apikey;

    var demo_text = req.body.inputtext;
    entities(req, res);
    function entities(req, res) {
        alchemyapi.entities('text', demo_text,{ 'sentiment':1 }, function(response) {
            res.render('home',{api:'Entity Extraction',data_text:demo_text, response:JSON.stringify(response,null,4),results:response['entities']});
        });
    }

};