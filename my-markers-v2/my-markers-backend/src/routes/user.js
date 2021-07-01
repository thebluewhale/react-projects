const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../db/models/User');
const privateKey = require('../private/private');

router.post('/addnewuser', (req, res) => {
    let {username, password, email} = req.body;
    let usernameRegex = /^[a-zA-Z0-9._-]+$/;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$/;

    if (!usernameRegex.test(username) || username.length < 4 || username.length > 16) {
        return res.status(401).json({
            success: false,
            errorCode: 41
        });
    } else if (!emailRegex.test(email) || email.length > 32) {
        return res.status(401).json({
            success: false,
            errorCode: 42
        });
    } else if (password.length < 4 || password.length > 16) {
        return res.status(401).json({
            success: false,
            errorCode: 44
        });
    }

    User.findOne({username: username}, (error, data) => {
        if (error) {
            return res.status(401).json({
                success: false,
                errorCode: 50
            });
        } else if (data) {
            return res.status(401).json({
                success: false,
                errorCode: 43
            });
        }

        let newUser = new User({username, password, email});
        newUser.password = newUser.generateHash(password);
       
        newUser.save((error) => {
            if (error) {
                return res.status(401).json({
                    success: false,
                    errorCode: 50
                });
            } else {
                return res.status(200).json({
                    success: true
                });
            }
        });
    });
});

router.patch('/updateuser/:username', (req, res) => {
    let username = req.params.username;
    let { cur_password, new_password, new_email } = req.body.newData;

    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$/;
    if (new_email && (!emailRegex.test(new_email) || new_email.length > 32)) {
        return res.status(401).json({
            success: false,
            errorCode: 43
        });
    } else if (new_password && (new_password.length < 4 || new_password.length > 16)) {
        return res.status(401).json({
            success: false,
            errorCode: 44
        });
    }

    const findUser = () => {
        return new Promise((resolve) => {
            resolve(User.findOne({username: username}));
        });
    };

    const validatePassword = (user) => {
        return new Promise((resolve, reject) => {
            if (!user) {
                reject('41');
            } else if (!user.verify(cur_password, user.password)) {
                reject('42');
            } else {
                resolve(user);
            }
        });
    };

    const updateData = (user) => {
        user.email = new_email || user.email;
        user.password = new_password ? user.generateHash(new_password) : user.password;
        return user.save();
    };

    const respond = (user) => {
        let accountInfo = {
            username: user.username,
            email: user.email,
            created: user.created
        };
        return res.status(200).json({
            success: true,
            accountInfo
        });
    };

    findUser()
    .then(validatePassword)
    .then(updateData)
    .then(respond)
    .catch((error) => {
        return res.status(401).json({
            success: false,
            errorCode: error
        });
    });
});

router.post('/deleteuser', (req, res) => {
    if (!req.session.loginInfo || !req.session.loginInfo.username) {
        return res.status(500).json({
            success: false
        });
    }

    let username = req.session.loginInfo.username;
    let deleteConfirmPassword = req.body.deleteConfirmPassword;
    User.findOne({username: username}, (error, data) => {
        if (!data) {
            return res.status(401).json({
                success: false,
                errorCode: 41
            });
        } else if (!data.verify(deleteConfirmPassword, data.password)) {
            return res.status(401).json({
                success: false,
                errorCode: 42
            });
        } else {
            data.remove().then(() => {
                return res.status(200).json({
                    success: true
                });
            });
        }
    });
});

router.post('/login', (req, res) => {
    let {username, password} = req.body;

    User.findOne({username: username}, (error, data) => {
        if (error) {
            return res.status(500).json({
                success: false,
                errorCode: 50
            });
        } else if (!data) {
            return res.status(401).json({
                success: false,
                errorCode: 41
            });
        } else if (!data.verify(password, data.password)) {
            return res.status(401).json({
                success: false,
                errorCode: 42
            });
        }
        req.session.loginInfo = {
            username: username,
            isLoggedIn: true
        };
        req.session.save();
        return res.status(200).json({
            success: true,
            username: username,
            errorCode: -1
        });
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        return res.status(200).json({
            success: true
        });
    });
});

router.post('/checktoken', (req, res) => {
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(401).json({
            success: fasle
        });
    }
    return res.status(200).json({
        success: true
    });
});

router.get('/getaccountinfo', (req, res) => {
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(401).json({
            success: false
        });
    }
    let username = req.session.loginInfo.username;
    User.findOne({username: username}, (error, data) => {
        if (error) {
            return res.status(401).json({
                success: false
            });
        } else if (!data) {
            return res.status(401).json({
                success: false
            });
        } else {
            let accountInfo = {
                username: data.username,
                email: data.email,
                created: data.created
            };
            return res.status(200).json({
                success: true,
                accountInfo
            });
        }
    });
});

router.post('/sendtemppassword/:username', (req, res) => {
    function initMailService(tempPassword, receiver) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'google',
            auth: {
                user: privateKey.GOOGLE_ID,
                pass: privateKey.GOOGLE_PASSWORD
            }
        });
        let mailOption = {
            from: privateKey.GOOGLE_ID,
            to: receiver,
            subject: '임시비밀번호입니다.',
            html: `<div>임시 비밀번호 : <b>${tempPassword}</b></div>`
        };
        return {
            transporter,
            mailOption
        };
    };

    let username = req.params.username;
    User.findOne({username: username}, (error, data) => {
        if (error) {
            return res.status(501).json({
                success: false,
                errorCode: 51
            });
        } else if (!data) {
            return res.status(401).json({
                success: false,
                errorCode: 41
            });
        } else {
            let tempPassword = privateKey.generateRandomPassword(8);
            data.password = data.generateHash(tempPassword);
            data.save(() => {
                let { transporter, mailOption } = initMailService(tempPassword, data.email);
                transporter.sendMail(mailOption, (error, info) => {
                    if (error) {
                        return res.status(501).json({
                            success: false,
                            errorCode: 51
                        });
                    } else {
                        return res.status(200).json({
                            success: true
                        });
                    }
                });
            });
        }
    });
});

module.exports = router;
