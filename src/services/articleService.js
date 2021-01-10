'use strict';

import Article from '../models/articles';

import knex from './../db';
/**
 * Article service class.
 */
export default class ArticleService {
  /**
   * Declare the class constructor.
   */
  constructor() {
    this.articleObj=new Article();
  }
  /**
   * Create articles.
   *
   * @param   {Object}  articles
   * @returns {Promise}
   */
  createArticles(articles) {
    return knex(this.articleObj.tableName).insert(articles);
  }
}
