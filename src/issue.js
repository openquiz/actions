const yaml = require('js-yaml')
const { getAssignees } = require('./util')
const config = require('../config')
const { quizSchema } = require('../config/schema')

const handleIssueLabeled = async function (payload, client) {
  const issue = payload.issue
  console.log(issue)
  console.log(config.labels.quiz)

  const labels = issue.labels.map(function (obj) {
    return obj.name
  })

  if (labels.includes(config.labels.quiz)) {
    const newQuiz = yaml.safeLoad(issue.body)

    if (newQuiz.type === 'number' && newQuiz.anwser) {
      newQuiz.anwser = Number(newQuiz.anwser)
    }

    const validateResult = quizSchema.validate(newQuiz)
    if (validateResult.error) {
      const validateErrorComment = `Error: \`${validateResult.error.details[0].message}\`. Please edit the issue content.`
      await client.issues.createComment({
        owner: config.project.owner,
        repo: config.project.repo,
        issue_number: issue.number,
        body: validateErrorComment
      })
    } else {
      // assign issue to editors or administrators
      const assignees = getAssignees(newQuiz.title)

      await client.issues.addAssignees({
        owner: config.project.owner,
        repo: config.project.repo,
        issue_number: issue.number,
        assignees
      })
    }
  }
}

module.exports = {
  handleIssueLabeled
}
