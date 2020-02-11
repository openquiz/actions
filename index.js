const github = require('@actions/github')
const core = require('@actions/core')
const yaml = require('js-yaml')

async function run () {
  try {
    const token = core.getInput('github-token', { required: true })
    const client = new github.GitHub(token)

    const issue_number = getIssueNumber()
    if (issue_number == null) {
      throw new Error('No Issue Provided')
    }
    console.log(github.context)
    const { data } = await client.issues.get({
      ...getRepo(),
      issue_number
    })
    console.log(data)
  } catch (error) {
    core.error(error)
    core.setFailed(error.message)
  }
}

function getIssueNumber () {
  const issue = github.context.payload.issue
  if (!issue) {
    return undefined
  }
  return issue.number
}

function getRepo () {
  const repo = github.context.repo
  return repo
}

run()
