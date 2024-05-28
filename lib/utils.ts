import { GitHubApiClient, JiraApiClient } from "./class";

const NOT_FOUND_MATCHED_ISSUE = 'No match found';

const getPullRequestNumber = (githubRef: string) => {
  const regex = /\d+/;
  const match = githubRef.match(regex);

  if (match) {
    const [extractedString] = match;
    return Number(extractedString);
  }

  return NOT_FOUND_MATCHED_ISSUE;
};

const getJiraIssueKey = ({ issueKeyRegex, branchName }: { issueKeyRegex: RegExp, branchName: string }) => {

  const match = branchName.match(issueKeyRegex);

  if (match) {
    const [extractedString] = match;
    return extractedString;
  }

  return NOT_FOUND_MATCHED_ISSUE;
};


const getJiraInfo = async ({ jiraApiClient, issueKey }: { jiraApiClient: JiraApiClient, issueKey: string }) => {
  try {
    const result = await jiraApiClient.jira.findIssue(issueKey);

    console.log(
      `[getJiraInfo] Successfully retrieved ${issueKey} information.`
    );
    return result;
  } catch (error) {
    console.error(
      `[getJiraInfo] Failed to get ${issueKey} information.`,
      error
    );
    process.exit(1);
  }
};

const getPullRequestInfo = async ({ pullRequestNumber, githubApiClient }: { pullRequestNumber: number, githubApiClient: GitHubApiClient }) => {
  try {
    const { data } = await githubApiClient.octokit.request(
      'GET /repos/{owner}/{repo}/pulls/{pull_number}',
      { ...githubApiClient.getDefaultParams(), pull_number: pullRequestNumber }
    );
    console.log(
      `[getPullRequestInfo] Successfully retrieved request(#${pullRequestNumber}) information.`
    );
    return data;
  } catch (error) {
    console.error(
      `[getPullRequestInfo] Failed to get pull request(#${pullRequestNumber}) information.`,
      error
    );
    process.exit(1);
  }
};

const patchPullRequestTitle = async (
  { title, githubApiClient, pullRequestNumber }: {
    title: string,
    githubApiClient: GitHubApiClient
    pullRequestNumber: number


  }) => {
  try {
    await githubApiClient.octokit.request(
      'PATCH /repos/{owner}/{repo}/pulls/{pull_number}',
      {
        ...githubApiClient.getDefaultParams(),
        pull_number: pullRequestNumber,
        title,
      }
    );
    console.log(
      `[patchPullRequestTitle] Successfully updated request(#${pullRequestNumber}) title.`
    );
  } catch (error) {
    console.error(
      `[patchPullRequestTitle] Failed to update pull request(#${pullRequestNumber})title .`,
      error
    );
    process.exit(1);
  }
};

export const updatePullRequestTitle = async ({
  githubToken, jiraHostName, jiraApiToken, jiraUserEmail, issueKeyRegex, repo, owner, pullRequestRef
}: {
  githubToken: string; jiraHostName: string; jiraApiToken: string; jiraUserEmail: string; issueKeyRegex: unknown; repo: string; owner: string; pullRequestRef: string
}) => {
  const jiraApiClient = new JiraApiClient({ host: jiraHostName, password: jiraApiToken, username: jiraUserEmail });
  const githubApiClient = new GitHubApiClient({ token: githubToken, owner, repo });

  const pullRequestNumber = await getPullRequestNumber(
    pullRequestRef as string
  );
  if (pullRequestNumber === 'No match found') {
    return;
  }
  const pullRequestInfo = await getPullRequestInfo({ githubApiClient, pullRequestNumber });
  const branchName = pullRequestInfo.head.ref;
  const issueKey = await getJiraIssueKey({ branchName, issueKeyRegex: issueKeyRegex as RegExp });
  const jiraInfo = await getJiraInfo({ issueKey, jiraApiClient });
  const title = `[${issueKey}] ${jiraInfo.fields.summary}`;
  await patchPullRequestTitle({ title, githubApiClient, pullRequestNumber });
};
