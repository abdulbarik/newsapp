'use strict';

/**
 * Create sources table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('sources', (table) => {
    table.increments();
    table.string('source_id').notNull();
    table.string('source_name').notNull();
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull();
  });
}

/**
 * Drop articles table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('sources');
}
