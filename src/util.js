const core = require('@actions/core')
const yaml = require('js-yaml')

const getIdByTitle = function (title) {
  return title.toLowerCase()
}

const getAssignees = function (title) {
  const id = getIdByTitle(title)
  const editorInput = core.getInput(`editors-${id}`)
  let assignees = editorInput ? editorInput.splice(',') : []

  if (!assignees.length) {
    const administratorsInput = core.getInput('administrators', { required: true })
    assignees = administratorsInput.splice(',')
  }

  assignees = assignees.map(p => p.trim())
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
