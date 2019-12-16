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
	let sql = `SELECT a.*,b.uname,b.uemail FROM feedback as a LEFT JOIN users as b ON a.uid=b.uid`;
	pgdb.query(sql,[],(err,val)=>{
		if(err || val.rowCount<0){
			res.json({status:'-1',data:'error'})
		}else{
			res.json({status:'0',data:val.rows})
		}
	})
})
router.post('/',(req,res,next)=>{
	let data = req.body;
	res.setHeader('Content-Type','text/html;charset=utf-8');
	let sql = `SELECT MAX(fid) FROM feedback`;
	pgdb.query(sql,[],(err,val)=>{
		if(err || val.rowCount<0){
			res.json({status:'-1',data:'error'})
		}else{
			let sql_in = `INSERT INTO feedback VALUES($1,$2,$3,$4)`;
			pgdb.query(sql_in,[val.rows[0].max+1,data.fcontent,data.ftime,data.uid],(err,val)=>{
			if(err||val.rowCount<0){
				console.log(err);
				res.json({status:'-2',data:'error'})
			}else{
				res.json({status:'0',data:'反馈成功'})
			}
			})
		}
	})
})

module.exports = router;
