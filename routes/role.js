const express = require('express');
const router = express.Router();
const Role = require('../models/roles');
/* GET users listing. */
router.post('/', async (req, res, next)=> {
    let {name} = req.body;
    try {
        let newRole = await Role.create({
            name,
        },{
            fields:["name"]
        });
        if(newRole){
            res.json({
                meta:{
                    status:"Ok",
                message:'Success',
                },
                data:newRole,
            })
        }else{
            res.json({
                meta:{status:'failed',
                message:'not successful',
            },
                data:{},
            })
        }
    } catch (error) {
        res.json({
            meta:{
            status:'failed',
            message:`Role failed to create ${error}`,
            },
            data:{},
        })
    }
    res.json({
        data:'request sent!',
    })
});

module.exports = router;
