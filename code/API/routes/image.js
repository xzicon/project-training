var express = require('express');
var router = express.Router();
var pg = require('pg');
var fs = require('fs');

var pgdb = new pg.Pool({
    host: '127.0.0.1',
    port: 5432,
    user: 'dongxin',
    password: '111111',
    database: 'dongxin'
});

router.get('/:id',(req,res,next)=>{
    var filename = req.params.id;
	console.log(req.params.id);
    var ext = filename.split('.')[1];
	console.log(ext);
    //var img = fs.readFileSync(`/image/${filename}`,"binary");
//	console.log(img);
//    res.writeHead(200,{
    //    'Content-Type':'image/png'
  //  })
//	res.write(content,"binary");
    res.end();

});

module.exports = router;
