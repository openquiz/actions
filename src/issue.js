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
        owner: payload.repository.owner.name,
        repo: payload.repository.name,
        issue_number: issue.number,
        body: validateErrorComment
      })
    } else {
      // assign issue to editors or administrators
      const assignees = getAssignees(newQuiz.title)

      await client.issues.addAssignees({
        owner: payload.repository.owner.name,
        repo: payload.repository.name,
        issue_number: issue.number,
        assignees
      })
    }
  }

  // Issues with 'READY' label
  if (labels.includes(config.labels.ready)) {
    const newQuiz = formatQuiz(issue, payload.sender)
    const commitTitle = `New quiz for ${newQuiz.title}: #${issue.number}`
    await client.repos.createOrUpdateFile({
      owner: payload.repository.owner.name,
      repo: payload.repository.name,
      branch: config.project.patchBranch,
      // sha: Required if you are updating a file. The blob SHA of the file being replaced.
      path: `${getIdByTitle(newQuiz.title)}/${issue.number}.json`,
      message: commitTitle,
      content: Buffer.from(JSON.stringify(newQuiz, null, 4)).toString('base64')
    })

    await client.pulls.create({
      owner: payload.repository.owner.name,
      repo: payload.repository.name,
      head: config.project.patchBranch,
      base: config.project.masterBranch,
      title: commitTitle,
      body: commitTitle
    })
  }
}

module.exports = {
  handleIssueLabeled
}
