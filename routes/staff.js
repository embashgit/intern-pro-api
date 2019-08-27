const express = require('express');
const router = express.Router();
const Staff = require('../models/staff');
// const sequelize = require('../../bin/database/db').sequelize;
/* GET users listing. */
router.post('/add', async (req, res, next) =>{
    let {firstname,middlename,surname,gender,email,jobtitle,age,roleid} = req.body;
   
    try {
        let newStaff =await Staff.create({
            firstname,
            middlename,
            surname,
            email,
            jobtitle,
            roleid,
            age,
            gender,
        },{
            fields:["firstname","middlename","email","surname","age","jobtitle","gender","roleid"]
        });
        if(newStaff){
            res.json({
                status:'ok',
                message:'Success',
                data:newStaff,
            })
        }else{
            res.json({
                status:'failed',
                message:'not successfull',
                data:{},
            })
        }
    } catch (error) {
        res.json({
            status:'failed',
            message:`Staff failed to create ${error}`,
            data:{},
        })
    }
    res.json({
        data:'request sent!',
    })
});

router.delete('/remove/:id', async (req, res, next)=>{
    try{
     let {id} = req.param
     rslt  =await Staff.destroy({
         where:{id}
     })
     !!rslt ? res.json({
         meta:{
             status:'Ok',
             message:' Staff removed ',
         },
         data:{},
     })
     :res.json({
         meta:{
             message:'Couldnt remove Staff',
             status:'Failed',
         },
         data:{},
     })
    }catch(error){
     res.json({
         meta:{
             message:`Couldnt remove Staff ${error}`,
             status:'Failed ',
         },
         data:{},
     })
    }
 });
module.exports = router;
