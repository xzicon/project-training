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
router.post('/addmaterial',(req,res,next)=>{
    let data = req.body;
    res.setHeader('Content-Type','text/html;charset=utf-8');
    let sql = `SELECT MAX(mcid) FROM materialcomment`;
    pgdb.query(sql,[],(err,val)=>{
    if(err){
        res.json({status:'-1',data:'error'});
    }else{
        let mcid = val.rows[0].max+1;
        let sql_add = `INSERT INTO materialcomment (mcid,mccontent,mctime,uid,mid) VALUES ($1,$2,$3,$4,$5)`;
        pgdb.query(sql_add,[mcid,data.mccontent,data.mctime,data.uid,data.mid],(err,val)=>{
            if(err){
                console.log(err);
                res.json({status:'-1',data:'error'})
            }else{
                res.json({status:'0',data:'添加素材评论成功'})
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
    if(err){
        res.json({status:'-1',data:'error'});
    }else{
        let acid = val.rows[0].max+1;
        let sql_add = `INSERT INTO articlecomment (acid,accontent,actime,uid,aid) VALUES ($1,$2,$3,$4,$5)`;
        pgdb.query(sql_add,[acid,data.accontent,data.actime,data.uid,data.aid],(err,val)=>{
            if(err){
                console.log(err);
                res.json({status:'-1',data:'error'})
            }else{
                res.json({status:'0',data:'添加文章评论成功'})
            }
        })
    }
    })
})
router.post('/delmaterial',(req,res,next)=>{
    let data = req.body;
    let sql = `DELETE FROM materialcomment WHERE mcid=$1`;
    pgdb.query(sql,[data.mcid],(err,val)=>{
        if(err){
            res.json({status:'-1',data:'error'})
        }else{
            res.json({status:'0',data:'删除成功'})
        }
    })
})
router.post('/delarticle',(req,res,next)=>{
    let data = req.body;
    let sql = `DELETE FROM articlecomment WHERE acid=$1`;
    pgdb.query(sql,[data.acid],(err,val)=>{
        if(err){
            res.json({status:'-1',data:'error'})
        }else{
            res.json({status:'0',data:'删除成功'})
        }
    })
})

module.exports = router;


