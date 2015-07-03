exports.index = function (req, res) {
    var key1 = req.cookies.name;
    if (key1) {
     //   app.locals.textinput= key1;
        //res.locals.user = { name : "test" };
        res.render('index', {keydef: key1});
    }
    else {
        res.render('index');
    }


};

exports.user = function (req, res) {
    var key = req.body.textinput;
    res.cookie('name', key, {maxAge: 900000, httpOnly: true});
    //console.log(key);
    res.redirect('/');
};


