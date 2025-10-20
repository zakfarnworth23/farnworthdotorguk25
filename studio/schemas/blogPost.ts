export default {
  name: 'blogPost',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'date', type: 'datetime' },
    { name: 'content', type: 'array', of: [{ type: 'block' }] },
  ],
}
