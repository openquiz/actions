const config = require('../config')

const getIdByTitle = function (title) {
  return title.toLowerCase()
}

const getAssignees = function (title) {
  const id = getIdByTitle(title)
  let assignees = config.editors[id] || []

  if (!assignees.length) {
    assignees = config.administrator
  }

  return assignees
}

module.exports = {
  getIdByTitle,
  getAssignees
}
