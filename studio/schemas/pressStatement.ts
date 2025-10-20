export default {
  name: 'pressStatement',
  title: 'Press Statements',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'date', type: 'datetime' },
    { name: 'body', type: 'array', of: [{ type: 'block' }] },
  ],
}
