var express = require('express');
var router = express.Router();
var pg = require('pg');
var nodemail = require('./nodemailer'); 
var md5 = require('md5-node');

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
router.post('/forget',(req,res,next)=>{
    let data = req.body;
	res.setHeader('Content-Type','text/html;charset=utf-8');
	var mcode = createFourNum();
	let sql = `SELECT * FROM managers WHERE maname=$1`;
	pgdb.query(sql,[data.maname],(err,val)=>{
		if(err){
			res.json({status:'-1',data:'error'});
		}else{
			if(val.rowCount<=0){
				res.json({status:'1',data:'用户名错误'})
			}else{
                    var mail = {
                        from:'<2627405095@qq.com>',
                        subject:'妙笔作文后台管理修改密码凭证',
                        to:val.rows[0].memail,
                        text:'请用'+mcode+'作为你的验证码'
                    }
                    let sql_user =`UPDATE managers SET mcode = $2 WHERE memail = $1`;
                    pgdb.query(sql_user,[val.rows[0].memail,mcode],(err,val1)=>{
                        if(err){
                            res.json({status:'-1',data:'error'})
                        }else{
                            nodemail(mail);
                            res.json({status:'2',data:'发送成功'})
                        }
                    }) 	
            }
		}
		
	})
})
router.post('/forgetcode',(req,res,next)=>{
    let data = req.body;
    res.setHeader('Content-Type','text/html;charset=utf-8');
    let sql = `SELECT * FROM managers WHERE maname=$1`;
	pgdb.query(sql,[data.maname],(err,val)=>{
		if(err){
            res.json({status:'-1',data:'error'});
        }else{
		if(val.rowCount>0){
            		if(data.mcode === val.rows[0].mcode){
                		res.json({status:'0',data:'验证成功'})
            		}else{
                		res.json({status:'1',data:'验证码错误'})
            	}}else{
			        res.json({status:'2',data:'传入的用户名错误'})
		        }
        }
    })

})
router.post('/updatepassword',(req,res,next)=>{
    let data = req.body;
    res.setHeader('Content-Type','text/html;charset=utf-8');
    let sql = `SELECT * FROM managers WHERE maname=$1`;
	pgdb.query(sql,[data.maname],(err,val)=>{
		if(err){
			res.json({status:'-1',data:'error'});
		}else{
            if(val.rowCount>0){
                let sql_isLive = `UPDATE managers SET mapassword=$1 WHERE maname=$2`;
                pgdb.query(sql_isLive,[md5(data.mapassword),data.maname],(err,val1)=>{
                	if(err){
                		res.json({status:'-1',data:'error'})
                	}else{
                		res.json({status:'0',data:'密码已经修改，快去登录吧'})
                	}
                })
            }else{
                res.json({status:'-2',data:'用户名错误'})
            }
        }
    })
})
function createFourNum(){
	var Num='';
	for(var i=0;i<4;i++){
		Num+=Math.floor(Math.random()*10);
	}
	return Num;
}
module.exports = router;

