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

router.get('/back',(req,res,next)=>{
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
router.get('/',(req,res,next)=>{
    let mtab = req.query.mtab;
    let msid = req.query.msid;
    let order = req.query.order;
    if(mtab===undefined&&msid===undefined&&order===undefined){
        let sql = 'SELECT a.*,b.* FROM material as a LEFT JOIN msort b ON a.msid = b.msid';
        pgdb.query(sql,[],(err,val)=>{
            if(err || val.rowCount < 0){
                console.log(err);
                res.json({status:'1',data:'error'});
            }else{
                res.json({status:'0',data:val.rows});
            }
        });
    }else if(mtab!==undefined&&msid===undefined&&order===undefined){
        //let sql = 'SELECT a.*,b.* FROM material as a LEFT JOIN msort b ON a.msid = b.msid WHERE b.mtab = $1';
        let sql = `SELECT * FROM msort WHERE mtab=$1`;
        pgdb.query(sql,[mtab],(err,val)=>{
            if(err || val.rowCount < 0){
                console.log(err);
                res.json({status:'1',data:'error'});
            }else{
                res.json({status:'0',data:val.rows});
            }
        });
    }else if(mtab!==undefined&&msid!==undefined&&order===undefined){
        let sql = `SELECT a.*,b.* FROM material as a LEFT JOIN msort b ON a.msid = b.msid WHERE a.msid = $1 AND b.mtab = $2`;
        pgdb.query(sql,[msid,mtab],(err,val)=>{
            if(err || val.rowCount < 0){
                console.log(err);
                res.json({status:'1',data:'error'});
            }else{
                res.json({status:'0',data:val.rows});
            }
        });
    }else if(mtab!==undefined&&msid!==undefined&&order!==undefined){
        let sql = `SELECT a.*,b.* FROM material as a LEFT JOIN msort b ON a.msid = b.msid WHERE a.msid = $1 AND b.mtab = $2 order by a.mcollect DESC`;
        pgdb.query(sql,[msid,mtab],(err,val)=>{
            if(err || val.rowCount < 0){
                console.log(err);
                res.json({status:'1',data:'error'});
            }else{
                res.json({status:'0',data:val.rows});
            }
        });
    }else{
        res.json({status:'-1',data:'页面不存在'})
    }
})


router.get('/:mid',(req,res,next)=>{
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
router.get('/:mid/:huifu',(req,res,next)=>{

    let mid = req.params.mid;
    let huifu = req.params.huifu;
if(huifu===undefined&&mid!==undefined){
	let sql = `SELECT * FROM material  WHERE mid = $1`;
                pgdb.query(sql,[mid],(err,val)=>{
                        if(err || val.rowCount < 0){
                                console.log(err);
                                res.json({status:'1',data:'error'});
                        }else{
                                res.json({status:'0',data:val.rows});
                        }

                })

}else if(huifu!==undefined&&mid!==undefined){
if(huifu==='lianbi'){
                let sql = `SELECT a.*,b.* FROM material as a, article as b WHERE a.mid = $1 AND b.mid = $1`;
                pgdb.query(sql,[mid],(err,val)=>{
                        if(err || val.rowCount < 0){
                                console.log(err);
                                res.json({status:'1',data:'error'});
                        }else{
                                res.json({status:'0',data:val.rows});
                        }

                })

        }else if(huifu==='pinglun'){
                let sql = `SELECT a.*,b.* FROM material as a LEFT JOIN materialcomment as b ON a.mid = b.mid WHERE msid = $1`;
                pgdb.query(sql,[mid],(err,val)=>{
                        if(err || val.rowCount < 0){
                                console.log(err);
                                res.json({status:'1',data:'error'});
                        }else{
                                res.json({status:'0',data:val.rows});
                        }

                })
}else{
	res.json({status:'-1',data:'页面不存在lianbipinglun'})
}
}else{
	 res.json({status:'-1',data:'页面不存在'})
}

})
   
module.exports = router;
