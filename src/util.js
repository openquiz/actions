const yaml = require('js-yaml')
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

const formatQuiz = function (body, sender) {
  const newQuiz = yaml.safeLoad(body)
  if (!newQuiz) return null

  newQuiz.id = getIdByTitle(newQuiz.title)
  newQuiz.created_at = body.created_at
  newQuiz.updated_at = body.updated_at

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
