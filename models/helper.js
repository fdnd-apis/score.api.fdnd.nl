module.exports.getOffset = function (currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage]
}

module.exports.emptyOrRows = function (rows) {
  return !rows ? [] : rows
}
