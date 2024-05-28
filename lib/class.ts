import JiraApi from 'jira-client';

import { Octokit } from 'octokit';

export class JiraApiClient {
  jira: JiraApi;

  constructor({ host, username, password }: { host: string, username: string, password: string }) {
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
  octokit: Octokit;
  owner: string;
  repo: string

  constructor({ token, owner, repo }: { token: string, owner: string, repo: string }) {
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