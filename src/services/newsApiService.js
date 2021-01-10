import rp from 'request-promise';

import CONFIG from '../config/default.json';
import logger from '../utils/logger';

/**
 * NewsAPI class.
 */
export default class NewsService {
  /**
   * Declare the class constructor.
   */
  constructor() {}

  /**
   * GET All news articles for each day and save in database.
   *
   * @param {Object} reqParams
   * 
   * @returns {Promise}
   */
  fetArticles(reqParams) {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'GET',
        uri: CONFIG.NEWS_API_URL,
        resolveWithFullResponse: true,
        qs: reqParams
      };

      rp(options)
        .then((response) => {
          logger.info(`Server status code ${response.statusCode}`);
          let body;
          /**
           * I didn't get any limit param in API to fetch latest 10 so pulling all artices
           * of each day and taking first 10 articles in table.
           */

          if (typeof response.body === 'string') body = JSON.parse(response.body);
          else body = response.body;

          return resolve(body.articles);
        })
        .catch((err) => {
          logger.error('Error while fetching artices', err);

          return reject({ error: 'Error while fetching artices' });
        });
    });
  }
}
