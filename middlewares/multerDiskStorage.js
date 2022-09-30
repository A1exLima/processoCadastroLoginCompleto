const multer = require('multer');
const path = require('path');

const multerDiskStorage = multer.diskStorage({

    destination: (req, file, cb)=>{  

        const folder = path.join(__dirname, "..//public/images/imageUser");
        cb(null, folder);
    },

    filename: (req, file, cb)=> {

        const imageName = file.fieldname + '_' + Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }

});

module.exports = multerDiskStorage;