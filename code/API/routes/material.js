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
    let sql = `SELECT * FROM material`;
    pgdb.query(sql,[],(err,val)=>{
        if(err || val.rowCount < 0){
            console.log(err);
            res.json({status:'1',data:'error'});
        }else{
            res.json({status:'0',data:val.rows});
        }
    });

})
router.get('/mtab/:mtab',(req,res,next)=>{
    let mtab = req.params.mtab;
	let sql = `SELECT * FROM msort WHERE mtab=$1`;
        pgdb.query(sql,[mtab],(err,val)=>{
            if(err || val.rowCount < 0){
                console.log(err);
                res.json({status:'1',data:'error'});
            }else{
                res.json({status:'0',data:val.rows});
            }
        });
});
/*router.get('/mtab/:mtab/:msid',(req,res,next)=>{
    let mtab = req.params.mtab;
let msid = req.params.msid;
if(mtab!==undefined&&msid===undefined){
        let sql = `SELECT * FROM msort WHERE mtab=$1`;
        pgdb.query(sql,[mtab],(err,val)=>{
            if(err || val.rowCount < 0){
                console.log(err);
                res.json({status:'1',data:'error'});
            }else{
                res.json({status:'0',data:val.rows});
            }
        });
}else(mtab!==undefined&&msid!==undefined){
	let sql = 'SELECT a.*,b.* FROM material as a LEFT JOIN msort b ON a.msid = b.msid WHERE a.msid=$1 ORDER BY mtime DESC';
        pgdb.query(sql,[msid],(err,val)=>{
            if(err || val.rowCount < 0){
                console.log(err);
                res.json({status:'1',data:'error'});
            }else{
                res.json({status:'0',data:val.rows});
            }
        });
	
}else{
	res.json({status:'-1',data:'error'})
}
});
*/
/*router.get('/fenlei/zuixin/:msid',(req,res,next)=>{
    	let msid = req.params.msid;
   	let order = req.params.order;
	if(msid!==undefined){
        let sql = 'SELECT a.*,b.* FROM material as a LEFT JOIN msort b ON a.msid = b.msid WHERE a.msid=$1 ORDER BY mtime DESC';
        pgdb.query(sql,[msid],(err,val)=>{
            if(err || val.rowCount < 0){
                console.log(err);
                res.json({status:'1',data:'error'});
            }else{
                res.json({status:'0',data:val.rows});
            }
        });
	
    }
  else{
	res.json({status:'-1',data:'未传值'})
    }
})*/
router.get('/zuixin/:msid',(req,res,next)=>{
	let msid = req.params.msid;
	let sql = `SELECT * FROM material WHERE msid=$1 ORDER BY mtime DESC`;
	pgdb.query(sql,[msid],(err,val)=>{
		if(err || val.rowCount < 0){
                console.log(err);
                res.json({status:'-1',data:'error'});
            }else{
                res.json({status:'0',data:val.rows});
            }
		
	})
})
router.get('/zuire/:msid',(req,res,next)=>{
        let msid = req.params.msid;
        let sql = `SELECT * FROM material WHERE msid=$1 ORDER BY mcollect DESC`;
        pgdb.query(sql,[msid],(err,val)=>{
                if(err || val.rowCount < 0){
                console.log(err);
                res.json({status:'-1',data:'error'});
            }else{
                res.json({status:'0',data:val.rows});
            }

        })
})      

router.get('/fenlei/zuixin/',(req,res,next)=>{
	let mtab = req.query.mtab;        
	let msid = req.query.msid;
        if(msid!=='undefined'&&mtab!==undefined){
        let sql = 'SELECT a.*,b.* FROM material as a LEFT JOIN msort b ON a.msid = b.msid WHERE a.msid=$1 ORDER BY mtime DESC';
        pgdb.query(sql,[msid],(err,val)=>{
            if(err || val.rowCount < 0){
                console.log(err);
                res.json({status:'-5',data:'error'});
            }else{
                res.json({status:'0',data:val.rows});
            }
        });

    	}else if(msid==='undefined'&&mtab!==undefined){
		let sql = `SELECT * from msort WHERE mtab=$1`;
		pgdb.query(sql,[mtab],(err,val)=>{
			if(err || val.rowCount<0){
               		 console.log(err);
                	res.json({status:'1',data:'error'});
            		}else{
				if(val.rowCount===0){
					res.json({status:'-3',data:'msid不属于这个mtab'})
				}else{
					console.log(val.rows[0]);
					let sql1 = 'SELECT a.*,b.* FROM material as a LEFT JOIN msort b ON a.msid = b.msid WHERE a.msid=$1 ORDER BY mtime DESC';
        				pgdb.query(sql1,[val.rows[0].msid],(err,val1)=>{
            				if(err || val1.rowCount < 0){
                				console.log(err);
                				res.json({status:'-2',data:'error'});
            				}else{
                				res.json({status:'0',data:val1.rows});
            				}
			
  		});
}
            }

		})

	}
  else{
        res.json({status:'-1',data:'未传值'})
    }
})

/*router.get('/fenlei/zuire/',(req,res,next)=>{
let msid = req.params.msid;
if(msid!==undefined){
        let sql = 'SELECT a.*,b.* FROM material as a LEFT JOIN msort b ON a.msid = b.msid WHERE a.msid=$1 ORDER BY mcollect DESC';
        pgdb.query(sql,[msid],(err,val)=>{
            if(err || val.rowCount < 0){
                console.log(err);
                res.json({status:'1',data:'error'});
            }else{
                res.json({status:'0',data:val.rows});
            }
        });
    }
else{
        res.json({status:'-1',data:'未传值'})
    }
})*/
router.get('/fenlei/zuire/',(req,res,next)=>{
        let mtab = req.query.mtab;
        let msid = req.query.msid;
        if(msid!=='undefined'&&mtab!==undefined){
        let sql = 'SELECT a.*,b.* FROM material as a LEFT JOIN msort b ON a.msid = b.msid WHERE a.msid=$1 ORDER BY mcollect DESC';
        pgdb.query(sql,[msid],(err,val)=>{
            if(err || val.rowCount < 0){
                console.log(err);
                res.json({status:'-5',data:'error'});
            }else{
                res.json({status:'0',data:val.rows});
            }
        });

        }else if(msid==='undefined'&&mtab!==undefined){
                let sql = `SELECT * from msort WHERE mtab=$1`;
                pgdb.query(sql,[mtab],(err,val)=>{
                        if(err || val.rowCount<0){
                         console.log(err);
                        res.json({status:'1',data:'error'});
                        }else{
                        console.log(val.rows[0]);
                        let sql1 = 'SELECT a.*,b.* FROM material as a LEFT JOIN msort b ON a.msid = b.msid WHERE a.msid=$1 ORDER BY mcollect DESC';
                        pgdb.query(sql1,[val.rows[0].msid],(err,val1)=>{
                        if(err || val1.rowCount < 0){
                                console.log(err);
                                res.json({status:'-2',data:'error'});
                        }else{
                                res.json({status:'0',data:val1.rows});
                        }
                });
            }

                })

        }
  else{
        res.json({status:'-1',data:'未传值'})
    }
})


router.get('/xiangqing/:mid',(req,res,next)=>{
    let mid = req.params.mid;
	
    let sql = `SELECT * FROM material  WHERE mid = $1`;
    pgdb.query(sql,[mid],(err,val)=>{
            if(err || val.rowCount < 0){
                    console.log(err);
                    res.json({status:'1',data:'error'});
            }else{
                    res.json({status:'0',data:val.rows});
            }
        
    })

})
router.get('/xiang/:mid/:look',(req,res,next)=>{
    let mid = req.params.mid;
    let uid = req.params.look;
	/*let sql_add = `SELECT COUNT(mid) FROM materialcollection WHERE mid=$1`;
	pgdb.query(sql_add,[mid],(err,val1)=>{
	    if(err || val1.rowCount < 0){
                console.log(err);
                res.json({status:'-1',data:'error'});
            }else{
             let sql_mcol = `UPDATE material SET mcollect=$1 WHERE mid=$2`
                pgdb.query(sql_mcol,[val1.rows[0].count,mid],(err,val2)=>{
                    if(err || val2.rowCount < 0){
                        console.log(err);
                        res.json({status:'-2',data:'error'});
                    }else{*/
                        let sql = `SELECT d.*,c.uid as look FROM (SELECT a.*,e.* FROM material as a LEFT JOIN msort as e ON a.msid=e.msid WHERE a.mid = $1) as d LEFT JOIN (SELECT * FROM materialcollection as b WHERE b.uid=$2) as c
ON d.mid=c.mid`;
    			pgdb.query(sql,[mid,uid],(err,val)=>{
            			if(err || val.rowCount < 0){
                   			console.log(err);
                    			res.json({status:'1',data:'error'});
            			}else{
                    			res.json({status:'0',data:val.rows});
            		}

 			})
/*
                    }
                })
            }	
	})*/
    /*let sql = `SELECT d.*,c.uid as look FROM (SELECT a.* FROM material as a WHERE a.mid = $1) as d LEFT JOIN (SELECT * FROM materialcollection as b WHERE b.uid=$2) as c
ON d.mid=c.mid`;
    pgdb.query(sql,[mid,uid],(err,val)=>{
            if(err || val.rowCount < 0){
                    console.log(err);
                    res.json({status:'1',data:'error'});
            }else{
                    res.json({status:'0',data:val.rows});
            }

    })*/

})

router.get('/xiangqing/pinglun/:mid',(req,res,next)=>{
    let mid = req.params.mid;
    let sql = `SELECT a.*,b.* FROM materialcomment as a LEFT JOIN users as b ON a.uid=b.uid WHERE mid = $1 ORDER BY a.mctime DESC`;
    pgdb.query(sql,[mid],(err,val)=>{
            if(err || val.rowCount < 0){
                    console.log(err);
                    res.json({status:'1',data:'error'});
            }else{
                    res.json({status:'0',data:val.rows});
            }

    })

})
router.get('/xiangqing/lianbi/:mid',(req,res,next)=>{
    let mid = req.params.mid;
    let sql = `SELECT a.*,b.* FROM article as a LEFT JOIN users as b ON a.uid=b.uid WHERE mid = $1 ORDER BY a.alikes DESC`;
    pgdb.query(sql,[mid],(err,val)=>{
            if(err || val.rowCount < 0){
                    console.log(err);
                    res.json({status:'1',data:'error'});
            }else{
                    res.json({status:'0',data:val.rows});
            }

    })

})
router.get('/xiangqing/lianbi/new/:mid',(req,res,next)=>{
    let mid = req.params.mid;
    let sql = `SELECT a.*,b.* FROM article as a LEFT JOIN users as b ON a.uid=b.uid WHERE mid = $1 ORDER BY a.utime DESC`;
    pgdb.query(sql,[mid],(err,val)=>{
            if(err || val.rowCount < 0){
                    console.log(err);
                    res.json({status:'1',data:'error'});
            }else{
                    res.json({status:'0',data:val.rows});
            }

    })

})

module.exports = router;
