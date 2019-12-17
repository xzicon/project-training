var path =  require('path');
var express = require('express');
var router = express.Router();
var pg = require('pg');
var fs = require('fs');
var formidable = require('formidable');
var pgdb = new pg.Pool({
    host: '127.0.0.1',
    port: 5432,
    user: 'dongxin',
    password: '111111',
    database: 'dongxin'
});
let casheFolder = './public/images/';
router.get('',(req,res,next)=>{
	let sql = `SELECT * FROM userinfo`;
	pgdb.query(sql,[],(err,val)=>{
		if(err){
			console.log(err);
			res.json({status:'-1',data:'error'})
		}else{
			res.json({status:'0',data:val.rows})
		}
	})
})
/*router.post('/mk',(req,res,next)=>{
	let userDirPath = cacheFolder+"temp";
	let form = new formidable.IncomingForm();
	console.log(form);
	form.encoding = 'utf-8';
	form.keepExtensions = true;
	form.uploadDir = userDirPath;
	form.maxFieldsSize = 2*1024*1024;
	form.type=true;
	form.parse(req,(err,fields,files)=>{
		if(err) {return res.json(err)};
		 let extName = ''; //后缀名
		switch (files.file.type) {
                        case 'image/pjpeg':
                            extName = 'jpg';
                            break;
                        case 'image/jpeg':
                            extName = 'jpg';
                            break;
                        case 'image/png':
                            extName = 'png';
                            break;
                        case 'image/x-png':
                            extName = 'png';
                            break;
                    }
		if (extName.length === 0) {
                        return res.json({
                            msg: '只支持png和jpg格式图片'
                        });
                    } else {
                        let avatarName = '/' + Date.now() + '.' + extName;
                        let newPath = form.uploadDir + avatarName;
                        fs.renameSync(files.file.path, newPath); //重命名
                        console.log(newPath);
		//	let sql = `UPDATE image SET image=$1 WHERE uid=$2`;
        		let sql = `INSERT INTO userinfo VALUES($1,$2,$3)`;  
		      pgdb.query(sql,[2,imgPath,imgPath],(err,val)=>{
                	        if(err) { console.log(err);res.json({status:'-1',data:'error'})}
                        	else{
					res.json({status:'1',data:'修改成功'})
				}
	                })
			
		} 
	})

});*/
router.post('/', function(req, res) {
                var form = new formidable.IncomingForm();
                form.uploadDir = "./public/images/temp/"; 
                form.parse(req, function(error, fields, files) {
                    for (var key in files) {
                        var file = files[key];
                        var fName = (new Date()).getTime();
                        switch (file.type) {
                            case "image/jpeg":
                                fName = fName + ".jpg";
                                break;
                            case "image/png":
                                fName = fName + ".png";
                                break;
                            default:
                                fName = fName + ".png";
                                break;
                        }
                        console.log(file, file.size);
                        var uploadDir = "./public/images/" + fName;
                        fs.rename(file.path, uploadDir, function(err) {
                            if (err) {
				console.log(err);
                                //res.write(err + "\n");
                                //res.end();
                                res.json({status:'-1',data:'error'})
                            }else{
				res.json({status:'0',data:fName})
				}
            
                        })
            
                    }
                });
            });
module.exports = router;
