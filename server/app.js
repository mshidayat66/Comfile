let express = require("express");
let bodyparser = require("body-parser");
const path = require("path");
const multer = require("multer");

const assetDir = path.join(__dirname, "public");

let doc2pdf = require("docx-pdf");

const app = express();

app.use(express.static("server/public/uploads"));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

app.use(bodyparser.urlencoded({ extended: false }));

app.use(bodyparser.json());

app.get("/doc2pdf.html", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/doc2pdf.html"));
});

app.post("/doc2pdf", upload.single("file"), (req, res) => {
  console.log(req.file.path);
  let outputfilepath = Date.now() + "output.pdf";

  doc2pdf(req.file.path, outputfilepath, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.download(outputfilepath, () => {});
    }
  });
});
app.get("/selectneeds.html", (req, res) => {
  res.sendFile("/public/selectneeds.html", { root: __dirname });
});
app.get("/login.html", (req, res) => {
  res.sendFile("/public/login.html", { root: __dirname });
});
app.get("/signup.html", (req, res) => {
  res.sendFile("/public/signup.html", { root: __dirname });
});
app.get("/doc2pdf", (req, res) => {
  res.sendFile("/public/doc2pdf.html", { root: __dirname });
});
app.get("/", (req, res) => {
  res.sendFile("/public/index.html", { root: __dirname });
});

app.use(express.static(assetDir));

app.listen(3700, () => {
  console.log("Example app listening on port 3700!");
});
