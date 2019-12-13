var express = require('express');
var router = express.Router();
var pg = require('pg');
var md5 = require('md5-node');

var pgdb = new pg.Pool({
    host: '127.0.0.1',
    port: 5432,
    user: 'dongxin',
    password: '111111',
    database: 'dongxin'
});

router.get('/',(req,res,next)=>{
    let sql = `SELECT * FROM users`;
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
//用户我的页面
router.get('/me/:uid',(req,res,next)=>{
    let uid = req.params.uid;
    let sql_ufans = 'SELECT COUNT(uid) FROM userconcern WHERE uid = $1';
    pgdb.query(sql_ufans,[uid],(err,val)=>{
        if(err){
                res.json({status:'-1',data:'error'});
        }else{
                let sql_users = 'UPDATE users SET ufans=$1 WHERE uid=$2';
                pgdb.query(sql_users,[val.rows[0].count,uid],(err,val)=>{
                    if(err){
                            res.json({status:'-2',data:'error'})
                    }else{
                        let sql = `SELECT uid,uname,uemail,uimage,udescribe,ufans FROM users WHERE uid=$1`;
                        pgdb.query(sql,[uid],(err,val)=>{
                            if(err || val.rowCount<=0){
                                res.json({status:'-3',data:'error'});
                            }else{
                                res.json({status:'0',data:val.rows[0]})
                            }
                        })
                    }
                })
            }
    })
})

//用户关注(不太对)
router.post('/userconcern',(req,res,next)=>{
	let data = req.body;
if(data.uid!==data.upid){
	let sql = `SELECT * FROM userconcern WHERE uid=$1 AND upid=$2`;
	pgdb.query(sql,[data.uid,data.upid],(err,val)=>{
		if(err){
			res.json({status:'-1',data:'error'})
		}else{
			if(val.rowCount>0){
				res.json({status:'1',data:'已经关注了该用户'})
			}else{
				let sql_con = `INSERT INTO userconcern (uid,upid) VALUES($1,$2)`
				pgdb.query(sql_con,[data.uid,data.upid],(err,data)=>{
					if(err){
						console.log(err)
						res.json({status:'-2',data:'关注失败，可能用户ID不存在'})
					}else{
						let sql_user = `UPDATE users SET ufans=$1 WHERE uid = $2`;
						
							res.json({status:'0',data:'关注成功'})
						
					
					}
				})
			}
		}
	})
}else{
	res.json({status:'-3',data:'自己不能关注自己'})

}	
})
//用户关注列表
router.get('/userconcern/:uid',(req,res,next)=>{
	let uid = req.params.uid;
	let sql = `SELECT b.* FROM userconcern as a LEFT JOIN users as b ON a.upid = b.uid WHERE a.uid = $1`;
	pgdb.query(sql,[uid],(err,val)=>{
		if(err){
			res.json({status:'-1',data:'error'})
		}else{
			res.json({status:'0',data:val.rows})
		}
	})
})
//用户粉丝列表显示
router.get('/fans/:uid',(req,res,next)=>{
	let uid = req.params.uid;
	let sql = `SELECT b.* FROM userconcern as a LEFT JOIN users as b ON a.upid = b.uid WHERE a.upid = $1`;
        pgdb.query(sql,[uid],(err,val)=>{
                if(err){
                        res.json({status:'-1',data:'error'})
                }else{
                        res.json({status:'0',data:val.rows})
                }
        })

})

//用户收藏素材列表显示

//用户点赞列表显示
router.get('/materialcollection/:uid',(req,res,next)=>{
    let uid = req.params.uid;
    let sql = `SELECT b.* FROM materialcollection as a LEFT JOIN material as b ON a.mid = b.mid WHERE a.uid = $1`;
    pgdb.query(sql,[uid],(err,val)=>{
            if(err){
                    res.json({status:'-1',data:'error'})
            }else{
                    res.json({status:'0',data:val.rows})
            }
    })
})

router.get('/marticlelikes/:uid',(req,res,next)=>{
    let uid = req.params.uid;
    let sql = `SELECT b.* FROM articlelikes as a LEFT JOIN article as b ON a.aid = b.aid WHERE a.uid = $1`;
    pgdb.query(sql,[uid],(err,val)=>{
            if(err){
                    res.json({status:'-1',data:'error'})
            }else{
                    res.json({status:'0',data:val.rows})
            }
    })
})
router.get('/mcomment/:uid',(req,res,next)=>{
	let uid = req.params.uid;
	let sql = `SELECT * FROM materialcomment WHERE uid=$1`;
	pgdb.query(sql,[uid],(err,val)=>{
		if(err || val.rowCount<0){
			res.json({status:'-1',data:'error'});
		}else{
			res.json({status:'0',data:val.rows});
		}
	})
})
router.get('/acomment/:uid',(req,res,next)=>{
        let uid = req.params.uid;
        let sql = `SELECT * FROM articlecomment WHERE uid=$1`;
        pgdb.query(sql,[uid],(err,val)=>{
                if(err || val.rowCount<0){
                        res.json({status:'-1',data:'error'});
                }else{
                        res.json({status:'0',data:val.rows});
                }
        })
})

//用户的动态显示
router.get('/article/:uid',(req,res,next)=>{
    let uid = req.params.uid;
    let sql = `SELECT * FROM article WHERE uid = $1`;
    pgdb.query(sql,[uid],(err,val)=>{
            if(err){
                    res.json({status:'-1',data:'error'})
            }else{
                    res.json({status:'0',data:val.rows})
            }
    })
})
//用户的评论
//退出登录
router.post('/exit',(req,res,next)=>{
    let data = req.body;
    let sql = `UPDATE users SET ustatus = 0 WHERE uemail=$1`;
    pgdb.query(sql,[data.uemail],(err,val)=>{
        if(err){
            res.json({status:'-1',data:'error'})
        }else{
            res.json({status:'0',data:'退出登录'})
        }
    })
})
router.post('/',function(req,res,next){
    let data = req.body;
    console.log(data);
    res.setHeader('Content-Type','text/html;charset=utf-8');
    let sql = `SELECT upassword,ustatus FROM users WHERE uemail=$1`;
    pgdb.query(sql,[data.uemail],(err,val)=>{
        if(err|| val.rowCount<0){
		res.json({status:'-1',data:'error'});
	} else{
		if(val.rowCount>0){
			if(val.rows[0].upassword === md5(data.upassword)){
				let sql_status = `UPDATE users SET ustatus = $1 WHERE uemail = $2`;
				pgdb.query(sql_status,[1,data.uemail],(err,val1)=>{
				if(err){
					res.json({status:'-2',data:'error'})
				}else{
					let sql_uid = `SELECT uid FROM users WHERE uemail = $1`;
					pgdb.query(sql_uid,[data.uemail],(err,val2)=>{
						if(err){
							console.log(err);
							res.json({status:'-3',data:'error'})
						}else{
							console.log(val2.rows[0].uid);
							res.json({status:'0',data:val2.rows[0].uid})
						}
					})
				}
				})
							
			}else{
				console.log(val.rows);
				res.json({status:'1',data:'password error'})
			}
		}
		else{
			res.json({status:'2',data:'not exist'})
		}
	}

    })

})
module.exports = router;

