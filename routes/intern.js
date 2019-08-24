const express = require('express');
const router = express.Router();
const Intern = require('../models/intern');
/* GET users listing. */
router.post('/', async (req, res, next)=> {
    let {status,
        institution,
        duedate,
        level,
        roleid,
        staffid,
    } = req.body;
    try {
        let newIntern = await Intern.create({
            status,
            institution,
            duedate,
            level,
            staffid,
            roleid
        },{
            fields:["staffid","roleid","level","institution","duedate","status",]
        });
        if(newIntern){
            res.json({
                meta:{
                    status:'ok',
                    message:'Success',
                },
                data:newIntern,
            })
        }else{
            res.json({
                meta:{
                    status:'failed',
                message:'unsuccessful',
                },
                data:{},
            })
        }
    } catch (error) {
        res.json({
            meta:{
                status:'failed',
                message:`Intern failed to create ${error}`,
            },
            data:{},
        })
    }
    res.json({
        data:'request sent!',
    })
});

module.exports = router;
