const express = require('express');
const router = express.Router();
const Supvsr = require('../models/supervisor');
/* GET users listing. */
router.post('/add', async (req, res, next)=> {
    let {roleid,staffid} = req.body;
    try {
        let newSupvrs = await Supvsr.create({
            roleid,
            staffid,
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

 /*****fetch tasks******/
 router.get('/task/:id', async (req,res,nex)=>{
     let {id} = req.params;
    try {
     const  alltask = await Task.findAll({where:{supervisorid:id}})
     if(alltask){
         res.json({
            meta:{
                message:'Success',
                status:'Ok',
            },
            data:alltask,
        })
     } else{
         res.json({
             meta:{
                 message:'No Tasks',
                 status:'Failed',
             },
             data:{},
         })
     }
    } catch (error) {
        res.json({
            meta:{
                message:`Couldnt find Task ${error}`,
                status:'Failed',
            },
            data:{},
        })
    }
})
/***   ***/ 

router.delete('/delete/:id', async (req, res, next)=>{
    try{
     let {id} = req.param
     rslt  =await Supvsr.destroy({
         where:{staffid:id}
     })
     !!rslt ? res.json({
         meta:{
             status:'Ok',
             message:'Supervisor deleted ',
         },
         data:{},
     })
     :res.json({
         meta:{
             message:'Couldnt delete Supervisor',
             status:'Failed',
         },
         data:{},
     })
    }catch(error){
     res.json({
         meta:{
             message:`Couldnt delete Supervisor ${error}`,
             status:'Failed ',
         },
         data:{},
     })
    }
 });
module.exports = router;
