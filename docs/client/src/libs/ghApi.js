import { Octokit } from '@octokit/core';

const octokit = new Octokit();

const getBranches = async () => {
  try {
    const branches = [];
    const res = await octokit.request('GET /repos/{owner}/{repo}/branches', {
      owner: 'chiefmikey',
      repo: 'chalet-le-jar',
    });
    for (let i = 0; i < res.data.length; i += 1) {
      branches.push(res.data[i].name);
    }
    return branches;
  } catch (e) {
    console.log('Error getting branch list', e);
    return e;
  }
};

export default getBranches;
