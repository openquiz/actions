const github = require('@actions/github')
const core = require('@actions/core')
const yaml = require('js-yaml')

async function run () {
  try {
    // const token = core.getInput('github-token', { required: true })
    // const client = new github.GitHub(token)
    console.log(123)
  } catch (error) {
    core.error(error)
    core.setFailed(error.message)
  }
}

run()
