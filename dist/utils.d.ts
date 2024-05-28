export declare const updatePullRequestTitle: ({ githubToken, jiraHostName, jiraApiToken, jiraUserEmail, issueKeyRegex, repo, owner, pullRequestRef }: {
    githubToken: string;
    jiraHostName: string;
    jiraApiToken: string;
    jiraUserEmail: string;
    issueKeyRegex: unknown;
    repo: string;
    owner: string;
    pullRequestRef: string;
}) => Promise<void>;
