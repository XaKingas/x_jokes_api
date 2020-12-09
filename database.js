var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite.xa"


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,(err) => {
            if (err) {
                console.log(err)
                // Table already created
            } else {
                // Table just created, creating some rows
                var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
                db.run(insert, ["admin", "admin@example.com", md5("admin123456")])
                db.run(insert, ["user", "user@example.com", md5("user123456")])
                db.run(insert, ["test", "test@test.com", md5("test123456")])
            }
        })
            db.run(`CREATE TABLE category (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                category text
                      )`,(err) => {
                if (err) {
                    console.log(err)

                }else{
                    var insert = 'INSERT INTO category (category) VALUES (?)'
                    db.run(insert, ["test"])
                    db.run(insert, ["test"])
                    db.run(insert, ["test"])
                    db.run(insert, ["live"])
                    db.run(insert, ["live"])
                    db.run(insert, ["live"])
                }})

            db.run(`CREATE TABLE jokes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                created text,
                category text,
                joke_text text
             )`,(err) => {
                if (err) {
                  console.log(err)
                }else{
                    let date = Date.now()
                    date = date.toString()
            // Table just created, creating some rows
             var insert = 'INSERT INTO jokes (created, category, joke_text) VALUES (?,?,?)'
                    db.run(insert, [date, "test","This is a bad joke"])
                    db.run(insert, [date, "test","This is a bad joke"])
                    db.run(insert, [date, "test","This is a good joke"])
                    db.run(insert, [date, "live","This is a category1 joke"])
                    db.run(insert, [date, "live","This is a category2 joke"])
                    db.run(insert, [date, "live","This is a category3 joke"])
        }
        })
    }
})


module.exports = db

