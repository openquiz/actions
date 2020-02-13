const github = require('@actions/github')
const core = require('@actions/core')
const { handleIssueLabeled } = require('./issue')

async function run () {
  try {
    const payload = github.context.payload

    const token = core.getInput('github-token', { required: true })
    const client = new github.GitHub(token)
    console.log(github.context)
    console.log(payload.action)
    if (github.context.eventName === 'issues') {
      if (payload.action === 'labeled' || payload.action === 'edited') {
        handleIssueLabeled(payload, client)
        // handleIssueLabeled(payload)
      }
    }

    // const issue_number = getIssueNumber()
    // if (issue_number == null) {
    //   throw new Error('No Issue Provided')
    // }
    // console.log(github.context)
    // const { issueData } = await client.issues.get({
    //   ...getRepo(),
    //   issue_number
    // })
    // console.log(issueData)

    // const labels = getLabels()
    // console.log(labels)
  } catch (error) {
    core.error(error)
    core.setFailed(error.message)
  }
}

// function getIssueNumber () {
//   const issue = github.context.payload.issue
//   if (!issue) {
//     return undefined
//   }
//   return issue.number
// }

// function getRepo () {
//   const repo = github.context.repo
//   return repo
// }
// function getLabels () {
//   return github.context.payload.labels || []
// }

run()
