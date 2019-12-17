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
    let sql = `SELECT a.aid,a.atitle,a.acontent,a.aimage,a.atag,a.utime,a.acomment,a.alikes,b.mid,b.mtitle,c.uid,c.uname,c.uimage FROM article as a LEFT JOIN material b ON a.mid = b.mid LEFT JOIN users c ON a.uid = c.uid`;
    pgdb.query(sql,[],(err,val)=>{
        if(err || val.rowCount < 0){
            console.log(err);
            res.json({status:'1',data:'error'});
        }else{
            res.json({status:'0',data:val.rows});
        }
    });

});
router.get('/new',(req,res,next)=>{
	//select a.*,b.uid as like from article as a LEFT JOIN articlelikes as b ON a.aid = b.aid
	//let sql = `SELECT a.*,b.*,c.uid as beixihaun FROM article as a LEFT JOIN users as b ON a.uid=b.uid LEFT JOIN articlelikes as c ON c.aid=a.aid ORDER BY utime DESC`;
	let sql = `SELECT a.*,b.*  FROM article as a LEFT JOIN users as b ON a.uid=b.uid ORDER BY utime DESC`;
	pgdb.query(sql,[],(err,val)=>{
		if(err || val.rowCount < 0){
                        console.log(err);
                        res.json({status:'1',data:'error'})
                }else{

                        res.json({status:'0',data:val.rows})
                }		
	})
})
router.get('/all',(req,res,next)=>{

        let sql = `SELECT a.*,b.* FROM article as a LEFT JOIN users as b ON a.uid=b.uid  ORDER BY alikes  DESC`;
        pgdb.query(sql,[],(err,val)=>{
                if(err || val.rowCount < 0){
                        console.log(err);
                        res.json({status:'1',data:'error'})
                }else{
                        res.json({status:'0',data:val.rows})
                }
        })
})
/*router.get('/test/:uid',(req,res,next)=>{
	let sql = `SELECT * FROM`;
        let sql = `SELECT a.*,b.* FROM article as a LEFT JOIN users as b ON a.uid=b.uid  ORDER BY alikes  DESC`;
        pgdb.query(sql,[],(err,val)=>{
                if(err || val.rowCount < 0){
                        console.log(err);
                        res.json({status:'1',data:'error'})
                }else{
                        res.json({status:'0',data:val.rows})
                }
        })
})
*/
router.get('/xiangqing/:aid',(req,res,next)=>{
	let aid = req.params.aid;
	console.log('文章id',aid);
	let sql = `SELECT a.aid,a.atitle,a.acontent,a.aimage,a.atag,a.utime,a.acomment,a.alikes,b.mid,b.mtitle,c.uid,c.uname,c.uimage FROM article as a LEFT JOIN material b ON a.mid = b.mid LEFT JOIN users c ON a.uid = c.uid WHERE a.aid = $1`;
	pgdb.query(sql,[aid],(err,val)=>{
		if(err || val.rowCount < 0){
			console.log(err);
			res.json({status:'1',data:'error'})
		}else{
		
			res.json({status:'0',data:val.rows})
		}
	})
})
/*router.get('/test/:aid/:uid',(req,res,next)=>{
        let aid = req.params.aid;
	let uid = req.params.uid;
	console.log(aid,uid);
        console.log('文章id',aid);
        let sql_in = `SELECT a.* FROM article as a LEFT JOIN articlelikes as b ON a.aid=b.aid WHERE b.uid=$1`;
	pgdb.query(sql_in,[uid],(err,val)=>{
		if(err || val.rowCount<0){
			console.log(err)
			res.json({status:'-1',data:'error'})
		}else{
			res.json({status:'0',data:val.rows})
		}
	})
	let sql = `SELECT a.aid,a.atitle,a.acontent,a.aimage,a.atag,a.utime,a.acomment,a.alikes,a.status,b.mid,b.mtitle,c.uid,c.uname,c.uimage FROM article as a LEFT JOIN material b ON a.mid = b.mid LEFT JOIN users c ON a.uid = c.uid WHERE a.aid = $1`;
        pgdb.query(sql,[aid],(err,val)=>{
                if(err || val.rowCount < 0){
                        console.log(err);
                        res.json({status:'1',data:'error'})
                }else{

                        res.json({status:'0',data:val.rows})
                }
        })
})*/
router.get('/zuixin/:aid',(req,res,next)=>{
	let aid = req.params.aid;
	let sql = `SELECT * FROM articlecomment as a LEFT JOIN users as b ON a.uid=b.uid  WHERE aid = $1 ORDER BY actime DESC`;
	//let sql = `SELECT * FROM articlecomment as a LEFT JOIN users as b ON a.uid=b.uid  WHERE aid = $1`;
	pgdb.query(sql,[aid],(err,val)=>{
		if(err || val.rowCount < 0){
                        console.log(err);
                        res.json({status:'1',data:'error'})
                }else{

                        res.json({status:'0',data:val.rows})
                }

	})

});
/*router.get('/zuire/:aid',(req,res,next)=>{
    let aid = req.params.aid;
    let sql = `SELECT * FROM articlecomment as a LEFT JOIN users as b ON a.uid=b.uid  WHERE aid = $1 ORDER BY aclikes DESC`;
    pgdb.query(sql,[aid],(err,val)=>{
            if(err || val.rowCount < 0){
                    console.log(err);
                    res.json({status:'1',data:'error'})
            }else{

                    res.json({status:'0',data:val.rows})
            }

    })

});*/
router.get('/uconcern/:uid',(req,res,next)=>{
    let uid = req.params.uid;
    let sql = `SELECT a.*,b.*,c.uname,uimage FROM article as a LEFT JOIN userconcern as b ON a.uid=b.upid LEFT JOIN users as c ON c.uid=a.uid  WHERE b.uid = $1 ORDER BY utime DESC`;
    pgdb.query(sql,[uid],(err,val)=>{
            if(err || val.rowCount < 0){
                    console.log(err);
                    res.json({status:'-1',data:'error'})
            }else{
/*		if(val.rowCount=0){
			let sql_nouser = `SELECT * FROM users ORDER BY ufans DESC limit 5`;
			pgdb.query(sql,[],(err,val1)=>{
				if(err || val.rowCount < 0){
					console.log(err);
					res.json({status:'-2',data:'error'})
				}else{
					res,json({status:'1',data:val1.rows});
				}
			})
		}else{
                    res.json({status:'0',data:val.rows})
		}*/
	//	if(val.rowCount===0){
	//		res.json({status:'1',data:'未关注任何人，快去关注吧'})
	//	}else{
			res.json({status:'0',data:val.rows})
	//	}
            }

    })

});

module.exports = router;
