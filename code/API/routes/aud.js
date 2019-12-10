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
//添加素材
router.post('/addmaterial',(req,res,next)=>{
    let data = req.body;
console.log(data);
    res.setHeader('Content-Type','text/html;charset=utf-8');
    let sql = `SELECT MAX(mid) FROM material`;
	pgdb.query(sql,[],(err,val)=>{
		if(err){
            res.json({status:'-1',data:'error'});
        }else{
            let mid = val.rows[0].max+1;
            let sql_add = `INSERT INTO material (mid,mtitle,mlocal,manalyse,mcontent,mimage,msid) VALUES ($1,$2,$3,$4,$5,$6,$7)`;
            pgdb.query(sql_add,[mid,data.mtitle,data.mlocal,data.manalyse,data.mcontent,data.mimage,data.msid],(err,val)=>{
                if(err){
			console.log(err);
                    res.json({status:'-1',data:'error'})
                }else{
                    res.json({status:'0',data:val.rows})
                }
            })
        }
    })

})
//删除素材
router.post('/delmaterial',(req,res,next)=>{
    let data = req.body;
    let sql = `DELETE FROM material WHERE mid=$1`;
    pgdb.query(sql,[data.mid],(err,val)=>{
        if(err){
            res.json({status:'-1',data:'error'})
        }else{
            res.json({status:'0',data:'删除成功'})
        }
    })
})
router.post('/addarticle',(req,res,next)=>{
    let data = req.body;
    console.log(data);
    res.setHeader('Content-Type','text/html;charset=utf-8');
    let sql = `SELECT MAX(aid) FROM article`;
    pgdb.query(sql,[],(err,val)=>{
    if(err){
        res.json({status:'-1',data:'error'});
    }else{
        let aid = val.rows[0].max+1;
        let sql_add = `INSERT INTO article (aid,atitle,acontent,atag,utime,uid,mid) VALUES ($1,$2,$3,$4,$5,$6,$7)`;
        pgdb.query(sql_add,[aid,data.atitle,data.acontent,data.atag,data.utime,data.uid,data.mid],(err,val)=>{
            if(err){
                console.log(err);
                res.json({status:'-1',data:'error'})
            }else{
                res.json({status:'0',data:val.rows})
            }
        })
    }
    })
})
router.post('/delarticle',(req,res,next)=>{
    let data = req.body;
    let sql = `DELETE FROM article WHERE aid=$1`;
    pgdb.query(sql,[data.aid],(err,val)=>{
        if(err){
            res.json({status:'-1',data:'error'})
        }else{
            res.json({status:'0',data:'删除成功'})
        }
    })
})

module.exports = router;
