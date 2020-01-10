var express = require('express');
var router = express.Router();
var crypto = require('crypto');

router.get('/', function(req, res, next){
    res.send('respond with a resource');
});

//회원가입
router.post('/register', function(req, res, next){

    var id = req.body.id;
    var password = req.body.password;
    var nickname = req.body.nickname;
    var score = req.body.score;
    var rank = req.body.rank;

    var db = req.app.get('database');

    if(db == undefined)
    {
        res.json({message:'503 Server Error'});
        return;
    }
    var validate = userValidation(id, password, nickname);
    if(validate == false)
    {
        res.json({message:'400 Bad Response'})
    }

    var userCollection = db.collection('mysample');

    userCollection.count({'id':id}, function(err ,result){
        if (err) throw(err);

        if (result >0) {
            res.json({message: '400 Bad Response'});
            return
        } else{
            crypto.randomBytes(64, function(err,buf){
                const saltStr = buf.toString('base64');
                crypto.pbkdf2(password, saltStr, 100, 64, 'sha512', function(err, key) {
                    const crypto = key.toString('base64');

                    userCollection.insertOne({'id':id, 'nickname': nickname, 'password': saltStr}, function(err, result) {
                            if(err) throw(err);
                            if (result.ops.length > 0)
                            res.json(result.ops[0]);
                            else
                            res.json({message: '503 Server Error'});

                        }
                    );
                });
            });
        }
    });
});

var AddScore = function(id,score){
    score + 5;
}
var Getrank = function(id,score){
    userCollection.insertOne({'id':id,'nickname':nickname,'score':score})
}


    var userValidation = function(id, password, nickname)
    {
        if (id == '' || password == '' || nickname == '')
        {
            return false;
        }
        if (id.length < 6 || id.length > 12)
        {
            return false;
        }
        if (password.length < 8 || password.length > 20)
        {
            return false;
        }
        if (nickname.length < 4 || nickname.length > 20)
        {
            return false;
        }
        return true;
    }


    // 로그인
    router.post('/login', function(req, res, next) {

    });

module.exports = router;
