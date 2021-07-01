const mongoose = require('mongoose');
const Marker = require('./models/Marker');
const MLAB_ACCOUNT = require('../configs/private');
const MLAB_USERNAME = MLAB_ACCOUNT.MLAB_USERNAME;
const MLAB_PASSWORD = MLAB_ACCOUNT.MLAB_PASSWORD;

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

exports.addNewMarker = (event, ctx, cb) => {
    ctx.callbackWaitsForEmptyEventLoop = false;
    let {title, username, note, lat, lng, category, addr} = JSON.parse(event.body).data;

    connect().then(() => {
        let marker = new Marker({
            title,
            username,
            note,
            lat,
            lng,
            category,
            addr
        });
        return marker.save();
    }).then((marker) => {
        let headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        };
        cb(null, createResponse(200, headers, marker));
    }).catch(
        e => cb(e)
    );
};

exports.getAllMarkers = (event, ctx, cb) => {
    ctx.callbackWaitsForEmptyEventLoop = false;
    let username = event.pathParameters.username;

    connect().then(() => {
        Marker.find({username: username}).sort({_id: -1})
        .limit(20).lean().exec().then((markers) => {
            let headers = {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            };
           cb(null, createResponse(200, headers, markers)); 
        });
    });
};

exports.getMarkersByKeyword = (event, ctx, cb) => {
    ctx.callbackWaitsForEmptyEventLoop = false;
    let { username, keyword } = event.queryStringParameters;

    connect().then(() => {
        Marker.find({$and: [{title: {$regex: keyword, $options: 'i'}}, {username: username}]})
        .sort({_id: -1}).lean().exec().then((markers) => {
            let headers = {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            };
            cb(null, createResponse(200, headers, markers));
        });
    });
};

exports.updateMarker = (event, ctx, cb) => {
    ctx.callbackWaitsForEmptyEventLoop = false;
    let marker_id = event.pathParameters.marker_id;
    let { updateData } = JSON.parse(event.body);

    connect().then(() => {
        Marker.findOneAndUpdate({_id: marker_id}, updateData, {new: true}).exec()
        .then((marker) => {
            if (marker) {
                let headers = {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true
                };
                cb(null, createResponse(200, headers, marker));
            } else {
                cb(null, {statusCode: 404});
            }
        });
    });
};

exports.deleteMarker = (event, ctx, cb) => {
    ctx.callbackWaitsForEmptyEventLoop = false;
    let marker_id = event.pathParameters.marker_id;

    connect().then(() => {
        return Marker.remove({_id: marker_id}).exec();
    }).then(() => {
        let headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        };
        cb(null, createResponse(204, headers, null));
    });
}