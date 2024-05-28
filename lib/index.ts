import core from "@actions/core";
import { updatePullRequestTitle } from './utils';

const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
const JIRA_HOST_NAME = core.getInput('JIRA_HOST_NAME');
const JIRA_API_TOKEN = core.getInput('JIRA_API_TOKEN');
const JIRA_USER_EMAIL = core.getInput('JIRA_USER_EMAIL');
const ISSUE_KEY_REGEX = core.getInput('ISSUE_KEY_REGEX')
const REPO = core.getInput('REPO');
const OWNER = core.getInput('OWNER');
const PULL_REQUEST_REF = core.getInput('PULL_REQUEST_REF')

updatePullRequestTitle({ githubToken: GITHUB_TOKEN, jiraHostName: JIRA_HOST_NAME, jiraApiToken: JIRA_API_TOKEN, jiraUserEmail: JIRA_USER_EMAIL, issueKeyRegex: ISSUE_KEY_REGEX, repo: REPO, owner: OWNER, pullRequestRef: PULL_REQUEST_REF })

