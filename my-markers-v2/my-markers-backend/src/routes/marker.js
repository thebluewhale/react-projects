const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Marker = require('../db/models/Marker');

router.post('/addnewmarker', (req, res) => {
    let {title, username, note, lat, lng, category, addr} = req.body.data;

    let newMarker = new Marker({
        title, username, note,
        lat, lng, category, addr
    });
    newMarker.save((error) => {
        if (error) {
            return res.status(401).json({
                success: false
            });
        }
        return res.status(200).json({
            success: true
        });
    });
});

router.get('/getallmarkers', (req, res) => {
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(401).json({
            success: false
        });
    }
    let username = req.session.loginInfo.username;

    Marker.find({username: username}).sort({_id: -1})
    .lean().exec().then((markers) => {
        return res.status(200).json({
            success: true,
            markers
        });
    });
});

router.get('/getmarkers/bykeyword', (req, res) => {
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(401).json({
            success: fasle
        });
    }

    let username = req.session.loginInfo.username;
    let keyword = req.query.keyword;

    //Marker.find({$and: [{title: {$regex: keyword, $options: 'i'}}, {username: username}]})
    Marker.find({$and: [{$or: [{title: {$regex: keyword, $options: 'i'}}, {note: {$regex: keyword, $options: 'i'}}, {addr: {$regex: keyword, $options: 'i'}}]}, {username: username}]})
    .sort({_id: -1}).lean().exec().then((markers) => {
        return res.status(200).json({
            success: true,
            markers
        });
    });
});

router.patch('/updatemarker/:marker_id', (req, res) => {
    let updateData = req.body.updateData;
    let marker_id = req.params.marker_id;

    Marker.findOneAndUpdate({_id: marker_id}, updateData, {new: true}).exec()
    .then((marker) => {
        if (marker) {
            return res.status(200).json({
                success: true,
                marker
            });
        } else {
            return res.status(401).json({
                success: false
            });
        }
    });
});

router.delete('/deletemarker/:marker_id', (req, res) => {
    let marker_id = req.params.marker_id;

    Marker.remove({_id: marker_id}).exec()
    .then(() => {
        return res.status(200).json({
            success: true
        });
    });
});

router.delete('/deleteallmarker/', (req, res) => {
    if (!req.session.loginInfo || !req.session.loginInfo.username) {
        return res.status(500).json({
            success: false
        });
    }

    let username = req.session.loginInfo.username;
    Marker.remove({username: username}).exec()
    .then(() => {
        req.session.destroy(() => {
            return res.status(200).json({
                success: true
            });
        });
    });
});

module.exports = router;