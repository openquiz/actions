const config = require('../config')
const { quizSchema } = require('../config/schema')
const { getIdByTitle, getAssignees, formatQuiz } = require('./util')

const handleIssueLabeled = async function (payload, client) {
  const issue = payload.issue

  const labels = issue.labels.map(function (obj) {
    return obj.name
  })

  // Issues with 'quiz' label
  if (labels.includes(config.labels.quiz)) {
    const newQuiz = formatQuiz(issue, payload.sender)
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

  // Issues with 'READY' label
  if (labels.includes(config.labels.ready)) {
    const newQuiz = formatQuiz(issue, payload.sender)
    await client.repos.createOrUpdateFile({
      owner: config.project.owner,
      repo: config.project.repo,
      branch: config.project.patchBranch,
      // sha: Required if you are updating a file. The blob SHA of the file being replaced.
      path: `${getIdByTitle(newQuiz.title)}/${issue.issue_number}.json`,
      message: `New quiz for ${newQuiz.title}: #${issue.issue_number}`,
      content: Buffer.from(JSON.stringify(newQuiz, null, 4)).toString('base64')
    })
  }
}

module.exports = {
  handleIssueLabeled
}
