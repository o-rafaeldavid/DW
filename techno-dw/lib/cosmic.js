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

//função geral para ir buscar no cosmic
async function getFromCosmic(findOne, query, propstoget) {
  try {
    const data = await Promise.resolve(
      (findOne)
      ?
      cosmic.objects
        .findOne(query)
        .props(propstoget)
        .depth(1)
      :
      cosmic.objects
        .find(query)
        .props(propstoget)
        .depth(1)
    );
    return Promise.resolve(data[`object${findOne ? '' : 's'}`]);
  } catch (error) {
    console.log('Oof', error);
  }
  return Promise.resolve(undefined);
}

// data relativa ao header
export const getGlobalData = async () =>
  getFromCosmic(
    true,
    {
      type: 'globals',
      title: 'Head',
    },
    'metadata.site_title, metadata.site_tag'
  )



export const getAllEventos = async () =>
  getFromCosmic(
    false,
    {"type": "eventos"},
    "slug, title, metadata"
  )

export const getEventoBySlug = async (id) =>
  getFromCosmic(
    true,
    {
      "type": "eventos",
      "slug": `evento-${id}`
    },
    "slug, title, metadata"
  )

export const getEventosForUnderground = async (order, limit, skip) =>
  getFromCosmic(
    false,
    {"type": "eventos"},
    "slug, title, metadata"
  )