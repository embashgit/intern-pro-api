const express = require('express');
const bcrypt = require('bcrypt');
const axios = require('axios');
const pool = require('../bin/database/pool');
let db = require('../bin/database/db');
const saltRounds = 10;
const router = express.Router();
const Profile = require('../models/profile');
const staff = require('../models/staff');
const helper = require('../controller/helper')


// access entries 

/****** ALL PROFILE *****/
router.get('/profiles', async (req, res, next) => {
    try {
        const allprofile = await Profile.findAll();
        if (allprofile) {
            res.json({
                meta: {
                    status: "Ok",
                    message: 'Success',
                },
                data: allprofile,
            })
        }
        if (!allprofile.length) {
            res.json({
                meta: {
                    status: "Ok",
                    message: 'Success',
                },
                data: 'No record found',
            })
        }
    } catch (error) {
        res.json({
            meta: {
                status: 'failed',
                message: 'not successful',
            },
            data: `failed ${error}`
        })
    }
})
/* POST  users . */
router.post('/signup', async (req, res, next) => {
    let { username, password, staffid } = req.body;
    try {
        // let pHash = bcrypt.hashSync(password, saltRounds)

        let newProfile = await Profile.create({
            username,
            password: helper.hashPassword(password),
            staffid
        }, {
                fields: ["username", "password", "staffid"]
            });
        if (newProfile) {
            res.json({
                meta: {
                    status: "Ok",
                    message: 'Success',
                },
                data: newProfile,
            })
        } else {
            res.json({
                meta: {
                    status: 'failed',
                    message: 'not successful',
                },
                data: {},
            })
        }
    } catch (error) {
        res.json({
            meta: {
                status: 'failed',
                message: `Profile failed to create ${error}`,
            },
            data: {},
        })
    }
    res.json({
        data: 'request sent!',
    })
});

// GET data
router.get('/profile/:id', async (req, res, next) => {
    let { id } = req.params;
    try {
        let user = await staff.findOne({
            where: {
                id: id
            }
        })

        if (!user) {
            res.json({
                meta: {
                    status: 'failed',
                    message: `Integrity Constraint, user not found`,
                },
                data: {},
            })
        } else {
            let staff = Profile.findOne({
                where: {
                    staffid: id
                }
            });
            staff.then(rsp => {
                if (rsp) {
                    res.json({
                        meta: {
                            status: 'Ok',
                            message: `Success`,
                        },
                        data: { "profile": rsp.get(), "staff": user },
                    })
                } else {
                    res.json({
                        meta: {
                            status: 'Ok',
                            message: `Success`,
                        },
                        data: { "profile": {}, "staff": user },
                    })
                }
            })
        }
    } catch (error) {
        res.json({
            meta: {
                status: 'failed',
                message: `Network failed  ${error}`,
            },
            data: {},
        })
    }
})
/**
 * Login API
*/
router.post('/signin', async (req, res, next) => {
    let userprofile, data = [];
    let { username, password } = req.body;
    try {
        userprofile = await Profile.findOne({
            where: {
                username
            }
        });
        if (!userprofile) {
            res.json({
                meta: {
                    status: 'failed',
                    message: `User does not exist`,
                },
                data: {},
            })
        } else {

            let checkPwd = helper.comparePassword(userprofile.password, password);
            // let token = helper.generateToken(userprofile.staffid);
            //  let checkPwd =  bcrypt.compareSync(password,userprofile.password)

            if (checkPwd) {


                const user = staff.findByPk(userprofile.staffid);
                user.then(rsp => {
                    if (rsp) {
                        let dtails = rsp.get();
                        let access = [];
                        switch (dtails.roleid) {
                            case 1:
                                access = helper.admin
                                break;
                            case 2:
                                access = helper.supervisors
                                break;
                            case 3:
                                access = helper.intern
                                break;
                            default:
                                break;
                        }
                        res.status(200).json({
                            meta: {
                                status: 'Ok',
                                message: `Success`,
                            },
                            data: { 'user': rsp.get(), 'profile': userprofile, access },
                        })
                    } else {
                        res.status(401).json({
                            meta: {
                                status: 'Failed',
                                message: `User not Found`,
                            },
                            data: {},
                        })
                    }
                })
            } else {
                res.json({
                    meta: {
                        status: 'failed',
                        message: `Incorrect Password `,
                    },
                    data: {},
                })
            }
        }
    } catch (error) {
        res.json({
            meta: {
                status: 'failed',
                message: `Authentication failed failed  ${error}`,
            },
            data: {},
        })
    }
})

module.exports = router;
