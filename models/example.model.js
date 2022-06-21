const db = require('./db')
const helper = require('./helper')

/**
 * Constructor for new examples that checks if the passed object adheres the
 * format we need and throws errors if it doesn't
 * @param {*} example an object containing the necessary fields to make a new example
 */
const example = function (example) {
  // TODO: Check for sanity...
  this.exampleId = example.exampleId
  this.field = example.field
  this.otherField = example.otherField
}

/**
 * Get all examples from the database, will be paginated if the number of
 * examples in the database exceeds process.env.LIST_PER_PAGE
 * @param {*} page the page of authors you want to get
 * @returns
 */
example.get = async function (page = 1) {
  const rows = await db.query(`SELECT * FROM example LIMIT ?,?`, [
    helper.getOffset(page, process.env.LIST_PER_PAGE),
    Number(process.env.LIST_PER_PAGE),
  ])

  return {
    data: helper.emptyOrRows(rows),
    meta: { page },
  }
}

/**
 *
 * @param {*} exampleId
 * @returns
 */
example.getById = async function (exampleId) {
  const rows = await db.query(`SELECT * FROM example WHERE exampleId = ?`, [exampleId])
  return {
    data: helper.emptyOrRows(rows),
    meta: { page },
  }
}

/**
 * Add a new example to the database
 * @param {*} example a new example object created with the example constructor
 * @returns an object containing the inserted example with the newly inserted exampleId
 */
example.post = async function (example) {
  const rows = await db.query(
    `INSERT INTO example SET ${prepareQuery(smartzone)}`,
    prepareParams(example)
  )
  example.exampleId = rows.insertId
  return {
    data: [example],
    meta: {
      insertId: rows.insertId,
    },
  }
}

/**
 *
 * @param {*} example
 * @returns
 */
example.patch = async function (example) {
  const rows = await db.query(
    `UPDATE example SET ${prepareQuery(example)} WHERE exampleId = ?`,
    prepareParams(example)
  )
  return {
    data: helper.emptyOrRows(rows),
    meta: {},
  }
}

/**
 *
 * @param {*} example
 * @returns
 */
example.put = async function (example) {
  const rows = await db.query(
    `UPDATE example SET ${prepareQuery(example)} WHERE exampleId = ?`,
    prepareParams(example)
  )
  return {
    data: helper.emptyOrRows(rows),
    meta: {},
  }
}

/**
 *
 * @param {*} exampleId
 * @returns
 */
example.delete = async function (exampleId) {
  const rows = await db.query(`DELETE FROM example WHERE exampleId = ?`, [exampleId])
  return {
    data: helper.emptyOrRows(rows),
    meta: {},
  }
}

module.exports = example

/**
 * Prepares part of an SQL query based on a passed partial example object
 * @param {*} example partial example object containing at least the exampleId
 * @returns a string to be used in the patch query, eg 'field = ?, field2 = ? ...'
 */
function prepareQuery(example) {
  return Object.keys(example)
    .filter((field) => field != 'exampleId')
    .map((field) => `${field} = ?`)
    .reduce((prev, curr) => `${prev}, ${curr}`)
}

/**
 * Prepares a passed partial example object for querying the database. Whatever
 * fields are passed, the exampleId needs to be at the end.
 * @param {*} example partial example object containing at least the exampleId
 * @returns [] an array to be used in the patch query
 */
function prepareParams(example) {
  const { exampleId, ...preparedExample } = example
  return [...Object.values(preparedExample), exampleId]
}
