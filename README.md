# Jira-PR-title-sync

This action synchronizes the title of Pull Request and the issue title of Jira.

## Inputs

### `GITHUB_TOKEN`

**Required** The token to be used for creating the pull request. Can be set to the one given for the workflow or another user.

### `JIRA_HOST_NAME`

**Required** The Jira host name.

### `THE JIRA_USER_EMAIL`

**Required** The Jira user email.

### `THE JIRA_API_TOKEN`

**Required** The Jira API token.

### `TARGET_REGEX`

**Required** The RegExp for Issue Key Tracking (it's value must be included in branch).

### `REPO`

**Required** The Github Repo Name.

### `OWNER`

**Required** The Github Repository.

## Example usage

```yaml
on:
  pull_request:
    types:
      - opened

jobs:
  Run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Synchronize PR Title
        uses: 'J-Ymini/jira-pr-title-sync@v1.1'
        with:
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
          JIRA_HOST_NAME: 'Jira api token'
          THE JIRA_USER_EMAIL: 'Jira host name'
          TARGET_REGEX: 'Jira user email'
          REPO: 'Repository name'
          OWNER: 'Repository owner'
          PULL_REQUEST_REF: ${{process.env.GITHUB_REF}}
```
