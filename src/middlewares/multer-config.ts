import multer from 'multer';

const MIME_TYPES: Record<string, string> = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'img');
    },
    filename(req, file, callback) {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    },
});

const upload = multer({ storage: storage }).single('coverImage');

export default upload;
