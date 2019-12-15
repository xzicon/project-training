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
router.post('/update',(req,res,next)=>{
        let data = req.body;
        res.setHeader('Content-Type','text/html;charset=utf-8');
        let sql_del = `DELETE FROM usort WHERE uid=$1`;
	pgdb.query(sql_del,[data.uid],(err,val)=>{
		if(err || val.rowCount<0){
			res.json({status:'-2',data:'error'})
		}else{
			let sql = `UPDATE usort SET msid=$2,$2),($1,$3),($1,$4),($1,$5),($1,$6)`;
		        pgdb.query(sql,[data.uid,data.msid1,data.msid2,data.msid3,data.msid4,data.msid5],(err,val)=>{
                	if(err){
                        	res.json({status:'-1',data:'error'})
                	}else{
                        	console.log(val.rows[0]);
                        	res.json({status:'0',data:'修改标签成功'})
                	}
        		})

		}
	})
})

router.get('/tiaoguo',(req,res,next)=>{
	let sql_ms = `SELECT * FROM material ORDER BY mcomment DESC  LIMIT 10`;
        pgdb.query(sql_ms,[],(err,val1)=>{
        			if(err || val1.rowCount<0){
                                                res.json({status:'-1',data:'error'})
                                        }else{
                                                res.json({status:'0',data:val1.rows})
                                        }
                                })

	
})
router.get('/msid/:uid',(req,res,next)=>{
	let uid = req.params.uid;
        let sql = `SELECT a.msid,b.msname FROM usort as a LEFT JOIN msort as b ON a.msid=b.msid WHERE uid=$1`;
	pgdb.query(sql,[uid],(err,val)=>{
		if(err || val.rowCount<0){
			res.json({status:'-1',data:'error'})
		}else{
			res.json({status:'1',data:val.rows})
			
		}
	})
	
})
router.get('/tab/:msid',(req,res,next)=>{
	let msid  = req.params.msid;
	let sql = `SELECT * FROM material WHERE msid=$1 ORDER BY mtime DESC LIMIT 10`;
	pgdb.query(sql,[msid],(err,val)=>{
		if(err || val.rowCount<0){
			res.json({status:'-1',data:'error'})
		}else{
			//if(val.rowCount=0){
			//	res.json({status:'-2',data:'未关注标签'})
			//}else{
				res.json({status:'0',data:val.rows})
			//}
		}
	})		
})
module.exports = router;
