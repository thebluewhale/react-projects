const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const PRIVATE_CONFIG = require('../configs/private');
const MLAB_USERNAME = PRIVATE_CONFIG.MLAB_USERNAME;
const MLAB_PASSWORD = PRIVATE_CONFIG.MLAB_PASSWORD;
const JWT_SECRET_KEY = PRIVATE_CONFIG.JWT_SECRET_KEY;

let mongodbURI = `mongodb://${MLAB_USERNAME}:${MLAB_PASSWORD}@ds251849.mlab.com:51849/my-marker-db`
let connection = null;

const connect = () => {
    if (connection && mongoose.connection.readyState === 1) {
        return Promise.resolve(connection);
    } else {
        return mongoose.connect(mongodbURI).then((conn) =>{
            connection = conn;
            return connection;
        });
    }
};

const createResponse = (status, header, body) => ({
    "statusCode": status,
    "headers": header,
    "body": JSON.stringify(body)
});

exports.addNewUser = (event, ctx, cb) => {
    ctx.callbackWaitsForEmptyEventLoop = false;
    let {username, password, email} = JSON.parse(event.body);
    let usernameRegex = /^[a-zA-Z0-9._-]+$/;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$/;

    if (!usernameRegex.test(username)) {
        cb(null, createResponse(400, {}, null));
    } else if (!emailRegex.test(email)) {
        cb(null, createResponse(400, {}, null));
    }

    const findUser = () => {
        let p = new Promise((resolve, reject) => {
            resolve(User.findOne({username: username}));
        });
        return p;
    };

    const create = (user) => {
        if (user) {
            return Promise.reject();
        } else {
            let newUser = new User({username, password, email});
            newUser.password = newUser.generateHash(password);
            return newUser.save();
        }
    };

    const respond = (user) => {
        let headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        };
        cb(null, createResponse(200, headers, user));
    };

    connect()
    .then(findUser)
    .then(create)
    .then(respond)
    .catch(() => {
        cb(null, createResponse(400, {}, {success: false}));
    });
};

exports.updateUser = (event, ctx, cb) => {
    ctx.callbackWaitsForEmptyEventLoop = false;
    let user_id = event.pathParameters.user_id;
    let updateData = JSON.parse(event.body);

    connect().then(() => {
        User.findOneAndUpdate({_id: user_id}, updateData, {new: true}).exec()
        .then((user) => {
            if (user) {
                cb(null, createResponse(200, {}, user));
            } else {
                cb(null, createResponse(400, {}, {success: false}));
            }
        });
    });
};

exports.deleteUser = (event, ctx, cb) => {
    ctx.callbackWaitsForEmptyEventLoop = false;
    let user_id = event.pathParameters.user_id;

    connect().then(() => {
        return User.remove({_id: user_id}).exec();
    }).then(() => {
        cb(null, createResponse(204, {}, null));
    });
};

exports.login = (event, ctx, cb) => {
    ctx.callbackWaitsForEmptyEventLoop = false;
    let {username, password} = JSON.parse(event.body);

    const findUser = () => {
        let p = new Promise((resolve, reject) => {
            resolve(User.findOne({username: username}));
        });
        return p;
    };

    const validateUser = (user) => {
        let p = new Promise((resolve, reject) => {
            if (!user) {
                reject();
            } else if (!user.verify(password, user.password)) {
                reject();
            } else {
                resolve(user);
            }
        });
        return p;
    };

    const generateToken = (user) => {
        let p = new Promise((resolve, reject) => {
            jwt.sign({
                _id: user._id,
                username: user.username
            }, JWT_SECRET_KEY, {
                expiresIn: '1d',
                issuer: 'my-marker.io',
                subject: 'userInfo'
            }, (error, token) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(token);
                }    
            });
        });
        return p;
    };

    const respond = (token) => {
        let expire = (1000 * 60 * 60 * 24 * 7);
        let headers = {
            "Set-Cookie": `access_token=${token}; Max-Age=${expire}; HttpOnly`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        };
        let body = {
            access_token: token,
            username
        };
        cb(null, createResponse(200, headers, body));
    };

    connect()
    .then(findUser)
    .then(validateUser)
    .then(generateToken)
    .then(respond)
    .catch((error) => {
        cb(null, createResponse(400, {}, error));
    });
}

exports.logout = (event, ctx, cb) => {
    ctx.callbackWaitsForEmptyEventLoop = false;
    let headers = {
        "Set-Cookie": null,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    };
    cb(null, createResponse(204, headers, null));
};

exports.checkToken = (event, ctx, cb) => {
    ctx.callbackWaitsForEmptyEventLoop = false;
    let { access_token } = JSON.parse(event.body);
    if (!access_token) {
        cb(null, createResponse(400, {}, null));
    }

    const verifyToken = (token) => {
        let p = new Promise((resolve, reject) => {
            jwt.verify(access_token, JWT_SECRET_KEY, (error, decoded) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(decoded);
                }
            });
        });
        return p;
    };

    const respond = (token) => {
        let res = {
            success: true,
            info: token
        };
        let headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        };
        cb(null, createResponse(200, headers, res));
    };

    verifyToken(access_token)
    .then(respond)
    .catch((error) => {
        cb(null, createResponse(400, {}, error));
    });
};