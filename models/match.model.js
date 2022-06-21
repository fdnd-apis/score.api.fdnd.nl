const db = require('./db')
const helper = require('./helper')

/**
 * Constructor for new matches that checks if the passed object adheres the
 * format we need and throws errors if it doesn't
 * @param {*} match an object containing the necessary fields to make a new match
 */
const match = function (match) {
  // TODO: Check for sanity...
  this.matchId = match.matchId
  this.activity = match.activity
  this.team1 = match.team1
  this.playersTeam1 = match.playersTeam1
  this.scoreTeam1 = match.scoreTeam1
  this.team2 = match.team2
  this.playersTeam2 = match.playersTeam2
  this.scoreTeam2 = match.scoreTeam2
  this.speeltijd = match.speeltijd
  this.datum = match.datum
}

/**
 * Get all matches from the database, will be paginated if the number of
 * matches in the database exceeds process.env.LIST_PER_PAGE
 * @param {*} page the page of authors you want to get
 * @returns
 */
match.get = async function (page = 1) {
  const rows = await db.query(`SELECT * FROM score LIMIT ?,?`, [
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
 * @param {*} matchId
 * @returns
 */
match.getById = async function (matchId) {
  const rows = await db.query(`SELECT * FROM score WHERE matchId = ?`, [matchId])
  return {
    data: helper.emptyOrRows(rows),
    meta: { page },
  }
}

/**
 * Add a new match to the database
 * @param {*} match a new match object created with the match constructor
 * @returns an object containing the inserted match with the newly inserted matchId
 */
match.post = async function (match) {
  const rows = await db.query(`INSERT INTO score SET ${prepareQuery(match)}`, prepareParams(match))
  match.matchId = rows.insertId
  return {
    data: [match],
    meta: {
      insertId: rows.insertId,
    },
  }
}

/**
 *
 * @param {*} match
 * @returns
 */
match.patch = async function (match) {
  const rows = await db.query(
    `UPDATE score SET ${prepareQuery(match)} WHERE matchId = ?`,
    prepareParams(match)
  )
  return {
    data: helper.emptyOrRows(rows),
    meta: {},
  }
}

/**
 *
 * @param {*} match
 * @returns
 */
match.put = async function (match) {
  const rows = await db.query(
    `UPDATE score SET ${prepareQuery(match)} WHERE matchId = ?`,
    prepareParams(match)
  )
  return {
    data: helper.emptyOrRows(rows),
    meta: {},
  }
}

/**
 *
 * @param {*} matchId
 * @returns
 */
match.delete = async function (matchId) {
  const rows = await db.query(`DELETE FROM score WHERE matchId = ?`, [matchId])
  return {
    data: helper.emptyOrRows(rows),
    meta: {},
  }
}

module.exports = match

/**
 * Prepares part of an SQL query based on a passed partial match object
 * @param {*} match partial match object containing at least the matchId
 * @returns a string to be used in the patch query, eg 'field = ?, field2 = ? ...'
 */
function prepareQuery(match) {
  return Object.keys(match)
    .filter((field) => field != 'matchId')
    .map((field) => `${field} = ?`)
    .reduce((prev, curr) => `${prev}, ${curr}`)
}

/**
 * Prepares a passed partial match object for querying the database. Whatever
 * fields are passed, the matchId needs to be at the end.
 * @param {*} match partial match object containing at least the matchId
 * @returns [] an array to be used in the patch query
 */
function prepareParams(match) {
  const { matchId, ...preparedExample } = match
  return [...Object.values(preparedExample), matchId]
}
