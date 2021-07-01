const mongoose = require('mongoose');
const privateKey = require('../private/private');

let dbuser = privateKey.MLAB_DBUSER;
let dbpassword = privateKey.MLAB_DBPASSWORD;
let mongodbURI = `mongodb://${dbuser}:${dbpassword}@ds151207.mlab.com:51207/mymarker`;
//let mongodbURI = 'mongodb://localhost:27017/markers';

module.exports = () => {
    function connect() {
        mongoose.connect(mongodbURI, function(error) {
            if (error) {
                console.error('mongodb connect failed : ', error);
            }
            console.log('mongodb connected successfully');
        });
    }
    connect();
    mongoose.connection.on('disconnected', connect);
};
