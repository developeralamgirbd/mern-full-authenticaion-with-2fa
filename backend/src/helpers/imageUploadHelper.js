const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'src/public/media');
    },
    filename: (req, file, cb)=>{
        const fileName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExt = path.extname(file.originalname);
        cb(null, fileName+fileExt);
    }
});

const maxSize =  1024; // max size 1MB

const fileFilter = (req, file, cp)=>{
    // allow image extension
    const isFileType = file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/webp';
    if ( isFileType ){
        cp(null, true);
    }else {
        cp(null, false);
        return cp(new Error('Only jpg, jpeg, png and webp format is allowed'));
    }
}

const upload = multer({
    storage: storage,
    fileFilter,
    limits: maxSize
}).single('photo')

module.exports = {upload}