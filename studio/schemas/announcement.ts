export default {
  name: 'announcement',
  title: 'Announcements',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'content', type: 'array', of: [{ type: 'block' }] },
  ],
}
