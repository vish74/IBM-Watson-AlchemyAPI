var AlchemyAPI = require('../alchemyapi');
var alchemyapi = new AlchemyAPI();

var init_text = 'Yesterday dumb Bob destroyed my fancy iPhone in beautiful Denver, Colorado. I guess I will have to head over to the Apple Store and buy a new one.';
var init_url = 'http://www.npr.org/2013/11/26/247336038/dont-stuff-the-turkey-and-other-tips-from-americas-test-kitchen';
var init_html = '<html><head><title>Node.js Demo | AlchemyAPI</title></head><body><h1>Did you know that AlchemyAPI works on HTML?</h1><p>Well, you do now.</p></body></html>';
var url_face_image = 'http://demo1.alchemyapi.com/images/vision/mother-daughter.jpg';

//Description
var entity = 'Entity Extraction API identifies people, companies, organizations, cities, geographic features, and other typed entities within your HTML, text, or web-based content.';
var keywordcall= 'Keyword Extraction capable of extracting topic keywords from your HTML, text, or web-based content. Uses sophisticated statistical algorithms and natural language processing technology to analyze your data, extracting keywords that can be used to index content, generate tag clouds, and more.';
var concept= 'Concept tagging API is capable of abstraction, understanding how concepts relate and tagging accordingly ("My favorite brands are BMW, Ferrari, and Porsche." = "Automotive Industry").';
var sentimentcall='Sentiment Analysis APIs are capable of computing document-level sentiment, user-specified sentiment targeting, entity-level sentiment, emoticons and keyword-level sentiment. Multiple modes of sentiment analysis provide for a variety of use cases ranging from social media monitoring to trend analysis.';
var textcall='Text extraction API provides easy-to-use mechanisms to extract page text and title information from any web page.';
var authorcall='Author extraction API is capable of extracting author information from web pages. If a news article or blog post specifies an author, AlchemyAPI will attempt to extract it automatically. Combined with AlchemyAPIs other text analysis features, author extraction enables the generation of tag clouds, sentiment towards specific topics, and more on an author-specific basis.'
var languagecall='Language detection API provides a robust language detection facility, capable of detecting the language of any text, HTML, or web-based content. AlchemyAPI identifies more languages (95+) than any other text analysis service, at extremely high rates of accuracy. Easily categorize or filter any content based on the language it was written in.';
var titlecall='Title extraction API is capable of extracting title information from web pages. '
var relationcall ='Relation extraction is capable of identifying Subject-Action-Object relations within your HTML, text, or web-based content. Uses sophisticated statistical algorithms and natural language processing technology to analyze your information, extracting the semantic richness embedded within.'
var textcatcall='Text categorization provides easy-to-use mechanisms to extract page text and title information from any web page.';
var feedcall ='Feed detection is capable of extracting RSS/ATOM feed links embedded within any web page. Use the AlchemyAPI feed link extraction API calls to automatically discover syndicated content feeds associated with specific web sites or individual web pages.';
var microformatscall ='Microformats parsing API understands Microformats data standards and is capable of extracting hCard, adr, geo, and rel-* formatted content from any web page. Leverage this structured data to enhance web page categorization and indexing, and perform content discovery tasks.';
var taxonomycall ='Taxonomy API is capable of categorizing your HTML, or web-based content. Uses sophisticated statistical algorithms and natural language processing technology to analyze your information, assigning the most likely topic category (baseball, mobile phones, etc.).';
var imageparsing='Image Parsing API provides easy-to-use mechanisms for performing image link extraction on Internet-accessible URLs and posted HTML files.'
var imageKeywords='Image Keyword tagging provides easy-to-use facilities for performing image tagging on your Internet-accessible URLs and posted image files.'
var combinedcall='Combined API call makes it faster for users to analyze a single piece of content with multiple text and image analysis features.'
var faceReco='Face detection API provides easy-to-use facilities for performing face detection and recognition on your Internet-accessible URLs and posted image files.'

//Index Redirection
exports.index = function (req, res) {
    var apikey = req.session.finalkey;

    if (process.env.VCAP_SERVICES) {
        var services = JSON.parse(process.env.VCAP_SERVICES);
        for (var service_name in services) {
            var service = services[service_name][0];
            var sdkey = service.credentials.apikey;
            alchemyapi.apikey = sdkey;
            var test_text = 'Bob broke my heart, and then made up this silly sentence to test the Node.js SDK';
            alchemyapi.entities('text', test_text, null, function (response) {
                var stat = response['status'];
                if (stat === "OK") {
                    req.session.finalkey = sdkey ;
                    res.redirect('home');
                }
                else {
                    res.render('index',{status: 'WRONG API KEY/ TRY AGAIN'});
                }});
        }
    }
    else if (apikey) {
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
                req.session.finalkey = apikey ;
                res.redirect('home');
                next();
            }
            else {
                res.render('index',{status: 'WRONG API KEY/ TRY AGAIN'});
            }
        });

    } else {
        res.redirect('/');
    }
};

//Home Page Redirection
exports.home = function (req, res,next) {
    res.render('home',{data_text:init_text, linklocation:'/entity_call',api:'Entity Extraction',textarea_input:'text',desc:entity});
};


//All other pages redirection
exports.entity = function (req, res,next) {
  res.render('home',{data_text:init_text, linklocation:'/entity_call',api:'Entity Extraction',textarea_input:'text',desc:entity, desc_scroll: 1});
};
exports.keyword = function (req, res,next) {
    res.render('home',{data_text:init_text, linklocation:'/keyword_call',api:'Keyword Extraction',textarea_input:'text',desc:keywordcall , desc_scroll: 1});
};
exports.concept = function (req, res,next) {
    res.render('home',{data_text:init_text, linklocation:'/concept_call',api:'Concept Tagging',textarea_input:'text',desc:concept, desc_scroll: 1});
};
exports.sentiment = function (req, res,next) {
    res.render('home',{data_text:init_html, linklocation:'/sentiment_call',api:'Sentiment Analysis',textarea_input:'HTML',desc:sentimentcall , desc_scroll: 1});
};
exports.textext = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/textext_call',api:'Text Extraction',textarea_input:'URL',desc:textcall, desc_scroll: 1});
};
exports.author = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/author_call',api:'Author Extraction',textarea_input:'URL',desc:authorcall , desc_scroll: 1});
};
exports.language = function (req, res,next) {
    res.render('home',{data_text:init_text, linklocation:'/language_call',api:'Language Detection',textarea_input:'text',desc:languagecall, desc_scroll: 1});
};
exports.title = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/title_call',api:'Title Extraction',textarea_input:'URL',desc:titlecall, desc_scroll: 1});
};
exports.relation = function (req, res,next) {
    res.render('home',{data_text:init_text, linklocation:'/relation_call',api:'Relation Extraction',textarea_input:'text',desc:relationcall, desc_scroll: 1});
};
exports.textcat = function (req, res,next) {
    res.render('home',{data_text:init_text, linklocation:'/textcat_call',api:'Text Categorization',textarea_input:'text',desc:textcatcall, desc_scroll: 1});
};
exports.feed = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/feed_call',api:'Feed Detection',textarea_input:'URL',desc:feedcall, desc_scroll: 1});
};
exports.microformats = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/microformats_call',api:'Microformats Parsing',textarea_input:'URL',desc:microformatscall, desc_scroll: 1});
};
exports.taxonomy = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/taxonomy_call',api:'Taxonomy Parsing',textarea_input:'URL',desc:taxonomycall, desc_scroll: 1});
};
exports.image = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/image_call',api:'Image Parsing',textarea_input:'URL',desc:imageparsing, desc_scroll: 1});
};
exports.imagekey = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/imagekey_call' ,api:'Image Keywords Tagging',textarea_input:'URL',desc:imageKeywords, desc_scroll: 1});
};
exports.combined = function (req, res,next) {
    res.render('home',{data_text:init_url, linklocation:'/combined_call',api:'Combined Parsing',textarea_input:'URL',desc:combinedcall, desc_scroll: 1});
};
exports.face = function (req, res,next) {
    res.render('home',{data_text:url_face_image, linklocation:'/face_call',api:'Face Recognition',textarea_input:'URL',desc:faceReco, desc_scroll: 1});
};


//API CALLS
exports.entity_call = function (req, res,next) {
    var apikey = req.session.finalkey;
    alchemyapi.apikey = apikey;
    var demo_text = req.body.inputtext;

    entities(req, res);
    function entities(req, res) {
        alchemyapi.entities('text', demo_text,{ 'sentiment':1 }, function(response) {
            res.render('home',{api:'Entity Extraction',data_text:demo_text, response:JSON.stringify(response,null,4),textarea_input:'text',desc:entity, desc_scroll: 2});
        });
    }
};

exports.keyword_call = function (req, res,next) {
    var apikey = req.session.finalkey;
    alchemyapi.apikey = apikey;
    var demo_text = req.body.inputtext;

    keyword(req, res);
    function keyword(req, res) {
        alchemyapi.keywords('text', demo_text, { 'sentiment':1 }, function(response) {
            res.render('home',{api:'Keyword Extraction',data_text:demo_text, response:JSON.stringify(response,null,4),textarea_input:'text',desc:keywordcall, desc_scroll: 2});
        });
    }
};

exports.concept_call = function (req, res,next) {
    var apikey = req.session.finalkey;
    alchemyapi.apikey = apikey;
    var demo_text = req.body.inputtext;

    concepts(req, res);
    function concepts(req, res) {
        alchemyapi.concepts('text', demo_text, { 'showSourceText':1 }, function(response) {
            res.render('home',{api:'Concept Tagging',data_text:demo_text, response:JSON.stringify(response,null,4),textarea_input:'text',desc:concept, desc_scroll: 2});
        });
    }
};

exports.sentiment_call = function (req, res,next) {
    var apikey = req.session.finalkey;
    alchemyapi.apikey = apikey;
    var demo_html = req.body.inputtext;

    sentiment(req, res);
    function sentiment(req, res) {
        alchemyapi.sentiment('html', demo_html, {}, function(response) {
            res.render('home',{api:'Sentiment Analysis',data_text:demo_html, response:JSON.stringify(response,null,4),textarea_input:'HTML',desc:sentimentcall, desc_scroll: 2});
        });
    }
};

exports.textext_call = function (req, res,next) {
    var apikey = req.session.finalkey;
    alchemyapi.apikey = apikey;
    var demo_url = req.body.inputtext;

    textext(req, res);
    function textext(req, res) {
        alchemyapi.text('url', demo_url, {}, function(response) {
            res.render('home',{api:'Text Extraction',data_text:demo_url, response:JSON.stringify(response,null,4),textarea_input:'URL',desc:textcall, desc_scroll: 2});
        });
    }
};

exports.author_call = function (req, res,next) {
    var apikey = req.session.finalkey;
    alchemyapi.apikey = apikey;
    var demo_url = req.body.inputtext;

    author(req, res);
    function author(req, res) {
        alchemyapi.author('url', demo_url, {}, function(response) {
            res.render('home',{api:'Language Detection',data_text:demo_url, response:JSON.stringify(response,null,4),textarea_input:'URL',desc:authorcall, desc_scroll: 2});
        });
    }
};

exports.language_call = function (req, res,next) {
    var apikey = req.session.finalkey;
    alchemyapi.apikey = apikey;
    var demo_text = req.body.inputtext;

    language(req, res);
    function language(req, res) {
        alchemyapi.language('text', demo_text, {}, function(response) {
            res.render('home',{api:'Language Detection',data_text:demo_text, response:JSON.stringify(response,null,4),textarea_input:'text',desc:languagecall, desc_scroll: 2});
        });
    }
};

exports.title_call = function (req, res,next) {
    var apikey = req.session.finalkey;
    alchemyapi.apikey = apikey;
    var demo_url = req.body.inputtext;

    title(req, res);
    function title(req, res) {
        alchemyapi.title('url', demo_url, {}, function(response) {
            res.render('home',{api:'Title Extraction',data_text:demo_url, response:JSON.stringify(response,null,4),textarea_input:'URL',desc:titlecall, desc_scroll: 2});
        });
    }
};

exports.relation_call = function (req, res,next) {
    var apikey = req.session.finalkey;
    alchemyapi.apikey = apikey;
    var demo_text = req.body.inputtext;

    relation(req, res);
    function relation(req, res) {
        alchemyapi.relations('text', demo_text, {}, function(response) {
            res.render('home',{api:'Relation Extraction',data_text:demo_text, response:JSON.stringify(response,null,4),textarea_input:'text',desc:relationcall, desc_scroll: 2});
        });
    }
};

exports.textcat_call = function (req, res,next) {
    var apikey = req.session.finalkey;
    alchemyapi.apikey = apikey;
    var demo_text = req.body.inputtext;

    textcat(req, res);
    function textcat(req, res) {
        alchemyapi.category('text', demo_text, {}, function(response) {
            res.render('home',{api:'Text Categorization',data_text:demo_text, response:JSON.stringify(response,null,4),textarea_input:'text',desc:textcatcall, desc_scroll: 2});
        });
    }
};

exports.feed_call = function (req, res,next) {
    var apikey = req.session.finalkey;
    alchemyapi.apikey = apikey;
    var demo_url = req.body.inputtext;

    feed(req, res);
    function feed(req, res) {
        alchemyapi.feeds('url', demo_url, {}, function(response) {
            res.render('home',{api:'Feed Detection',data_text:demo_url, response:JSON.stringify(response,null,4),textarea_input:'URL',desc:feedcall, desc_scroll: 2});
        });
    }
};

exports.microformats_call = function (req, res,next) {
    var apikey = req.session.finalkey;
    alchemyapi.apikey = apikey;
    var demo_url = req.body.inputtext;

    microformats(req, res);
    function microformats(req, res) {
        alchemyapi.microformats('url', demo_url, {}, function(response) {
            res.render('home',{api:'Microformats Parsing',data_text:demo_url, response:JSON.stringify(response,null,4),textarea_input:'URL',desc:microformatscall, desc_scroll: 2});
        });
    }
};

exports.taxonomy_call = function (req, res,next) {
    var apikey = req.session.finalkey;
    alchemyapi.apikey = apikey;
    var demo_url = req.body.inputtext;

    taxonomy(req, res);
    function taxonomy(req, res) {
        alchemyapi.taxonomy('url', demo_url, {}, function(response) {
            res.render('home',{api:'Taxonomy Parsing',data_text:demo_url, response:JSON.stringify(response,null,4),textarea_input:'URL',desc:taxonomycall, desc_scroll: 2});
        });
    }
};

exports.combined_call = function (req, res,next) {
    var apikey = req.session.finalkey;
    alchemyapi.apikey = apikey;
    var demo_url = req.body.inputtext;

    combined(req, res);
    function combined(req, res) {
        alchemyapi.combined('url', demo_url, {}, function(response) {
            res.render('home',{api:'Combined Parsing',data_text:demo_url, response:JSON.stringify(response,null,4),textarea_input:'URL',desc:combinedcall, desc_scroll: 2});
        });
    }
};

exports.image_call = function (req, res,next) {
    var apikey = req.session.finalkey;
    alchemyapi.apikey = apikey;
    var demo_url = req.body.inputtext;

    imageparse(req, res);
    function imageparse(req, res) {
        alchemyapi.image('url', demo_url, {}, function(response) {
            res.render('home',{api:'Image Parsing',data_text:demo_url, response:JSON.stringify(response,null,4),textarea_input:'URL',desc:imageparsing, desc_scroll: 2});
        });
    }
};

exports.imagekey_call = function (req, res,next) {
    var apikey = req.session.finalkey;
    alchemyapi.apikey = apikey;
    var demo_url = req.body.inputtext;
    imagekey(req, res);
    function imagekey(req, res) {
        alchemyapi.image_keywords('url', demo_url, {}, function(response) {
            res.render('home',{api:'Image Keywords Tagging',data_text:demo_url, response:JSON.stringify(response,null,4),textarea_input:'URL',desc:imageKeywords, desc_scroll: 2});
        });
    }
};

exports.face_call = function (req, res,next) {
    var apikey = req.session.finalkey;
    alchemyapi.apikey = apikey;
    var demo_url = req.body.inputtext;

    face(req, res);
    function face(req, res) {
        alchemyapi.image_face_tag('url', demo_url, {}, function(response) {
            res.render('home',{api:'Face Recognition',data_text:demo_url, response:JSON.stringify(response,null,4),textarea_input:'URL',desc:faceReco, desc_scroll: 2});
        });
    }
};
