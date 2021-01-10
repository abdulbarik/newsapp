'use strict';

import knex from './../db';
import Source from '../models/sources';

/**
 * Article service class.
 */
export default class SourceService {
  /**
   * Declare the class constructor.
   */
  constructor() {
    this.sourceObj=new Source();
  }
/**
   * Create articles.
   *
   * @param   {Object}  sources
   * @returns {Promise}
   */
  createSources(sources) {
    return knex(this.sourceObj.tableName).insert(sources);
  }
}
