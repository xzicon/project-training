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
    let sql_ufans = 'SELECT COUNT(uid) FROM userconcern WHERE upid = $1';
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
		if(err || val.rowCount<0){
			res.json({status:'-1',data:'error'})
		}else{
			if(val.rowCount>0){
				let sql_del = `DELETE FROM userconcern WHERE uid=$1 AND upid=$2`;
				pgdb.query(sql_del,[data.uid,data.upid],(err,val)=>{
					if(err || val.rowCount<0){
						console.log(err);
						res.json({status:'-2',data:'error'})
					}else{
						res.json({status:'1',data:'取消关注了该用户'})
					}
				})
				//res.json({status:'1',data:'已经关注了该用户'})
			}else{
				let sql_con = `INSERT INTO userconcern (uid,upid) VALUES($1,$2)`
				pgdb.query(sql_con,[data.uid,data.upid],(err,data)=>{
					if(err || val.rowCount<0){
						console.log(err)
						res.json({status:'-2',data:'error'})
					}else{
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
//用户关注列表（优化）解决查看个人主页关注列表的问题
router.get('/guanzhu/:uid/:look',(req,res,next)=>{
        let uid = req.params.uid;
	let look = req.params.look;
	/*if(uid===look){
        let sql = `SELECT b.uid as taid,b.uname,b.udescribe,b.uid as woid FROM userconcern as a LEFT JOIN users as b ON a.upid = b.uid WHERE a.uid = $1`;
        pgdb.query(sql,[uid],(err,val)=>{
                if(err || val.rowCount<0){
			console.log(err)
                        res.json({status:'-1',data:'error'})
                }else{
                        res.json({status:'0',data:val.rows})
                }
        })
	}else{*/
		let sql = `select * from (select a.upid as taid,c.uname,c.udescribe  from userconcern as a LEFT JOIN users as c ON c.uid=a.upid WHERE a.uid=$1) as b LEFT JOIN (select d.upid as woid from userconcern as d where d.uid=$2) as e ON b.taid=e.woid`;
		pgdb.query(sql,[uid,look],(err,val)=>{
			if(err || val.rowCount<0){
				res.json({status:'-2',data:'error'})
			}else{
				res.json({status:'1',data:val.rows})
			}
		})
//	}
})

//用户粉丝列表显示
router.get('/fans/:uid',(req,res,next)=>{
	let uid = req.params.uid;
	//let sql = `SELECT b.*,c.uid as guanzhu FROM userconcern as a LEFT JOIN users as b ON a.uid = b.uid LEFT JOIN userconcern as c ON c.upid=b.uid WHERE a.upid = $1`;
        //let sql = `SELECT b.* as guanzhu FROM userconcern as a LEFT JOIN users as b ON a.uid = b.uid WHERE a.upid = $1`;
	let sql = `select d.*,c.* as guanzhu from (select u.uid as fans from userconcern as u where u.upid=$1) as a LEFT JOIN (select b.upid as guanzhu from userconcern as b where b.uid=$1)  as c ON a.fans = c.guanzhu LEFT JOIN users as d ON d.uid=a.fans`;
	pgdb.query(sql,[uid],(err,val)=>{
                if(err){
                        res.json({status:'-1',data:'error'})
                }else{
//			if(val.rowCount===0){
//				res.json({status:'1',data:'没有粉丝'})
//			}else{
                        	res.json({status:'0',data:val.rows})
//			}
                }
        })

})

//用户收藏素材列表显示

//用户点赞列表显示
router.get('/materialcollection/:uid',(req,res,next)=>{
    let uid = req.params.uid;
    let sql = `SELECT b.* FROM materialcollection as a LEFT JOIN material as b ON a.mid = b.mid WHERE a.uid = $1`;
    pgdb.query(sql,[uid],(err,val)=>{
            if(err || val.rowCount < 0){
                    res.json({status:'-1',data:'error'})
            }else{
//		if(val.rowCount===0){
//			res.json({status:'1',data:'未收藏过素材'})
//		}else{
                    res.json({status:'0',data:val.rows})
//		}
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
//		if(val.rowCount===0){
//			res.json({status:'1',data:'未点过赞'})
//		}else{
                    res.json({status:'0',data:val.rows})
//		}
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
//我的获赞
router.get('/likes/:uid',(req,res,next)=>{
	let uid = req.params.uid;
	//let sql = `select c.*,d.* from (select a.aid,a.atitle from article as a LEFT JOIN users as b ON a.uid=b.uid WHERE b.uid=$1) as c LEFT JOIN (select e.aid,f.uid,f.uname from articlelikes as e LEFT JOIN users as f ON e.uid=f.uid) as d ON c.aid=d.aid `;
	let sql = `select d.uid,d.uimage,d.uname,d.udescribe,c.aid,c.atitle,c.acontent FROM (select a.uid,b.aid,b.atitle,b.acontent from articlelikes as a LEFT JOIN article as b ON a.aid=b.aid WHERE b.uid=$1) as c LEFT JOIN users as d ON c.uid=d.uid`;
	pgdb.query(sql,[uid],(err,val)=>{
		if(err || val.rowCount<0){
			console.log(err);
			res.json({status:'-1',data:'error'})
		}else{
			res.json({status:'0',data:val.rows})
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
router.post('/update',(req,res,next)=>{
	let data = req.body;
	res.setHeader('Content-Type','text/html;charset=utf-8');
	let sql = `UPDATE users SET uname=$1,udescribe=$2,uimage=$4 WHERE uid=$3`;
	pgdb.query(sql,[data.uname,data.udescribe,data.uid,data.uimage],(err,val)=>{
		if(err || val.rowCount<0){
			console.log(err);
			res.json({status:'-1',data:'error'})
		}else{
			res.json({status:'0',data:'修改成功'})
		}
	})

})
router.post('/del',(req,res,next)=>{
	let data = req.body;
	res.setHeader('Content-Type','text/html;charset=utf-8');
	let sql = `DELETE FROM users WHERE uid=$1`;
	pgdb.query(sql,[data.uid],(err,val)=>{
		if(err || val.rowCount<0){
			console.log(err);
			res.json({status:'-1',data:'error'})
		}else{
			res.json({status:'0',data:'删除成功'})
		}
	})
})
module.exports = router;

