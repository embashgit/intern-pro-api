const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
/* GET users listing. */
router.post('/add', async (req, res, next)=> {
    let {staffid,roleid} = req.body;
    try {
        let newAdmin = await Admin.create({
            staffid,
            roleid
        },{
            fields:["staffid","roleid"]
        });
        if(newAdmin){
            res.json({
                meta:{
                    status:'ok',
                    message:'Success',
                },
                data:newAdmin,
            })
        }else{
            res.json({
                status:'failed',
                message:'not successful',
                data:{},
            })
        }
    } catch (error) {
        res.json({
            meta:{
                status:'failed',
                message:`Admin failed to create ${error}`,
            },
            data:{},
        })
    }
    res.json({
        data:'request sent!',
    })
});



module.exports = router;
