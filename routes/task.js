const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const Staff = require('../models/staff');
/* GET users listing. */
router.post('/add', async (req, res, next)=> {
    let {title,description,duedate,status,staffid,supervisorid} = req.body;
    try {
            let newtask = await Task.create({
                title,
                description,
                duedate,
                supervisorid,
                status,
                staffid,
            },{
                fields: ["title", "description", "duedate","status","staffid","supervisorid"] 
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

router.get('/fetch', async (req,res,next)=>{

    try {
     const  alltask = await Task.findAll();
     let container =[];
     if(alltask){
        for(s of alltask){
            const user = await Staff.findOne({
                where:{
                    id:s.supervisorid
                }
            })
            if(user){
                container.push({
                    'supervisor':`${user.firstname} ${user.surname}`,
                    'data':s
                })
            }else{
                container.push({
                    'supervisor':`null`,
                    'data':s
                })
            }
        
        }

         res.json({
            meta:{
                message:'Success',
                status:'Ok',
            },
            data:container,
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
});
 /**
  * Delete a task
  */
router.delete('/delete/:id', async (req, res, next)=>{
    try{
     let {id} = req.params;
    const rslt  =await Task.destroy({
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
