/*
    codigo advindo da documentação do cosmicJS
    - https://www.cosmicjs.com/docs/api/authentication

    e do repositório da template de blog do cosmicJS (simple-nextjs-blog)
    - https://github.com/cosmicjs/simple-nextjs-blog
*/

// Import
import { createBucketClient } from '@cosmicjs/sdk';

// Authenticate
const cosmic = createBucketClient({
  bucketSlug: process.env.BUCKET_SLUG,
  readKey: process.env.BUCKET_READ_KEY,
  writeKey: process.env.BUCKET_WRITE_KEY,
});

export async function getGlobalData() {
    // Get global data
    try {
      const data = await Promise.resolve(
        cosmic.objects
          .findOne({
            type: 'globals',
            slug: 'header',
          })
          .props('metadata.site_title,metadata.site_tag')
          .depth(1)
      );
      const siteData = data.object;
      return Promise.resolve(siteData);
    } catch (error) {
      console.log('Oof', error);
    }
    return Promise.resolve();
  }

/* 
// Fetch content
await cosmic.objects
  .find({
    type: 'posts',
  })
  .limit(1);

// Write content
await cosmic.objects.insertOne({
  title: 'Blog Post Title',
  type: 'posts',
  metadata: {
    content: 'Here is the blog post content...',
    seo_description: 'This is the blog post SEO description.',
    featured_post: true,
  },
});
 */