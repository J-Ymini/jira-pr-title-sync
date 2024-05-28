import JiraApi from 'jira-client';
import { Octokit } from 'octokit';
export declare class JiraApiClient {
    jira: JiraApi;
    constructor({ host, username, password }: {
        host: string;
        username: string;
        password: string;
    });
}
export declare class GitHubApiClient {
    octokit: Octokit;
    owner: string;
    repo: string;
    constructor({ token, owner, repo }: {
        token: string;
        owner: string;
        repo: string;
    });
    getDefaultParams(): {
        owner: string;
        repo: string;
        headers: {
            'X-GitHub-Api-Version': string;
        };
    };
}
