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
exports.keyword = function (req, res,next) {
    res.render('home',{data_text:init_text, linklocation:'/keyword_call',api:'Keyword Extraction'});
};
exports.concept = function (req, res,next) {
    res.render('home',{data_text:init_text, linklocation:'/concept_call',api:'Concept Tagging'});
};
exports.sentiment = function (req, res,next) {
    res.render('home',{data_text:init_html, linklocation:'/sentiment_call',api:'Sentiment Analysis'});
};
exports.textext = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/textext_call',api:'Text Extraction'});
};
exports.author = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/author_call',api:'Author Extraction'});
};
exports.language = function (req, res,next) {
    res.render('home',{data_text:init_text, linklocation:'/language_call',api:'Language Detection'});
};
exports.title = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/title_call',api:'Title Extraction'});
};
exports.relation = function (req, res,next) {
    res.render('home',{data_text:init_text, linklocation:'/relation_call',api:'Relation Extraction'});
};
exports.textcat = function (req, res,next) {
    res.render('home',{data_text:init_text, linklocation:'/textcat_call',api:'Text Categorization'});
};
exports.feed = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/feed_call',api:'Feed Detection'});
};
exports.microformats = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/microformats_call',api:'Microformats Parsing'});
};
exports.taxonomy = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/taxonomy_call',api:'Taxonomy Parsing'});
};
exports.image = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/image_call',api:'Image Parsing'});
};
exports.imagekey = function (req, res,next) {
    res.render('home',{data_text:init_text, linklocation:'/imagekey_call',api:'Image Keywords Tagging'});
};
exports.combined = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/combined_call',api:'Combined Parsing'});
};
exports.face = function (req, res,next) {
    res.render('home',{data_text:init_text, linklocation:'/face_call',api:'Face Recognition'});
};


//API CALLS
exports.entity_call = function (req, res,next) {
    var apikey = req.cookies.alcname;
    alchemyapi.apikey = apikey;
    var demo_text = req.body.inputtext;

    entities(req, res);
    function entities(req, res) {
        alchemyapi.entities('text', demo_text,{ 'sentiment':1 }, function(response) {
            res.render('home',{api:'Entity Extraction',data_text:demo_text, response:JSON.stringify(response,null,4)});
        });
    }
};

exports.keyword_call = function (req, res,next) {
    var apikey = req.cookies.alcname;
    alchemyapi.apikey = apikey;
    var demo_text = req.body.inputtext;

    keyword(req, res);
    function keyword(req, res) {
        alchemyapi.keywords('text', demo_text, { 'sentiment':1 }, function(response) {
            res.render('home',{api:'Keyword Extraction',data_text:demo_text, response:JSON.stringify(response,null,4)});
        });
    }
};

exports.concept_call = function (req, res,next) {
    var apikey = req.cookies.alcname;
    alchemyapi.apikey = apikey;
    var demo_text = req.body.inputtext;

    concepts(req, res);
    function concepts(req, res) {
        alchemyapi.concepts('text', demo_text, { 'showSourceText':1 }, function(response) {
            res.render('home',{api:'Concept Tagging',data_text:demo_text, response:JSON.stringify(response,null,4)});
        });
    }
};

exports.sentiment_call = function (req, res,next) {
    var apikey = req.cookies.alcname;
    alchemyapi.apikey = apikey;
    var demo_html = req.body.inputtext;

    sentiment(req, res);
    function sentiment(req, res) {
        alchemyapi.sentiment('html', demo_html, {}, function(response) {
            res.render('home',{api:'Sentiment Analysis',data_text:demo_html, response:JSON.stringify(response,null,4)});
        });
    }
};

exports.textext_call = function (req, res,next) {
    var apikey = req.cookies.alcname;
    alchemyapi.apikey = apikey;
    var demo_url = req.body.inputtext;

    textext(req, res);
    function textext(req, res) {
        alchemyapi.text('url', demo_url, {}, function(response) {
            res.render('home',{api:'Text Extraction',data_text:demo_url, response:JSON.stringify(response,null,4)});
        });
    }
};

exports.author_call = function (req, res,next) {
    var apikey = req.cookies.alcname;
    alchemyapi.apikey = apikey;
    var demo_url = req.body.inputtext;

    author(req, res);
    function author(req, res) {
        alchemyapi.author('url', demo_url, {}, function(response) {
            res.render('home',{api:'Language Detection',data_text:demo_url, response:JSON.stringify(response,null,4)});
        });
    }
};

exports.language_call = function (req, res,next) {
    var apikey = req.cookies.alcname;
    alchemyapi.apikey = apikey;
    var demo_text = req.body.inputtext;

    language(req, res);
    function language(req, res) {
        alchemyapi.language('text', demo_text, {}, function(response) {
            res.render('home',{api:'Language Detection',data_text:demo_text, response:JSON.stringify(response,null,4)});
        });
    }
};

exports.title_call = function (req, res,next) {
    var apikey = req.cookies.alcname;
    alchemyapi.apikey = apikey;
    var demo_url = req.body.inputtext;

    title(req, res);
    function title(req, res) {
        alchemyapi.title('url', demo_url, {}, function(response) {
            res.render('home',{api:'Title Extraction',data_text:demo_url, response:JSON.stringify(response,null,4)});
        });
    }
};

exports.relation_call = function (req, res,next) {
    var apikey = req.cookies.alcname;
    alchemyapi.apikey = apikey;
    var demo_text = req.body.inputtext;

    relation(req, res);
    function relation(req, res) {
        alchemyapi.relations('text', demo_text, {}, function(response) {
            res.render('home',{api:'Relation Extraction',data_text:demo_text, response:JSON.stringify(response,null,4)});
        });
    }
};

exports.textcat_call = function (req, res,next) {
    var apikey = req.cookies.alcname;
    alchemyapi.apikey = apikey;
    var demo_text = req.body.inputtext;

    textcat(req, res);
    function textcat(req, res) {
        alchemyapi.category('text', demo_text, {}, function(response) {
            res.render('home',{api:'Text Categorization',data_text:demo_text, response:JSON.stringify(response,null,4)});
        });
    }
};

exports.feed_call = function (req, res,next) {
    var apikey = req.cookies.alcname;
    alchemyapi.apikey = apikey;
    var demo_url = req.body.inputtext;

    feed(req, res);
    function feed(req, res) {
        alchemyapi.feeds('url', demo_url, {}, function(response) {
            res.render('home',{api:'Feed Detection',data_text:demo_url, response:JSON.stringify(response,null,4)});
        });
    }
};

exports.microformats_call = function (req, res,next) {
    var apikey = req.cookies.alcname;
    alchemyapi.apikey = apikey;
    var demo_url = req.body.inputtext;

    microformats(req, res);
    function microformats(req, res) {
        alchemyapi.microformats('url', demo_url, {}, function(response) {
            res.render('home',{api:'Microformats Parsing',data_text:demo_url, response:JSON.stringify(response,null,4)});
        });
    }
};

exports.taxonomy_call = function (req, res,next) {
    var apikey = req.cookies.alcname;
    alchemyapi.apikey = apikey;
    var demo_url = req.body.inputtext;

    taxonomy(req, res);
    function taxonomy(req, res) {
        alchemyapi.taxonomy('url', demo_url, {}, function(response) {
            res.render('home',{api:'Taxonomy Parsing',data_text:demo_url, response:JSON.stringify(response,null,4)});
        });
    }
};

exports.combined_call = function (req, res,next) {
    var apikey = req.cookies.alcname;
    alchemyapi.apikey = apikey;
    var demo_url = req.body.inputtext;

    combined(req, res);
    function combined(req, res) {
        alchemyapi.combined('url', demo_url, {}, function(response) {
            res.render('home',{api:'Combined Parsing',data_text:demo_url, response:JSON.stringify(response,null,4)});
        });
    }
};


exports.image_call = function (req, res,next) {
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

exports.imagekey_call = function (req, res,next) {
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

exports.face_call = function (req, res,next) {
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
