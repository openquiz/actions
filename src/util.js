const yaml = require('js-yaml')
const config = require('../config')

const getIdByTitle = function (title) {
  return title.toLowerCase()
}

const getAssignees = function (title) {
  const id = getIdByTitle(title)
  let assignees = config.editors[id] || []

  if (!assignees.length) {
    assignees = config.administrators
  }

  return assignees
}

const formatQuiz = function (issue, sender) {
  const newQuiz = yaml.safeLoad(issue.body)
  if (!newQuiz) return null

  newQuiz.title = getIdByTitle(newQuiz.title)
  newQuiz.issue_number = issue.number
  newQuiz.created_at = issue.created_at
  newQuiz.updated_at = issue.updated_at

  if (newQuiz.type === 'number' && newQuiz.anwser) {
    newQuiz.anwser = Number(newQuiz.anwser)
  }

  if (sender) {
    newQuiz.author = sender.login
    newQuiz.author_link = sender.html_url
  }

  return newQuiz
}

module.exports = {
  getIdByTitle,
  getAssignees,
  formatQuiz
}
