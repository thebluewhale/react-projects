const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, __dirname + '/../../resources');
    },
    filename: (req, file, callback) => {
        let split = file.originalname.split('.');
        let ext = '.' + split[split.length - 1];
        let d = new Date();
        let year = String(d.getFullYear()),
            month = String(d.getMonth()),
            date = String(d.getDate()),
            sec = String(d.getSeconds()),
            milsec = String(d.getMilliseconds());
        
        let newFileName = year + month + date + sec + milsec + ext;
        callback(null, newFileName);
    }
});

const limits = {
    fileSize: 10 * 1024 * 1024
};

const upload = multer({
    storage: storage,
    limits: limits
});

module.exports = upload;