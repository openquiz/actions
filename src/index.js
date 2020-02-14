const github = require('@actions/github')
const core = require('@actions/core')
const { handleIssueLabeled } = require('./issue')

async function run () {
  try {
    const payload = github.context.payload

    const token = core.getInput('github-token', { required: true })
    const client = new github.GitHub(token)
    console.log(github.context)
    if (github.context.eventName === 'issues') {
      if (payload.action === 'labeled' || payload.action === 'edited') {
        handleIssueLabeled(payload, client)
      }
    }
  } catch (error) {
    core.error(error)
    core.setFailed(error.message)
  }
}

run()
