[![Status][issueactions]](https://github.com/openquiz/actions)

# Open Quiz Actions

Github actions for [Open Quiz](https://github.com/openquiz/openquiz) project.

## Usage

```yaml
name: "Issue Actions"
on:
  issues:
    types: [labeled, edited]

jobs:
  Bender:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - uses: openquiz/actions@v1.0.0
        with:
          github-token: "${{ secrets.GITHUB_TOKEN }}"
          patch-branch: "bot-patch"
          administrators: "[username1, username2]"
          editors-friends: "[username1, username2]"
```

# Upgrading this package

When uploading github actions, `node_modules` and `lib` directories need to be commited.

Follow the steps below:

```sh
# create a new release branch
$ git checkout -b release/vX.X.X
```

Commentout the following lines in `.gitignore`

```
# comment this out distribution branches
node_modules/
```

```
$ git add node_modules
$ git rm -r friends ...
$ git commit -a -m "release"
$ git tag -a -m "new release" vX.X.X
$ git push origin release/vX.X.X
```

[issueactions]: https://github.com/openquiz/actions/workflows/Issue%20Actions/badge.svg
