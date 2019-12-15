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
let casheFolder = '../public/images/'
router.post('/modifyPic',(req,res,next)=>{
	let userDirPath = cacheFolder+"Img";
	let form = new formidable.IncomingForm();
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
			let sql = `UPDATE image SET image=$1 WHERE uid=$2`;
        	        pgdb.query(sql,[imgPath,uid],(err,val)=>{
                	        if(err) { console.log(err);res.json({status:'-1',data:'error'})}
                        	else{
					res.json({status:'1',data:'修改成功'})
				}
	                })
			
		} 
	})

});

module.exports = router;
