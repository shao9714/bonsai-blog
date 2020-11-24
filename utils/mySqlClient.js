const mysql = require('mysql');

module.exports = class MySqlClient {
    constructor(host, user, password, database) {
        console.log("Initializing mySQL DB Client...");
        this.host = host == undefined ? 'hardCodedHost': host;
        this.user = user == undefined ? 'hardCodedUser': user;
        this.password = password == undefined ? 'hardCodedPass': password;
        this.database = database == undefined ? 'hardCodedDB': database;
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
            charset: 'utf8mb4',
            multipleStatements: true
        });
    }

    // Executes the query provided
    executeQuery(sql) {
        const pool = this.pool;
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                connection.query(sql, (err, response) => {
                    connection.release();
                    if (err) {
                        console.log(sql);
                        console.error(err);
                        return reject(err);
                    }
                    resolve(response);
                });
            });
        });
    }

// TODO queries aren't finished
    // Queries
    // Generic
    getNewEntryId() {
        const sql = 'select auto_increment from information_schema.TABLES where TABLE_NAME ="entries" and TABLE_SCHEMA="bonsai"';
        return this.executeQuery(sql);
    }

    // Entry queries
    getAllEntries() {
        // default newest first
        const sql = 'SELECT * FROM entries ORDER BY id DESC;';
        return this.executeQuery(sql);
    }
    createEntry(title, author, img, link, summary, content, tags, user_id) {
        var sql = "INSERT INTO entries(title, author, img, link, summary, content, tags, user_id) values("+
            mysql.escape(title)+", "+
            mysql.escape(author)+", "+
            mysql.escape(img)+", "+
            mysql.escape(link)+", "+
            mysql.escape(summary)+", "+
            mysql.escape(content)+", " +
            mysql.escape(tags)+"," +
            mysql.escape(user_id)+ "); ";
        sql = sql.concat(`SET @last_entry_id=LAST_INSERT_ID(); INSERT INTO user_entries (user_id, entry_id) values (${user_id}, @last_entry_id);`);

        return this.executeQuery(sql);
    }
    getEntry(id) {
        const sql = `SELECT * FROM entries WHERE id = ${id}`;
        return this.executeQuery(sql);
    }
    editEntry(id, title, img, summary, content, tags) {
        const sql = "UPDATE entries SET title=" + 
            mysql.escape(title) + ", summary=" +
            mysql.escape(summary) + ", img=" + 
            mysql.escape(img) + ", content=" + 
            mysql.escape(content) + ", tags=" +
            mysql.escape(tags) + " WHERE id = " + id;
        return this.executeQuery(sql);
    }
    deleteEntry(id) {
        const sql = `DELETE FROM entries WHERE id=${id}`;
        return this.executeQuery(sql);
    }

    getAccountPage(id) {
        const sql = `SELECT * FROM entries WHERE user_id = ${id}`;
        return this.executeQuery(sql);
    }
    
    // Search queries
    getTags(tags) {
        const sql = "SELECT * FROM entries WHERE tags LIKE '%" + tags.tags + "%'";
        console.log(sql);
        for (var i=0; i<tags.length; i++) {
            sql = sql + "'%" + tags[i] + "%'";
            if (i < tags.length-1) { sql = sql + "OR tags LIKE"; }
        }
        return this.executeQuery(sql);
    }

    // Auth queries
    signup(username, email, password, passwordChangedAt) {
        const sql = `INSERT INTO users(username, email, password, passwordChangedAt) values('${username}', '${email}', '${password}', '${passwordChangedAt}')`;
        return this.executeQuery(sql);
    }

    login(email, password) {
        const sql = `SELECT * FROM users WHERE email='${email}' AND password='${password}'`;
        return this.executeQuery(sql);
    }

    // User queries
    getAllUsers() {
        const sql = 'SELECT * FROM users';
        return this.executeQuery(sql);
    }
    createUser(username) {
        const sql = `INSERT INTO users(username) values('${username}')`;
        return this.executeQuery(sql);
    }
    getUser(email) {
        const sql = `SELECT * FROM users WHERE email = '${email}'`;
        return this.executeQuery(sql);
    }
    getUserById(id) {
        const sql = `SELECT * FROM users WHERE id = ${id}`;
        return this.executeQuery(sql);
    }
    editUser(id, username) {
        const sql = `UPDATE users SET content='${username}' WHERE id = '${id}'`;
        return this.executeQuery(sql);
    }
    deleteUser(id) {
        const sql = `DELETE FROM users WHERE id=${id}`;
        return this.executeQuery(sql);
    }
    
}
