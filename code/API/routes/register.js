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

router.post('/',(req,res,next)=>{
	let data = req.body;
	res.setHeader('Content-Type','text/html;charset=utf-8');
	var uid = 0;
	var code = createFourNum();
	console.log('uid',uid);
	let sql = `SELECT * FROM users WHERE uemail=$1`;
	pgdb.query(sql,[data.uemail],(err,val)=>{
		if(err){
			res.json({status:'-1',data:'error'});
		}else{
			console.log('查找结果:',val.rowCount);
			console.log('结果：',val.rows[0]);
			
			if(val.rowCount>0){
				res.json({status:'1',data:'该邮箱已经被注册了'})
			}else{
				let sql_uid = `SELECT MAX(uid) FROM users`;
	            pgdb.query(sql_uid,[],(err,val)=>{
                    if(err){
                        res.json({status:'-1',data:'error'})
                    }else{
                        var mail = {
                            from:'<2627405095@qq.com>',
                            subject:'妙笔作文注册凭证',
                            to:data.uemail,
                            text:'请用'+code+'作为你的验证码'
                        }
                        console.log(val.rows[0]);
                        var uid = val.rows[0].max+1;
                        console.log('该注册用户的uid:',uid);
			var uname = '妙笔'+uid;
                        let sql_user =`INSERT INTO users (uid,uname,uemail,upassword,code) VALUES ($1,$2,$3,$4,$5)`;
                        pgdb.query(sql_user,[uid,uname,data.uemail,md5(data.upassword),code],(err,val)=>{
                            if(err){
                                res.json({status:'-1',data:'error'})
                            }else{
                                nodemail(mail);
                                res.json({status:'2',data:'发送成功'})
                            }
                        }) 	
                    }
	            })
			}
		}
	})
 
})
router.post('/code',(req,res,next)=>{
    let data = req.body;
    res.setHeader('Content-Type','text/html;charset=utf-8');
    let sql = `SELECT * FROM users WHERE uemail=$1`;
	pgdb.query(sql,[data.uemail],(err,val)=>{
		if(err){
			res.json({status:'-1',data:'error'});
		}else{
			//console.log(val.rows[0].upassname);
  	        	if(val.rowCount>0){
			if(data.uemail === val.rows[0].uemail && val.rows[0].upassword === md5(data.upassword) && data.code === val.rows[0].code){
                		let sql_isLive = `UPDATE users SET isLive=$1`;
                		pgdb.query(sql_isLive,[1],(err,val1)=>{
                    		if(err){
                        		res.json({status:'-1',data:'error'})
                    		}else{
                        		res.json({status:'3',data:'验证码正确，注册成功，去登陆吧'})
                    		}
                		})
            		
           		 }else{
                		res.json({status:'4',data:'验证码错误，请重新获取验证码'})
            		 }
			}
        	}

    })
})
router.post('/forget',(req,res,next)=>{
    let data = req.body;
	res.setHeader('Content-Type','text/html;charset=utf-8');
	var code = createFourNum();
	let sql = `SELECT * FROM users WHERE uemail=$1`;
	pgdb.query(sql,[data.uemail],(err,val)=>{
		if(err){
			res.json({status:'-1',data:'error'});
		}else{
			if(val.rowCount<=0){
				res.json({status:'1',data:'该邮箱没有注册，请先去注册'})
			}else{
                    var mail = {
                        from:'<2627405095@qq.com>',
                        subject:'妙笔作文注册凭证',
                        to:data.uemail,
                        text:'请用'+code+'作为你的验证码'
                    }
                    let sql_user =`UPDATE users SET code = $2 WHERE uemail = $1`;
                    pgdb.query(sql_user,[data.uemail,code],(err,val)=>{
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
    let sql = `SELECT * FROM users WHERE uemail=$1`;
	pgdb.query(sql,[data.uemail],(err,val)=>{
		if(err){
            res.json({status:'-1',data:'error'});
        }else{
		if(val.rowCount>0){
            		if(data.uemail === val.rows[0].uemail && data.code === val.rows[0].code){
                		res.json({status:'0',data:'验证成功'})
            		}else{
                		res.json({status:'1',data:'验证码错误'})
            	}}else{
			res.json({status:'2',data:'QQ邮箱错误'})
		}
        }
    })

})
router.post('/updatepassword',(req,res,next)=>{
    let data = req.body;
    res.setHeader('Content-Type','text/html;charset=utf-8');
    let sql = `SELECT * FROM users WHERE uemail=$1`;
	pgdb.query(sql,[data.uemail],(err,val)=>{
		if(err){
			res.json({status:'-1',data:'error'});
		}else{
            if(val.rowCount>0){
                let sql_isLive = `UPDATE users SET upassword=$1 WHERE uemail=$2`;
                pgdb.query(sql_isLive,[md5(data.upassword),data.uemail],(err,val1)=>{
                	if(err){
                		res.json({status:'-1',data:'error'})
                	}else{
                		res.json({status:'0',data:'密码已经修改，快去登录吧'})
                	}
                })
            }else{
                res.json({status:'-2',data:'邮箱错误'})
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
