const express = require('express');
const router = express.Router();
const Intern = require('../models/intern');
const staff = require('../models/staff');
const Task = require('../models/task');
/**** POST for adding Interns. ****/
router.post('/add', async (req, res, next)=> {
    let {status,
        institution,
        duedate,
        supervisorid,
        level,
        roleid,
        staffid,
    } = req.body;
    try {
      const checkrow = Intern.findOne({where:{staffid:staffid}})
        if(!checkrow){

        }else{
            const newIntern = await Intern.create({
                status,
                institution,
                supervisorid,
                duedate,
                level,
                staffid,
                roleid
            },{
                fields:["staffid","roleid","level","institution","supervisorid","duedate","status",]
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
                    status:'Failed',
                message:'unsuccessful',
                },
                data:{},
            })
        }
    }
    } catch (error) {
        res.json({
            meta:{
                status:'Failed',
                message:`Intern failed to create ${error}`,
            },
            data:{},
        })
    }
    res.json({
        data:'request sent!',
    })
});

/****** Get all interns ******/
router.get('/fetch', async (req, res, next)=> {
    let  internData = [];
        try{
            
            const Interns = await staff.findAll({ where:{
                roleid:3
            }});
        if(Interns){
            for(ntern of Interns){
                const user = await Intern.findOne({
                    where:{
                        staffid:ntern.id
                    }
                })
    
                    internData.push({
                        'intern':user,
                        'data':ntern
                    })
            
            }
            res.json({
               meta:{
                   status:'OK',
                   message:'Success',
               },
               data:internData,
           })
        }else{
            res.json({
                meta:{
                    status:'Failed',
                    message:'Fail to fetch user please try again',
                },
                data:{},
            })
        }
        }catch(error){
            res.json({
                meta:{
                    status:'Failed',
                    message:`Fail to fetch user ${error}`,
                },
                data:{},
            })
        }
    
    });
   
     /****** Get all intern's Tasks ******/
     router.get('/tasks/:id', async (req,res,nex)=>{
         let {id} = req.params;
         
        try {
      const alltask = await Task.findAll({where:{staffid:id}});

      let container =[];
      if(alltask){
         for(s of alltask){
             const user = await staff.findOne({
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
                message:`Couldnt Fetch Task ${error}`,
                status:'Failed',
            },
            data:{},
        })
    }
});


/**** delete intern  *****/
router.delete('/remove/:id', async (req, res, next)=>{
   try{
    let {id} = req.params
    rslt  =await Intern.destroy({
        where:{id}
    })
    !!rslt ? res.json({
        meta:{
            status:'Ok',
            message:'Intern role removed success',
        },
        data:{},
    })
    :res.json({
        meta:{
            message:'Couldnt remove intern',
            status:'Failed',
        },
        data:{},
    })
   }catch(error){
    res.json({
        meta:{
            message:`Couldnt remove intern ${error}`,
            status:'Failed ',
        },
        data:{},
    })
   }
});

module.exports = router;




// if(alltask.length){
//     for(task of alltask){
//      const supervisor = await staff.findByPk(task.supervisorid)
//      let supervisorname = `${supervisor.firstname} ${supervisor.surname}`;
//      let supervisormail = supervisor.email;
//      availableTask.push({
//          ta
//      })
//     }
//     res.json({
//      meta:{
//          message:'Success',
//          status:'Ok',
//      },
//      data:alltask,
    
//  })
// }
// else{
//     res.json({
//         meta:{
//             message:'No Task Assigned Yet',
//             status:'Failed',
//         },
//         data:{},
//     })
// }