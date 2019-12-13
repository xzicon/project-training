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

router.post('/article',(req,res,next)=>{
	let data = req.body;
	res.setHeader('Content-Type','text/html;charset=utf-8');
	let like = `%${data.search}%`+'';	
	let sql = `SELECT * FROM article WHERE atitle LIKE $1`;
	console.log(like);
	pgdb.query(sql,[like],(err,val)=>{
		if(err || val.rowCount<0){
			console.log(err);
			res.json({status:'-1',data:'error'});
		}else{
			if(val.rowCount=0){
				res.json({status:'1',data:'没有查询到'})
			}else{
				res.json({status:'0',data:val.rows})
			}
		}
	})
})
router.post('/material',(req,res,next)=>{
        let data = req.body;
	res.setHeader('Content-Type','text/html;charset=utf-8');
        let like = `%${data.search}%`+'';
	let sql = `SELECT * FROM material WHERE mtitle LIKE $1`;
        pgdb.query(sql,[like],(err,val)=>{
                if(err || val.rowCount<0){
                        res.json({status:'-1',data:'error'});
                }else{
                        if(val.rowCount=0){
                                res.json({status:'1',data:'没有查询到'})
                        }else{
                                res.json({status:'0',data:val.rows})
                        }
                }
        })
})

module.exports = router;


