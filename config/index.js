const core = require('@actions/core')

const project = {
  masterBranch: 'master',
  patchBranch: core.getInput('patchBranch') || 'bot-patch'
}

const labels = {
  quiz: 'quiz',
  titleRequest: 'title request',
  ready: 'READY'
}

module.exports = {
  project,
  labels
}
