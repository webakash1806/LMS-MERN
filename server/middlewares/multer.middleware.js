import multer from 'multer'
import path from 'path'


const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 50 * 1024 * 1024 },
    storage: multer.diskStorage({
        destination: 'uploads/',
        filename: (_req, file, cb) => {
            cb(null, file.originalname)
        }
    }),
    fileFilter: (_req, file, cb) => {
        let ext = path.extname(file.originalname)

        if (
            ext !== ".jpg" &&
            ext !== ".jpeg" &&
            ext !== ".webp" &&
            ext !== ".mp4" &&
            ext !== ".png"
        ) {
            cb(new Error(`Unsupported file type! ${ext}`), false)
            return
        }
        cb(null, true)
    }
})
app.post('/stats', upload.single('uploaded_file'), function (req, res) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    console.log(req.file, req.body)
});