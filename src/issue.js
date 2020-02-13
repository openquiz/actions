const yaml = require('js-yaml')
const config = require('../config')
const { quizSchema } = require('../config/schema')

const handleIssueLabeled = async function (payload, client) {
  const issue = payload.issue

  if (issue.labels.includes(config.labels.quiz)) {
    const newQuiz = yaml.safeLoad(issue.body)

    if (newQuiz.type === 'number' && newQuiz.anwser) {
      newQuiz.anwser = Number(newQuiz.anwser)
    }

    const validateResult = quizSchema.validate(newQuiz)
    console.log(validateResult)
    if (validateResult.error) {
      const validateErrorComment = `Error: \`${validateResult.error.details[0].message}\`. Please edit issue content.`
      await client.issues.createComment({
        owner: issue.owner,
        repo: issue.repo,
        issue_number: issue.number,
        body: validateErrorComment
      })
    }
  }
}

module.exports = {
  handleIssueLabeled
}
