var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GitHubApiClient, JiraApiClient } from "./class";
const NOT_FOUND_MATCHED_ISSUE = 'No match found';
const getPullRequestNumber = (githubRef) => {
    const regex = /\d+/;
    const match = githubRef.match(regex);
    if (match) {
        const [extractedString] = match;
        return Number(extractedString);
    }
    return NOT_FOUND_MATCHED_ISSUE;
};
const getJiraIssueKey = ({ issueKeyRegex, branchName }) => {
    const match = branchName.match(issueKeyRegex);
    if (match) {
        const [extractedString] = match;
        return extractedString;
    }
    return NOT_FOUND_MATCHED_ISSUE;
};
const getJiraInfo = (_a) => __awaiter(void 0, [_a], void 0, function* ({ jiraApiClient, issueKey }) {
    try {
        const result = yield jiraApiClient.jira.findIssue(issueKey);
        console.log(`[getJiraInfo] Successfully retrieved ${issueKey} information.`);
        return result;
    }
    catch (error) {
        console.error(`[getJiraInfo] Failed to get ${issueKey} information.`, error);
        process.exit(1);
    }
});
const getPullRequestInfo = (_b) => __awaiter(void 0, [_b], void 0, function* ({ pullRequestNumber, githubApiClient }) {
    try {
        const { data } = yield githubApiClient.octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', Object.assign(Object.assign({}, githubApiClient.getDefaultParams()), { pull_number: pullRequestNumber }));
        console.log(`[getPullRequestInfo] Successfully retrieved request(#${pullRequestNumber}) information.`);
        return data;
    }
    catch (error) {
        console.error(`[getPullRequestInfo] Failed to get pull request(#${pullRequestNumber}) information.`, error);
        process.exit(1);
    }
});
const patchPullRequestTitle = (_c) => __awaiter(void 0, [_c], void 0, function* ({ title, githubApiClient, pullRequestNumber }) {
    try {
        yield githubApiClient.octokit.request('PATCH /repos/{owner}/{repo}/pulls/{pull_number}', Object.assign(Object.assign({}, githubApiClient.getDefaultParams()), { pull_number: pullRequestNumber, title }));
        console.log(`[patchPullRequestTitle] Successfully updated request(#${pullRequestNumber}) title.`);
    }
    catch (error) {
        console.error(`[patchPullRequestTitle] Failed to update pull request(#${pullRequestNumber})title .`, error);
        process.exit(1);
    }
});
export const updatePullRequestTitle = (_d) => __awaiter(void 0, [_d], void 0, function* ({ githubToken, jiraHostName, jiraApiToken, jiraUserEmail, issueKeyRegex, repo, owner, pullRequestRef }) {
    const jiraApiClient = new JiraApiClient({ host: jiraHostName, password: jiraApiToken, username: jiraUserEmail });
    const githubApiClient = new GitHubApiClient({ token: githubToken, owner, repo });
    const pullRequestNumber = yield getPullRequestNumber(pullRequestRef);
    if (pullRequestNumber === 'No match found') {
        return;
    }
    const pullRequestInfo = yield getPullRequestInfo({ githubApiClient, pullRequestNumber });
    console.log({ pullRequestInfo });
    const branchName = pullRequestInfo.head.ref;
    console.log({ branchName });
    const issueKey = yield getJiraIssueKey({ branchName, issueKeyRegex: issueKeyRegex });
    console.log({ issueKey });
    const jiraInfo = yield getJiraInfo({ issueKey, jiraApiClient });
    console.log({ getJiraInfo });
    const title = `[${issueKey}] ${jiraInfo.fields.summary}`;
    yield patchPullRequestTitle({ title, githubApiClient, pullRequestNumber });
});
