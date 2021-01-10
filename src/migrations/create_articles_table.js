
'use strict';

/**
 * Create articles table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('articles', (table) => {
    table.increments();
    table.string('title').notNull();
    table.string('source').notNull();
    table.longtext('description').notNull();
    table.string('url').notNull();
    table.string('published_at').notNull();
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull();
    
    // This is for one to many relationship, requirement not clear
    // table.integer('source_id').unsigned().notNull();
    // table.foreign('source_id').references('id').inTable('sources');
  });
}

/**
 * Drop sources table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('articles');
}
