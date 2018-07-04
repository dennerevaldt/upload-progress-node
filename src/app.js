const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage });

app.use(express.static(path.join(__dirname, "../public")));

app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.post('/', upload.single('file'), (req, res, next) => {
  res.json({
    path: req.file.path
  });
});

app.get('/', (req, res, next) => {
  res.render('index');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log('Listening 8080'));