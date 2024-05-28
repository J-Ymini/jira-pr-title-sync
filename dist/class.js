import JiraApi from 'jira-client';
import { Octokit } from 'octokit';
export class JiraApiClient {
    constructor({ host, username, password }) {
        this.jira = new JiraApi({
            protocol: 'https',
            host,
            username,
            password,
            apiVersion: '2',
            strictSSL: true,
        });
    }
}
export class GitHubApiClient {
    constructor({ token, owner, repo }) {
        this.octokit = new Octokit({
            auth: token,
        });
        this.owner = owner;
        this.repo = repo;
    }
    getDefaultParams() {
        const params = {
            owner: this.owner,
            repo: this.repo,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        };
        return params;
    }
}
