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
router.post('/',(req,res,next)=>{
	let data = req.body;
	res.setHeader('Content-Type','text/html;charset=utf-8');
	let sql = `INSERT INTO usort VALUES($1,$2),($1,$3),($1,$4),($1,$5),($1,$6)`;
	pgdb.query(sql,[data.uid,data.msid1,data.msid2,data.msid3,data.msid4,data.msid5],(err,val)=>{
		if(err){
			res.json({status:'-1',data:'error'})
		}else{
			console.log(val.rows[0]);
			res.json({status:'0',data:'关注标签成功'})	
		}
	})
})
router.get('/:uid',(req,res,next)=>{
	let uid = req.params.uid;
	let sql = `SELECT * FROM usort WHERE uid=$1`;
	pgdb.query(sql,[uid],(err,val)=>{
		if(err || val.rowCount<0){
			res.json({status:'-1',data:'error'})
		}else{
			if(val.rowCount=0){
				res.json({status:'-2',data:'未关注标签'})
			}else{
				let sql_usort = `SELECT `;
				res.json({status:'0',data:val.rows[0]})
			}
		}
	})		
})
module.exports = router;
