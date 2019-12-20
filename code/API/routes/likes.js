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
//收藏素材
router.post('/material',(req,res,next)=>{
    let data=req.body;
    let sql = `INSERT INTO materialcollection (uid,mid) VALUES ($1,$2)`;
    pgdb.query(sql,[data.uid,data.mid],(err,val)=>{
        if(err || val.rowCount < 0){
            console.log(err);
		let sql_col = `SELECT COUNT(mid) FROM materialcollection WHERE mid=$1`;
            	pgdb.query(sql_col,[data.mid],(err,val1)=>{
                if(err || val1.rowCount < 0){
                    console.log(err);
                    res.json({status:'-5',data:'error'});
                }else{
                    let sql_mcol = `UPDATE material SET mcollect=$1 WHERE mid=$2`
                    pgdb.query(sql_mcol,[val1.rows[0].count,data.mid],(err,val2)=>{
                        if(err || val2.rowCount < 0){
                            console.log(err);
                            res.json({status:'-4',data:'error'});
                        }else{
                            res.json({status:'1',data:'已经收藏了哦'});
                        }
                    })
                }
            })

            //res.json({status:'-1',data:'已经收藏过了哦'});
        }else{
            let sql_col = `SELECT COUNT(mid) FROM materialcollection WHERE mid=$1`;
            pgdb.query(sql_col,[data.mid],(err,val1)=>{
                if(err || val1.rowCount < 0){
                    console.log(err);
                    res.json({status:'-2',data:'error'});
                }else{
                    let sql_mcol = `UPDATE material SET mcollect=$1 WHERE mid=$2`
                    pgdb.query(sql_mcol,[val1.rows[0].count,data.mid],(err,val2)=>{
                        if(err || val.rowCount < 0){
                            console.log(err);
                            res.json({status:'-3',data:'error'});
                        }else{
                            res.json({status:'0',data:'收藏成功'});
                        }
                    })
                }
            }) 
        }
    });
});
router.post('/delmaterial',(req,res,next)=>{
	let data=req.body;
	let sql = `DELETE FROM materialcollection where uid=$1 AND mid=$2`;
	pgdb.query(sql,[data.uid,data.mid],(err,val)=>{
		if(err || val.rowCount<0){
			console.log(err);
			res.json({status:'-1',data:'error'})
		}else{
	let sql_col = `SELECT COUNT(mid) FROM materialcollection WHERE mid=$1`;
		console.log(data.mid)
            pgdb.query(sql_col,[data.mid],(err,val1)=>{
                if(err || val.rowCount < 0){
                    console.log(err);
                    res.json({status:'-2',data:'error'});
                }else{
			console.log(val1.rows[0].count);
                    let sql_mcol = `UPDATE material SET mcollect=$1 WHERE mid=$2`
                    pgdb.query(sql_mcol,[val1.rows[0].count,data.mid],(err,val2)=>{
                        if(err || val.rowCount < 0){
                            console.log(err);
                            res.json({status:'-3',data:'error'});
                        }else{
                            res.json({status:'0',data:'取消收藏成功'});
                        }
                    })
                }
            })

		}
	})
})
router.post('/article',(req,res,next)=>{
    let data=req.body;
	let sql = `SELECT * FROM articlelikes WHERE uid = $1 AND aid = $2`;
	pgdb.query(sql,[data.uid,data.aid],(err,val)=>{
		if(err || val.rowCount<0){
			res.json({status:'-1',data:'error'})
		}else{
		if(val.rowCount===0){
				let sql_in = `INSERT INTO articlelikes (uid,aid) VALUES ($1,$2)`;
				pgdb.query(sql_in,[data.uid,data.aid],(err,val)=>{
					if(err || val.rowCount<0){
						console.log(err);
						res.json({status:'-2',data:'error'})
					}else{
						let sql_col = `SELECT COUNT(aid) FROM articlelikes WHERE aid=$1`;
 					          pgdb.query(sql_col,[data.aid],(err,val1)=>{
              					  if(err || val.rowCount < 0){
                 				   	console.log(err);
                   				 	res.json({status:'-3',data:'error'});
						}else{
                    					let sql_mcol = `UPDATE article SET alikes=$1 WHERE aid=$2`
                    					pgdb.query(sql_mcol,[val1.rows[0].count,data.aid],(err,val2)=>{
                        				if(err || val.rowCount < 0){
                            					console.log(err);
                            					res.json({status:'-4',data:'error'});
                        				}else{
                            					res.json({status:'0',data:'点赞成功'});
                        				}
                    					})
                				}
            					})
					}
				})
			}else{
				let sql_del = `DELETE FROM articlelikes WHERE uid=$1 AND aid=$2`;
				pgdb.query(sql_del,[data.uid,data.aid],(err,val)=>{
					if(err || val.rowCount<0){
                                                res.json({status:'-7',data:'error'})
                                        }else{
                                                let sql_col = `SELECT COUNT(aid) FROM articlelikes WHERE aid=$1`;
            					pgdb.query(sql_col,[data.aid],(err,val1)=>{
                				if(err || val.rowCount < 0){
                    					console.log(err);
                    					res.json({status:'-3',data:'error'});
                				}else{
                    					let sql_mcol = `UPDATE article SET alikes=$1 WHERE aid=$2`
                    					pgdb.query(sql_mcol,[val1.rows[0].count,data.aid],(err,val2)=>{
                        				if(err || val.rowCount < 0){
                            					console.log(err);
                            					res.json({status:'-4',data:'error'});
                        				}else{
                            					res.json({status:'1',data:'取消点赞成功'});
                        				}
                    					})
                				}
            					})
                                        }
				})
			}
		}	
	})
    /*let sql = `INSERT INTO articlelikes (uid,aid) VALUES ($1,$2)`;
    pgdb.query(sql,[data.uid,data.aid],(err,val)=>{
        if(err || val.rowCount < 0){
            console.log(err);
            res.json({status:'-1',data:'已经点过赞了哦~'});
        }else{
            let sql_col = `SELECT COUNT(aid) FROM articlelikes WHERE aid=$1`;
            pgdb.query(sql_col,[data.aid],(err,val1)=>{
                if(err || val.rowCount < 0){
                    console.log(err);
                    res.json({status:'-2',data:'error'});
                }else{
                    let sql_mcol = `UPDATE article SET alikes=$1 WHERE aid=$2`
                    pgdb.query(sql_mcol,[val1.rows[0].count,data.aid],(err,val2)=>{
                        if(err || val.rowCount < 0){
                            console.log(err);
                            res.json({status:'-3',data:'error'});
                        }else{
                            res.json({status:'0',data:'点赞成功'});
                        }
                    })
                }
            })
            
        }
    });*/
})
module.exports = router;

