const mysql = require('mysql2')

const pool = mysql.createPool({
  connectionLimit: 200,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})

const promisePool = pool.promise()

/**
 * Async function that makes a connection to the db and executes the query with
 * params that are passed along as parameters. The function returns resulting
 * rows and drops the fields.
 * @param {*} sql - the sequel string to send to the DBMS
 * @param {*} params - the parameters used to fill in ?'s in the sequel string
 */
module.exports.query = async function (sql, params) {
  // console.log(sql, params)
  const [rows] = await promisePool.query(sql, params)
  return rows
}
