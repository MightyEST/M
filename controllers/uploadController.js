let multer = require('multer'); 

let IMGstorage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, 'public/img/'+ file.fieldname +'/')
  },
  filename : function(req, file, cb){
    cb(null,  Date.now()+'.' + file.originalname)
  }
});

let upload = multer({ storage: IMGstorage });
module.exports = upload;