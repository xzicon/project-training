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
router.get('/pinglun/:uid',(req,res,next)=>{
    let uid = req.params.uid;
    //let sql = 'SELECT a.acid,a.accontent,a.actime,a.uid,b.*,c.uname,c.uimage FROM articlecomment as a LEFT JOIN article b ON a.aid = b.aid LEFT JOIN users as c ON c.uid=b.uid WHERE b.uid=$1';
    let sql = `select a.*,b.aid,b.atitle,c.* from articlecomment as a left join article as b on a.aid=b.aid left join users as c on c.uid=a.uid where b.uid=$1`;
	pgdb.query(sql,[uid],(err,val)=>{
            if(err || val.rowCount < 0){
                    console.log(err);
                    res.json({status:'1',data:'error'});
            }else{
                    res.json({status:'0',data:val.rows});
            }
        
    })

})
router.get('/zan/:uid',(req,res,next)=>{
    let uid = req.params.uid;
    //let sql = `SELECT b.*,c.uname,c.uimage FROM articlelikes as a LEFT JOIN article as b ON a.aid=b.aid LEFT JOIN users as c ON b.uid=c.uid WHERE c.uid=$1`;
    let sql = `select a.*,b.aid,b.atitle,c.* from articlelikes as a left join article as b on a.aid=b.aid left join users as c on c.uid=a.uid where b.uid=$1`;
	pgdb.query(sql,[uid],(err,val)=>{
        if(err || val.rowCount < 0){
                console.log(err);
                res.json({status:'1',data:'error'});
        }else{
                res.json({status:'0',data:val.rows});
        }
    
    })
})
module.exports = router;

