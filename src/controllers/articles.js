'use strict';
import async from 'async';
import logger from '../utils/logger';
import CONFIG from './../config/default.json';

import NewsApiService from '../services/newsApiService';
import ArticleService from '../services/articleService';
import SourceService from '../services/sourceService';

/**
 *
 */
export default class NewsArticle {
  /**
   *
   */
  constructor() {
    this.newApiObj = new NewsApiService();
    this.articleObj = new ArticleService();
    this.sourceObj = new SourceService();
  }
  /**
   * Initalize and execute the script.
   */
  init() {
    async.each(CONFIG.SEARCH_TEXT,(item) => {
      this.execute(item);
    });
  }
  /**
   * @param {string} item
   */
  execute(item) {
    // const newApiObj = new NewsApiService();
    /**
     * For now assuming only one filter 'apple', we can configure depends on requirement.
     * Pull all articles of each day since no limit key found in news api.
     *
     * @param {Object} options
     */
    const from = new Date().toISOString().split('T')[0];
    const to = new Date().toISOString().split('T')[0];

    const options = {
      apiKey: process.env.NEWS_API_KEY,
      q: item,
      from: from,
      to: to,
      sortBy: CONFIG.SORT_BY.POPULARITY
    };

    this.newApiObj
      .fetArticles(options)
      .then((articles) => {
        // Since didn't get any limit key in API so fetching all response of each day and taking only
        // top 10 records
        const articleArr = [];
        const sourceArr = [];
        const topArticles = articles.slice(0, 10);

        topArticles.map((item) => {
          articleArr.push({
            title: item.title,
            description: item.description,
            url: item.url,
            published_at: item.publishedAt,
            source: item.source.name
          });
          sourceArr.push({
            source_name: item.source.name,
            source_id: item.source.id || 'NULL'
          });
        });
        // There is no stale key for making one to many relationship.
        // So running queries parallel
        this.articleObj
          .createArticles(articleArr)
          .then(() => {
            logger.info('Articles saved in database');
          })
          .catch((err) => {
            logger.error('Error while saving articles in db', err);
          });

        this.sourceObj
          .createSources(sourceArr)
          .then(() => {
            logger.info('Sources saved in database');
          })
          .catch((err) => {
            logger.error('Error while saving sources in db', err);
          });
      })
      .catch((err) => {
        logger.error(err);
      });
  }
}
