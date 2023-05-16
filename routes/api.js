// 首頁在用的
var express = require('express');
var router = express.Router();
// 使用後端sqlite3
sqlite = require('sqlite3').verbose();
// 抓取sqlite檔
db = new sqlite.Database("./db.sqlite", sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

/* GET home page. */
// router.get('/', function(req, res, next) {
//     // res.render('index', { title: 'Express' });
//     const data = req.query;
//     console.log(data);
//     res.json(data);
// });
router.get('/', function(req, res, next) {
    sql= "SELECT * FROM quote";
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

router.post('/', (req, res) => {
    // const data = req.body;
    // console.log(data);
    // res.json(data);
    // 改成表格的欄位名稱
    const {date, name, price}=req.body;
    sql = "INSERT INTO quote (date, name, price) VALUES (?, ?, ?)";
    db.run(sql, [date, name, price], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }
        console.log('inserted');
    });
    return res.status(200).send('inserted');
});
module.exports = router;
