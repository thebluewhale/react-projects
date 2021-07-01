import multer from 'multer';

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, __dirname + '/../../resources/videos');
	},
	filename: (req, file, callback) => {
		let newFileName = req.body.username + '_' + file.originalname;
		callback(null, newFileName);
	}
});

const limits = {fileSize: 10 * 1024 * 1024};

const fileFilter = (req, file, callback) => {
	if(file.mimetype === 'video/mp4') {
		callback(null, true);
	} else {
		req.fileValidationError = 'INVALID FILE TYPE';
		callback(null, false);
	}
};

const upload = multer({
	storage: storage,
	limits: limits,
	fileFilter: fileFilter
}).single('fileHandler');

export default upload;
