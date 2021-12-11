import { request } from '@octokit/request';

import getToken from './ghToken';

type Branches = (token: string) => Promise<string[]>;

const getBranches: Branches = async (token) => {
  try {
    const branches: string[] = [];
    const ghToken: string = await getToken(token);
    let index = 1;
    const response = async (resultsPage: number) => {
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
          if (
            response_.data[index_].name.includes('save') ||
            response_.data[index_].name.includes('autosave')
          ) {
            branches.push(response_.data[index_].name);
          }
        }
        if (response_.data.length < 100) {
          const formatDate = (date: string) => {
            const [year, month, day, hour, minute, second] = date.split('-');
            return `20${year}-${month}-${day}T${hour}:${minute}:${second}`;
          };
          branches.sort((a, b) => {
            const a_ = Date.parse(formatDate(a.split('/')[1]));
            const b_ = Date.parse(formatDate(b.split('/')[1]));
            return b_ - a_;
          });
          return branches;
        }
        index += 1;
        return await response(index);
      } catch (error) {
        console.log('Error getting branch list', error);
      }
    };
    return await response(index);
  } catch (error) {
    console.log('Error getting token', error);
    return error;
  }
};

export default getBranches;
