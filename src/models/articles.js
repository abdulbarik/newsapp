'use strict';
/**
 * User model.
 */
class Article {
  /**
   * Declare class contructor with required initialization.
   */
  constructor(){
this.TABLE_NAME='articles';
  }
  /**
   * Get table name.
   */
  get tableName() {
    return this.TABLE_NAME;
  }
}

export default Article;
