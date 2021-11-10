import { request } from '@octokit/request';
import getToken from './ghToken.js';

const getBranches = async (token) => {
  try {
    const branches = [];
    const ghToken = await getToken(token);
    let index = 1;
    const response = async (resultsPage) => {
      try {
        const res = await request('GET /repos/{owner}/{repo}/branches', {
          headers: {
            authorization: `token ${ghToken}`,
          },
          owner: 'chiefmikey',
          repo: 'chalet-le-jar',
          type: 'public',
          per_page: 100,
          page: resultsPage,
        });
        for (let i = 0; i < res.data.length; i += 1) {
          if (res.data[i].name.length > 16) {
            branches.push(res.data[i].name);
          }
        }
        if (res.data.length < 100) {
          return branches;
        }
        index += 1;
        return await response(index);
      } catch (e) {
        console.log('Error getting branch list', e);
        return e;
      }
    };

    return await response(1);
  } catch (e) {
    console.log('Error getting token', e);
    return e;
  }
};

export default getBranches;
