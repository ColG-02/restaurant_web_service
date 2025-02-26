import express from 'express'
import UserM from '../models/user'

export class UserController{

    login = (req: express.Request, res: express.Response)=>{
        let usernameP = req.body.username;
        let passwordP = req.body.password;

        UserM.findOne({username: usernameP, password: passwordP, type: { $ne: 'admin' }}).then((user)=>{
            res.json(user);
        }).catch((err)=>{
            console.log(err)
        })
    }

    adminLogin = (req: express.Request, res: express.Response)=>{
        let usernameP = req.body.username;
        let passwordP = req.body.password;

        UserM.findOne({username: usernameP, password: passwordP, type: 'admin'}).then((user)=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err)
        })
    }



    register = (req: express.Request, res: express.Response)=>{
        let user = {
            username: req.body.username,
            password: req.body.password,
            question: req.body.question,
            answer: req.body.answer,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            gender: req.body.gender,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            card: req.body.card,
            type: req.body.type,
            profilePicture: req.body.profilePicture ? req.body.profilePicture : "",
            active: req.body.active
        }
        
        UserM.findOne({ email: user.email }).then((x) => {
            if (x) {
                UserM.findOne({ username: user.username }).then((x) => {
                    x ? res.json({
                        'errorMail': "E-mail already taken",
                        'errorUser': "Username already taken"
                    }) : res.json({
                        'errorMail': "E-mail already taken",
                        'errorUser': ""
                    })
                }).catch(err => { console.log(err)})
            }
            else {
                UserM.findOne({ username: user.username }).then((x) => {
                    if (x) res.json({
                        'errorMail': "",
                        'errorUser': "Username already taken"
                    })
                    else {
                        new UserM(user).save().then(ok=>{
                                res.json(user);
                            }).catch(err=>{
                                console.log(err)
                            })
                    }
                }).catch(err => { console.log(err) })
            }
        }
        ).catch(err => { console.log(err)})
    }


    getQuestion = (req: express.Request, res: express.Response)=>{
        let usernameP = req.body.username;
        UserM.findOne({username: usernameP}).then((user)=>{
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user.question);
        }).catch((err)=>{
            console.log(err)
        })
    }

    goToReset = (req: express.Request, res: express.Response)=>{
        let usernameP = req.body.username;
        let answerP = req.body.answer;

        UserM.findOne({username: usernameP, answer:answerP}).then((user)=>{
            res.json(user);
        }).catch((err)=>{
            console.log(err)
        })
    }

    changePassword = (req: express.Request, res: express.Response)=>{
        let usernameP = req.body.username;
        let passwordP = req.body.newPassword;

        UserM.updateOne({username: usernameP}, {password:passwordP}).then((user)=>{
            res.json('ok');
        }).catch((err)=>{
            console.log(err)
        })
    }


    editProfile= (req: express.Request, res: express.Response)=>{
        
        let oldUsername = req.body.oldUsername;

        let user = {
            username: req.body.newUser.username,
            password: req.body.newUser.password,
            question: req.body.newUser.question,
            answer: req.body.newUser.answer,
            firstname: req.body.newUser.firstname,
            lastname: req.body.newUser.lastname,
            gender: req.body.newUser.gender,
            address: req.body.newUser.address,
            phone: req.body.newUser.phone,
            email: req.body.newUser.email,
            card: req.body.newUser.card,
            type: req.body.newUser.type,
            profilePicture: req.body.newUser.profilePicture ? req.body.newUser.profilePicture : "",
            active: req.body.newUser.active
        }

        UserM.findOneAndUpdate({ username: oldUsername }, user, { new: true }).then((user)=>{
            res.json(user);
        }).catch((err)=>{
            console.log(err)
        })

    }

    addPenaltyPoints = (req: express.Request, res: express.Response)=>{
        
        let username = req.body.name;
        UserM.findOneAndUpdate(
            { username: username }, { $inc: { active: 1 } },{ new: true } 
        ).then((user)=>{
            res.json("ok");
        }).catch((err)=>{
            console.log(err)
        })
    }

    getAll = (req: express.Request, res: express.Response)=>{
        UserM.find({}).then(users=>{
            res.json(users)
        }).catch((err)=>{
            console.log(err)
        })
    }

    setActive = (req: express.Request, res: express.Response)=>{
        let usernameP = req.body.username;
        let activeP = req.body.active;

        UserM.updateOne({username: usernameP}, {active: activeP}).then((user)=>{
            res.json('ok');
        }).catch((err)=>{
            console.log(err)
        })
    }


}