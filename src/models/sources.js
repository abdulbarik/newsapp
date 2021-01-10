'use strict';

/**
 * User model.
 */
class Source {
  /**
   * Declare class contructor with required initialization.
   */
  constructor() {
    this.TABLE_NAME = 'sources';
  }
  /**
   * Get table name.
   */
  get tableName() {
    return this.TABLE_NAME;
  }
}

export default Source;
