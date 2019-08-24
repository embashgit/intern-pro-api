const express = require('express');
const router = express.Router();
const Task = require('../models/task');
/* GET users listing. */
router.post('/', async (req, res, next)=> {
    let {title,description,duedate,status,staffid} = req.body;
    try {
        let newtask = await Task.create({
            title,
            description,
            duedate,
            status,
            staffid,
        },{
        });
        if(newtask){
            res.json({
                meta:{
                status:"Ok",
                message:"Success"
                },
                data:newtask,
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
            message:`Task failed to create ${error}`,
            },
            data:{},
        })
    }
    res.json({
        data:'request sent!',
    })
});

module.exports = router;
