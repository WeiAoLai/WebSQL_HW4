sqlite = require('sqlite3').verbose();
db = new sqlite.Database("./db.sqlite", sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});
// 電影台詞
sql = 'CREATE TABLE IF NOT EXISTS quote (ID INTEGER PRIMARY KEY AUTOINCREMENT, movie TEXT, quote TEXT, character TEXT)'
db.run(sql);
