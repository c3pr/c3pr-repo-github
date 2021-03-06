const createPullRequest = require("../github/createPullRequest");

const createForkIfNotExistsORIGINAL = require("../github/createForkIfNotExists");
const createForkIfNotExists = async (mainRepoOrgRepo) => {
    const data = await createForkIfNotExistsORIGINAL(mainRepoOrgRepo);
    return {
        organization: data.owner.login,
        cloneUrl: data.clone_url
    };
};

const createPR = require("node-c3pr-repo/create-pr/create-pr");

async function createGitHubPR({
                                  mainRepoOrgRepo,
                                  mainRepoBranch,
                                  mainRepoHash,
                                  gitHubApiToken,
                                  gitUserName,
                                  gitUserEmail,
                                  prCommitMessage,
                                  prTitle,
                                  prBody,
                                  patchContent
                              }) {

    const mainRepoCloneUrl = `https://${gitHubApiToken}:${gitHubApiToken}@github.com/${mainRepoOrgRepo}.git`;

    const addAuthenticationToCloneUrl = (cloneUrl) => {
        return cloneUrl.replace(`https://github.com/`, `https://${gitHubApiToken}:${gitHubApiToken}@github.com/`)
    };

    const tokenReplacementForLogFunction = {regex: new RegExp(gitHubApiToken, "g"), replaceWith: "<GITHUB_API_TOKEN>"};

    await createPR({
        createPullRequest,
        createForkIfNotExists,
        addAuthenticationToCloneUrl,
        tokenReplacementForLogFunction,
        mainRepoOrgRepo,
        mainRepoBranch,
        mainRepoHash,
        gitUserName,
        gitUserEmail,
        prCommitMessage,
        prTitle,
        prBody,
        patchContent,
        mainRepoCloneUrl
    });
}

module.exports = createGitHubPR;