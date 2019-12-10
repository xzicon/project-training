var express = require('express');
var router = express.Router();
var pg = require('pg');
var pgdb = new pg.Pool({
    host: '127.0.0.1',
    port: 5432,
    user: 'dongxin',
    password: '111111',
    database: 'dongxin'
});

router.get('/',(req,res,next)=>{
    let sql = `SELECT a.aid,a.atitle,a.acontent,a.aimage,a.atag,a.utime,a.acomment,a.alikes,b.mid,b.mtitle,c.uid,c.uname,c.uimage FROM article as a LEFT JOIN material b ON a.mid = b.mid LEFT JOIN users c ON a.uid = c.uid`;
    pgdb.query(sql,[],(err,val)=>{
        if(err || val.rowCount < 0){
            console.log(err);
            res.json({status:'1',data:'error'});
        }else{
            res.json({status:'0',data:val.rows});
        }
    });

});
router.get('/:aid',(req,res,next)=>{
	let aid = req.params.aid;
	console.log('文章id',aid);
	let sql = `SELECT a.aid,a.atitle,a.acontent,a.aimage,a.atag,a.utime,a.acomment,a.alikes,b.mid,b.mtitle,c.uid,c.uname,c.uimage FROM article as a LEFT JOIN material b ON a.mid = b.mid LEFT JOIN users c ON a.uid = c.uid WHERE a.aid = $1`;
	pgdb.query(sql,[aid],(err,val)=>{
		if(err || val.rowCount < 0){
			console.log(err);
			res.json({status:'1',data:'error'})
		}else{
		
			res.json({status:'0',data:val.rows})
		}
	})
})
module.exports = router;
