# Jira-PR-title-sync

This action synchronizes the title of GitHub and the issue title of Jira.

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
# WIP...
# uses: actions/hello-world-javascript-action@e76147da8e5c81eaf017dede5645551d4b94427b
# with:
#   GITHUB_TOKEN:
#   JIRA_HOST_NAME: 'hostName'
#   JIRA_API_TOKEN: 'token'
#   JIRA_USER_EMAIL: 'email'
#   TARGET_REGEX: 'regex'
#   REPO: 'repo name'
#   OWNER: 'owner'
```
