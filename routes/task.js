const express = require('express');
const router = express.Router();
const Task = require('../models/task');
/* GET users listing. */
router.post('/add', async (req, res, next)=> {
    let {title,description,duedate,status,staffid} = req.body;
    try {
        // const checkrow = Task.findOne({where:{staffid:staffid,title:title,description:description}})
        // if(!checkrow){
            let newtask = await Task.create({
                title,
                description,
                duedate,
                status,
                staffid,
            },{
                fields: ["title", "description", "duedate","status","staffid"] 
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
        // }else{
        //     res.json({
        //         meta:{
        //             status:'failed',
        //         message:'unsuccessful Task already Assigned to user'
        //     },
        //         data:{},
        //     })
        // }
        
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

router.put('/progress/update',async (req,res, next)=>{
    try{
        let {id,status} =req.body;
     Task.findByPk(id).on('success', (tsk)=>{

         if(tsk){
            Task.update({
                status
            }).onsuccess(result=>{
                res.json({
                    meta:{
                    status:"Ok",
                    message:"Success"
                    },
                    data:result,
                })
            })
            .error(err=>{
                res.json({
                    meta:{
                    status:"Ok",
                    message:"Update Failed"
                    },
                    data:err,
                })
            })
         }
     })
    }catch(error){
        res.json({
            meta:{
            status:"Ok",
            message:"Update Failed"
            },
            data:error,
        })
    }
    
});



 /**** View all task assigned ****/

router.get('/fetch', async (req,res,nex)=>{
    try {
       alltask = await Task.findAll()
       !!alltask.length?res.json({
        meta:{
            message:'Success',
            status:'Ok',
        },
        data:alltask,
    })
    :res.json({
        meta:{
            message:'No Tasks',
            status:'Failed',
        },
        data:{},
    })
    } catch (error) {
        es.json({
            meta:{
                message:`Couldnt Task ${error}`,
                status:'Failed',
            },
            data:{},
        })
    }
})
 /**
  * Delete a task
  */
router.delete('/delete/:id', async (req, res, next)=>{
    try{
     let {id} = req.param
     rslt  =await Task.destroy({
         where:{id}
     })
     !!rslt ? res.json({
         meta:{
             status:'Ok',
             message:'Task deleted ',
         },
         data:{},
     })
     :res.json({
         meta:{
             message:'Couldnt delete Task',
             status:'Failed',
         },
         data:{},
     })
    }catch(error){
     res.json({
         meta:{
             message:`Couldnt delete intern ${error}`,
             status:'Failed ',
         },
         data:{},
     })
    }
 });
module.exports = router;
