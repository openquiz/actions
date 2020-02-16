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

const administrators = core.getInput('administrators', { required: true })
const editors = core.getInput('editors', { required: true })

module.exports = {
  project,
  labels,
  administrators,
  editors
}
