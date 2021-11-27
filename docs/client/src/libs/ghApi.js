import { request } from '@octokit/request';

import getToken from './ghToken.js';

const getBranches = async (token) => {
  try {
    const branches = [];
    const ghToken = await getToken(token);
    let index = 1;
    const response = async (resultsPage) => {
      try {
        const response_ = await request('GET /repos/{owner}/{repo}/branches', {
          headers: {
            authorization: `token ${ghToken}`,
          },
          owner: 'chiefmikey',
          repo: 'chalet-le-jar',
          type: 'public',
          per_page: 100,
          page: resultsPage,
        });
        for (let index_ = 0; index_ < response_.data.length; index_ += 1) {
          if (response_.data[index_].name.length > 16) {
            branches.push(response_.data[index_].name);
          }
        }
        if (response_.data.length < 100) {
          return branches;
        }
        index += 1;
        return await response(index);
      } catch (error) {
        console.log('Error getting branch list', error);
        return error;
      }
    };
    return await response(1);
  } catch (error) {
    console.log('Error getting token', error);
    return error;
  }
};

export default getBranches;
