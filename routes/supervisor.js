const express = require('express');
const router = express.Router();
const Supvsr = require('../models/supervisor');
/* GET users listing. */
router.post('/', async (req, res, next)=> {
    let {roleid,staffid} = req.body;
    try {
        let newSupvrs = await Supvsr.create({
            roleid,
            staffid,
            createdAt: new Date(),
            updatedAt: new Date()
        },{
        });
        if(newSupvrs){
            res.json({
                meta:{
                status:"Ok",
                message:"Success"
                },
                data:newSupvrs,
            })
        }else{
            res.json({
                meta:{
                    status:'failed',
                message:'unsuccessful'
            },
                data:{},
            })
        }
    } catch (error) {
        res.json({
            meta:{
            status:'failed',
            message:`Supervisor failed to create ${error}`,
            },
            data:{},
        })
    }
    res.json({
        data:'request sent!',
    })
});

module.exports = router;
