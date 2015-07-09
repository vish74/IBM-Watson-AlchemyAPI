var AlchemyAPI = require('../alchemyapi');
var alchemyapi = new AlchemyAPI();
var fs = require('fs');


var init_text = 'Yesterday dumb Bob destroyed my fancy iPhone in beautiful Denver, Colorado. I guess I will have to head over to the Apple Store and buy a new one.';
var init_url = 'http://www.npr.org/2013/11/26/247336038/dont-stuff-the-turkey-and-other-tips-from-americas-test-kitchen';
var init_html = '<html><head><title>Node.js Demo | AlchemyAPI</title></head><body><h1>Did you know that AlchemyAPI works on HTML?</h1><p>Well, you do now.</p></body></html>';
var url_face_image = 'http://demo1.alchemyapi.com/images/vision/mother-daughter.jpg';


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
    res.render('home',{data_text:init_text, linklocation:'/entity_call',api:'Entity Extraction',textarea_input:'text'});
};


//All other pages redirection
exports.entity = function (req, res,next) {
  res.render('home',{data_text:init_text, linklocation:'/entity_call',api:'Entity Extraction',textarea_input:'text'});
};
exports.keyword = function (req, res,next) {
    res.render('home',{data_text:init_text, linklocation:'/keyword_call',api:'Keyword Extraction',textarea_input:'text'});
};
exports.concept = function (req, res,next) {
    res.render('home',{data_text:init_text, linklocation:'/concept_call',api:'Concept Tagging',textarea_input:'text'});
};
exports.sentiment = function (req, res,next) {
    res.render('home',{data_text:init_html, linklocation:'/sentiment_call',api:'Sentiment Analysis',textarea_input:'HTML'});
};
exports.textext = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/textext_call',api:'Text Extraction',textarea_input:'URL'});
};
exports.author = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/author_call',api:'Author Extraction',textarea_input:'URL'});
};
exports.language = function (req, res,next) {
    res.render('home',{data_text:init_text, linklocation:'/language_call',api:'Language Detection',textarea_input:'text'});
};
exports.title = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/title_call',api:'Title Extraction',textarea_input:'URL'});
};
exports.relation = function (req, res,next) {
    res.render('home',{data_text:init_text, linklocation:'/relation_call',api:'Relation Extraction',textarea_input:'text'});
};
exports.textcat = function (req, res,next) {
    res.render('home',{data_text:init_text, linklocation:'/textcat_call',api:'Text Categorization',textarea_input:'text'});
};
exports.feed = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/feed_call',api:'Feed Detection',textarea_input:'URL'});
};
exports.microformats = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/microformats_call',api:'Microformats Parsing',textarea_input:'URL'});
};
exports.taxonomy = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/taxonomy_call',api:'Taxonomy Parsing',textarea_input:'URL'});
};
exports.image = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/image_call',api:'Image Parsing',textarea_input:'URL'});
};
exports.imagekey = function (req, res,next) {
    res.render('imageup',{data_text:init_url, linklocation1:'/imagekey_call', linklocation2:'/imagekeyup_call' ,api:'Image Keywords Tagging',textarea_input:'URL'});
};
exports.combined = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/combined_call',api:'Combined Parsing',textarea_input:'URL'});
};
exports.face = function (req, res,next) {
    res.render('imageup',{data_text:url_face_image, linklocation1:'/face_call', linklocation2:'/faceup_call',api:'Face Recognition',textarea_input:'URL'});
};


//API CALLS
exports.entity_call = function (req, res,next) {
    var apikey = req.cookies.alcname;
    alchemyapi.apikey = apikey;
    var demo_text = req.body.inputtext;

    entities(req, res);
    function entities(req, res) {
        alchemyapi.entities('text', demo_text,{ 'sentiment':1 }, function(response) {
            res.render('home',{api:'Entity Extraction',data_text:demo_text, response:JSON.stringify(response,null,4),textarea_input:'text'});
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
            res.render('home',{api:'Keyword Extraction',data_text:demo_text, response:JSON.stringify(response,null,4),textarea_input:'text'});
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
            res.render('home',{api:'Concept Tagging',data_text:demo_text, response:JSON.stringify(response,null,4),textarea_input:'text'});
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
            res.render('home',{api:'Sentiment Analysis',data_text:demo_html, response:JSON.stringify(response,null,4),textarea_input:'HTML'});
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
            res.render('home',{api:'Text Extraction',data_text:demo_url, response:JSON.stringify(response,null,4),textarea_input:'URL'});
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
            res.render('home',{api:'Language Detection',data_text:demo_url, response:JSON.stringify(response,null,4),textarea_input:'URL'});
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
            res.render('home',{api:'Language Detection',data_text:demo_text, response:JSON.stringify(response,null,4),textarea_input:'text'});
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
            res.render('home',{api:'Title Extraction',data_text:demo_url, response:JSON.stringify(response,null,4),textarea_input:'URL'});
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
            res.render('home',{api:'Relation Extraction',data_text:demo_text, response:JSON.stringify(response,null,4),textarea_input:'text'});
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
            res.render('home',{api:'Text Categorization',data_text:demo_text, response:JSON.stringify(response,null,4),textarea_input:'text'});
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
            res.render('home',{api:'Feed Detection',data_text:demo_url, response:JSON.stringify(response,null,4),textarea_input:'URL'});
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
            res.render('home',{api:'Microformats Parsing',data_text:demo_url, response:JSON.stringify(response,null,4),textarea_input:'URL'});
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
            res.render('home',{api:'Taxonomy Parsing',data_text:demo_url, response:JSON.stringify(response,null,4),textarea_input:'URL'});
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
            res.render('home',{api:'Combined Parsing',data_text:demo_url, response:JSON.stringify(response,null,4),textarea_input:'URL'});
        });
    }
};

exports.image_call = function (req, res,next) {
    var apikey = req.cookies.alcname;
    alchemyapi.apikey = apikey;
    var demo_url = req.body.inputtext;

    imageparse(req, res);
    function imageparse(req, res) {
        alchemyapi.image('url', demo_url, {}, function(response) {
            res.render('home',{api:'Image Parsing',data_text:demo_url, response:JSON.stringify(response,null,4)});
        });
    }
};

exports.imagekey_call = function (req, res,next) {
    var apikey = req.cookies.alcname;
    alchemyapi.apikey = apikey;
    var demo_url = req.body.inputtext;

    imagekey(req, res);
    function imagekey(req, res) {
        alchemyapi.image_keywords('url', demo_url, {}, function(response) {
            res.render('imageup',{api:'Image Keywords Tagging',data_text:demo_url, response:JSON.stringify(response,null,4)});
        });
    }
};

exports.imagekeyup_call = function (req, res,next) {
    var apikey = req.cookies.alcname;
    alchemyapi.apikey = apikey;
    var demo_url = req.body.inputfile;

    imagekeyup(req, res);
    function imagekeyup(req, res) {
        alchemyapi.image_face_tag('image', post_face_image, {}, function(response) {
            res.render('imageup',{api:'Image Keywords Tagging',data_text:demo_url, response:JSON.stringify(response,null,4)});
        });
    }
};

exports.face_call = function (req, res,next) {
    var apikey = req.cookies.alcname;
    alchemyapi.apikey = apikey;
    var demo_text = req.body.inputtext;

    face(req, res);
    function face(req, res) {
        alchemyapi.image_face_tag('url', url_face_image, {}, function(response) {
            res.render('imageup',{api:'Face Recognition',data_text:demo_text, response:JSON.stringify(response,null,4)});
        });
    }
};

exports.faceup_call = function (req, res,next) {
    var apikey = req.cookies.alcname;
    alchemyapi.apikey = apikey;
    var demo_text = req.body.inputfile;

    faceup(req, res);
    function faceup(req, res) {
        alchemyapi.image_face_tag('image', post_face_image, {}, function(response) {
            res.render('imageup',{api:'Face Recognition',data_text:demo_text, response:JSON.stringify(response,null,4)});
        });
    }
};