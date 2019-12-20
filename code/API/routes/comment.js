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
router.get('/material',(req,res,next)=>{
    let sql = `SELECT a.*,b.mtitle FROM materialcomment as a LEFT JOIN material as b ON a.mid = b.mid`;
    pgdb.query(sql,[],(err,val)=>{
        if(err){
            res.json({status:'-1',data:'error'})
        }else{
            res.json({status:'0',data:val.rows})
        }
    })
})
router.get('/article',(req,res,next)=>{
    let sql = `SELECT a.*,b.atitle FROM articlecomment as a LEFT JOIN article as b ON a.aid = b.aid`;
    pgdb.query(sql,[],(err,val)=>{
        if(err){
	console.log(err);
            res.json({status:'-1',data:'error'})
        }else{
            res.json({status:'0',data:val.rows})
        }
    })
})
router.post('/addmaterial',(req,res,next)=>{
    let data = req.body;
    res.setHeader('Content-Type','text/html;charset=utf-8');
    let sql = `SELECT MAX(mcid) FROM materialcomment`;
    pgdb.query(sql,[],(err,val)=>{
    if(err || val.rowCount<0){
        res.json({status:'-1',data:'error'});
    }else{
        let mcid = val.rows[0].max+1;
        let sql_add = `INSERT INTO materialcomment (mcid,mccontent,mctime,uid,mid) VALUES ($1,$2,$3,$4,$5)`;
        pgdb.query(sql_add,[mcid,data.mccontent,data.mctime,data.uid,data.mid],(err,val1)=>{
            if(err || val1.rowCount<0){
                console.log(err);
                res.json({status:'-1',data:'error'})
            }else{
		let sql_x = `SELECT COUNT(mcid) FROM materialcomment WHERE mid=$1`;
		pgdb.query(sql_x,[data.mid],(err,val2)=>{
			if(err || val2.rowCount<0){
				res.json({status:'-2',data:'error'})
			}else{
				console.log(val2.rows[0].count);
				let sql_i = `UPDATE material SET mcomment=$1 WHERE mid=$2`;
				pgdb.query(sql_i,[val2.rows[0].count,data.mid],(err,val3)=>{
					if(err || val3.rowCount<0){
						console.log(err)
						res.json({status:'-3',data:'error'})
					}else{
						res.json({status:'0',data:'添加素材评论成功'})
					}
				})	
			}
		})
                //res.json({status:'0',data:'添加素材评论成功'})
            }
        })
    }
    })
})

router.post('/addarticle',(req,res,next)=>{
    let data = req.body;
    res.setHeader('Content-Type','text/html;charset=utf-8');
    let sql = `SELECT MAX(acid) FROM articlecomment`;
    pgdb.query(sql,[],(err,val)=>{
    if(err || val.rowCount<0){
        res.json({status:'-1',data:'error'});
    }else{
        let acid = val.rows[0].max+1;
        let sql_add = `INSERT INTO articlecomment (acid,accontent,actime,uid,aid) VALUES ($1,$2,$3,$4,$5)`;
        pgdb.query(sql_add,[acid,data.accontent,data.actime,data.uid,data.aid],(err,val1)=>{
            if(err || val1.rowCount<0){
                console.log(err);
                res.json({status:'-1',data:'error'})
            }else{
		let sql_in = `SELECT COUNT(acid) FROM articlecomment WHERE aid=$1`;
		pgdb.query(sql_in,[data.aid],(err,val2)=>{
			if(err || val2.rowCount<0){
				console.log(err)
				res.json({status:'-2',data:'error'})
			}else{
				let sql_up = `UPDATE article set acomment = $1 WHERE aid=$2`;
				pgdb.query(sql_up,[val2.rows[0].count,data.aid],(err,val3)=>{
					if(err || val.rowCount<0){
						console.log(err);
						res.json({status:'-3',data:'error'})
					}else{
						res.json({status:'0',data:'添加作文评论成功'})
					}
				})	
			}
		})
                //res.json({status:'0',data:'添加文章评论成功'})
            }
        })
    }
    })
})
/*router.post('/delmaterial',(req,res,next)=>{
    let data = req.body;
    let sql = `DELETE FROM materialcomment WHERE mcid=$1`;
    pgdb.query(sql,[data.mcid],(err,val)=>{
        if(err){
            res.json({status:'-1',data:'error'})
        }else{
		let sql_x = `SELECT COUNT(mcid) FROM materialcomment WHERE mid=$1`;
                pgdb.query(sql_x,[data.mid],(err,val2)=>{
                        if(err || val2.rowCount<0){
                                res.json({status:'-2',data:'error'})
                        }else{
                                let sql_i = `UPDATE material SET mcomment=$1 WHERE mid=$2`;
                                pgdb.query(sql_i,[val2.rows[0].count,data.mid],(err,val3)=>{
                                        if(err || val3.rowCount<0){
                                                console.log(err)
                                                res.json({status:'-3',data:'error'})
                                        }else{
                                                res.json({status:'0',data:'删除素材评论成功'})
                                        }
                                })
                        }
                })

  //          res.json({status:'0',data:'删除成功'})
        }
    })
})*/
router.post('/delmaterial',(req,res,next)=>{
    let data = req.body;
	console.log(data);
/*    let sql_i1 = `SELECT mid FROM materialcomment WHERE mcid=$1`;
    pgdb.query(sql_i1,[data.mcid],(err,val0)=>{
        if(err || val0.rowCount<0){
            console.log(err)
		res.json({status:'-3',data:'error'})
        }else{
	console.log(val0.rows[0].mid);*/
            let sql = `DELETE FROM materialcomment WHERE mcid=$1`;
            pgdb.query(sql,[data.mcid],(err,val)=>{
                if(err || val.rowCount<0){
                    res.json({status:'-1',data:'error'})
                }else{ 
			 
                        let sql_x = `SELECT COUNT(mcid) FROM materialcomment WHERE mid=$1`;
                        pgdb.query(sql_x,[data.mid],(err,val2)=>{
                                if(err || val2.rowCount<0){                                
                                    res.json({status:'-2',data:'error'})                        
                                }else{                             
					console.log(val2.rows.count);
					console.log(data.mid);     
                                    let sql_i = `UPDATE material SET mcomment=$1 WHERE mid=$2`;                                                         
                                    pgdb.query(sql_i,[val2.rows[0].count,data.mid],(err,val3)=>{                                                                        
                                        if(err || val3.rowCount<0){
                                                console.log(err)                                                
                                                res.json({status:'-3',data:'error'})                                       
                                        }else{                                                  
                                                res.json({status:'0',data:'删除素材评论成功'})                             
                                        }
                                    })
                                }
                        })
                }
            })
  /*      }
    })*/
})

/*router.post('/delarticle',(req,res,next)=>{
    let data = req.body;
    let sql = `DELETE FROM articlecomment WHERE acid=$1`;
    pgdb.query(sql,[data.acid],(err,val)=>{
        if(err || val.rowCount<0){
            res.json({status:'-1',data:'error'})
        }else{
		let sql_in = `SELECT COUNT(acid) FROM articlecomment WHERE aid=$1`;
                pgdb.query(sql_in,[data.aid],(err,val2)=>{
                        if(err || val2.rowCount<0){
                                console.log(err)
                                res.json({status:'-2',data:'error'})
                        }else{
                                let sql_up = `UPDATE article set acomment = $1 WHERE aid=$2`;
                                pgdb.query(sql_up,[val2.rows[0].count,data.aid],(err,val3)=>{
                                        if(err || val.rowCount<0){
                                                console.log(err);
                                                res.json({status:'-3',data:'error'})
                                        }else{
                                                res.json({status:'0',data:'删除作文评论成功'})
                                        }
                                })
                        }
                })

//        res.json({status:'0',data:'删除成功'})
        }
    })
})
*/
router.post('/delarticle',(req,res,next)=>{
    let data = req.body;
    /*let sql_in1 = `SELECT aid FROM articlecomment WHERE acid=$1`;
    pgdb.query(sql_in1,[data.acid],(err,val0)=>{
        if(err || val0.rowCount<0){
            console.log(err);
            res.json({status:'-4',data:'error'})
        }else{*/
            let sql = `DELETE FROM articlecomment WHERE acid=$1`;
            pgdb.query(sql,[data.acid],(err,val)=>{
                if(err || val.rowCount<0){
                    res.json({status:'-1',data:'error'})
                }else{
                        let sql_in = `SELECT COUNT(acid) FROM articlecomment WHERE aid=$1`;
                        pgdb.query(sql_in,[data.aid],(err,val2)=>{
                                if(err || val2.rowCount<0){
                                        console.log(err)
                                        res.json({status:'-2',data:'error'})
                                }else{
                                        let sql_up = `UPDATE article set acomment = $1 WHERE aid=$2`;
                                        pgdb.query(sql_up,[val2.rows[0].count,data.aid],(err,val3)=>{
                                                if(err || val.rowCount<0){
                                                        console.log(err);
                                                        res.json({status:'-3',data:'error'})
                                                }else{
                                                        res.json({status:'0',data:'删除作文评论成功'})
                                                }
                                        })
                                }
                        })
                }
            })
  /*      }
    })*/
    
})
module.exports = router;


