var express = require('express');
var router = express.Router();
var pg = require('pg');
var md5 = require('md5-node');
let msg = {
    error:'',
    val:'',
    title:'',
    url:''
  }
 

var pgdb = new pg.Pool({
    host: '127.0.0.1',
    port: 5432,
    user: 'dongxin',
    password: '111111',
    database: 'dongxin'
});

router.get('/',(req,res,next)=>{
    let sql = `SELECT * FROM managers`;
	lend(sql,res);

});
function lend(sqlStr,res){
    pgdb.query(sqlStr,[],(err,val)=>{
        if(err || val.rowCount < 0){
            console.log(err);
            res.json({status:'1',data:'error'});
        }else{
            res.json({status:'0',data:val.rows});
        }
    });
}
router.post('/',function(req,res,next){
    let data = req.body;
    res.setHeader('Content-Type','text/html;charset=utf-8');
    let sql = `SELECT * FROM managers WHERE maname=$1`;
    pgdb.query(sql,[data.maname],(err,val)=>{
        if(err|| val.rowCount<0){
		res.json({status:'-1',data:'error'});
	} else{
		if(val.rowCount>0){
			if(val.rows[0].mapassword === md5(data.mapassword)){
				res.json({status:'0',data:'登录成功'})
			}else{
				res.json({status:'1',data:'密码错误'})
			}
		}
		else{
			res.json({status:'2',data:'登录账户不存在'})
		}
	}

    })

})
module.exports = router;

