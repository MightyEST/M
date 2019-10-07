const db = require('./../database');
const moment = require('moment');

/*******************************
 *  /create routes - GET FORM/POST
 *******************************/
// GET/FORM kuvab kasutajale artikli lisamise vormi
exports.article_create_get = function(req, res){
    //kuvab sisestus vormi
    //res.send('not implemented yet');
    res.render('articles/articleform.ejs',{
        title: 'Add new article'
    });
};

// POST võtab artikli lisamise vorlilt andmed ja loob uue andmebaasi sissekande
exports.article_create_post = function(req,res, next){
    //võtab vormi andmed req muutujast
    if(!req.file){
        console.log('NO FILE!');
        res.send({success: false });
    }
    // HARDCODED USER: ToDo - connect to real user
    let author = 1; 
    let title = req.body.article_title;
    let content = req.body.article_content;
    let article_image = req.file.filename;

    //teeb sisestuse kui võimalik
    let query = 'INSERT INTO article(title, content, image, author_id)'+
    'VALUES(?,?,?,?);';
    db.query(query,[title,content,article_image,author], (err,res)=>{
        //kui päring ei tööta
        if(err){
            console.log('DB error :' + err);
        }
        console.log('DB articles insert');
        console.log(res.message);
    });
    //suunab pealehele tagasi
    res.redirect('/');
};

/*******************************************
 * /:id routes - GET/PATCH/DELETE
 *******************************************/
// GET/SINGLE kuvab ühe artikli kogu sisu
exports.article_get_single = function(req, res){
    //otsime andmebaasist kindle ID-ga artikli ja kuvab selle lehel
    let query = 
    'SELECT article.* , user.username ' +
    'FROM article INNER JOIN user ON article.author_id = user.ID ' +
    'WHERE article.ID = ' + req.params.id +
    ' ORDER BY updated_at ASC;';
    db.query(query, (err,result) =>{
        if(err){  
            res.end('Bad request');
            throw err;
        }
        res.render('articles/article.ejs',{
            title: 'My Fake News',
            articles: result,
            moment: moment
        });
    });
};
//uuendab artikli andmed
exports.article_update = function(req, res){
    //NOT IMPLEMENTED
};

//kustutab artikli ID alusel
exports.article_delete = function(req, res){
    //NOT IMPLEMENTED
    let query = 
    'DELETE FROM article ' +
    'WHERE ID = ' + req.params.id + ';';
    db.query(query, (err,result) =>{
        if(err){  
            res.end('Bad request');
            throw err;
        }
        res.redirect('/article');
    });
}

/*******************************
 * /routes - GET
 */
// GET/ALL kuvab kõigi artiklite pealkirjad, kuupäevad ja pildi
//TODO: lisa pildi kuvamise võimalus
exports.article_get_all = function(req,res){
    let query = 
    'SELECT article.ID, article.title, article.image, article.created_at , user.username ' +
    'FROM article INNER JOIN user ON article.author_id = user.ID ' +
    'ORDER BY updated_at ASC;';
    db.query(query, (err,result) =>{
        if(err){  
            res.end('Bad request');
            throw err;
        }
        res.render('articles/articles.ejs',{
            title: 'My Fake News',
            articles: result,
            moment: moment
        });
    });

}
