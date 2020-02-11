const github = require('@actions/github')
const core = require('@actions/core')
const yaml = require('js-yaml')

async function run () {
  try {
    const token = core.getInput('repo-token', { required: true })
    const client = new github.GitHub(token)
    const labelGlobs = await getLabelGlobs(client)
    const labels = []
    for (const [label, globs] of labelGlobs.entries()) {
      core.debug(`processing ${label}`)
    }
  } catch (error) {
    core.error(error)
    core.setFailed(error.message)
  }
}
async function getLabelGlobs (client) {
  const configurationContent = await fetchContent(client)
  // loads (hopefully) a `{[label:string]: string | string[]}`, but is `any`:
  const configObject = yaml.safeLoad(configurationContent)
  // transform `any` => `Map<string,string[]>` or throw if yaml is malformed:
  return getLabelGlobMapFromObject(configObject)
}
async function fetchContent (client) {
  const response = await client.repos.getContents({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    path: '',
    ref: github.context.sha
  })
  return Buffer.from(response.data.content, 'base64').toString()
}
function getLabelGlobMapFromObject (configObject) {
  const labelGlobs = new Map()
  for (const label in configObject) {
    if (typeof configObject[label] === 'string') {
      labelGlobs.set(label, [configObject[label]])
    } else if (configObject[label] instanceof Array) {
      labelGlobs.set(label, configObject[label])
    } else {
      throw Error(`found unexpected type for label ${label} (should be string or array of globs)`)
    }
  }
  return labelGlobs
}
async function addLabels (client, prNumber, labels) {
  await client.issues.addLabels({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: prNumber,
    labels: labels
  })
}

run()
