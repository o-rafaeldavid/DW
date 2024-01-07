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


/*
    sort: created_at, -created_at, modified_at, -modified_at, random, order (https://www.cosmicjs.com/docs/api/objects)
    limit: limite recebido (se quero só 1, 2, 3, 10, 100, etc... (acho q até 1000))
    skip: quantos elementos se ignoram (bom para paginação)
*/
export const getEventosForUnderground = async (sort, limit, skip) => {
  try {
    const data = await Promise.resolve(
      cosmic.objects
        .find({
          "type": "eventos"
        })
        .props("slug, title, metadata")
        .depth(1)
        .sort(sort)
        .limit(limit)
        .skip(skip)
    );
    return Promise.resolve(data);
  } catch (error) {
    console.log('Oof', error);
  }
  return Promise.resolve(undefined);
}




export const getAllPaginas = async () =>
  getFromCosmic(
    false,
    {"type": "paginas"},
    "slug, title, metadata",
  )

export const getPaginaBySlug = async (slug) =>
  getFromCosmic(
    true,
    {
      type: "paginas",
      slug: slug
    },
    "slug, title, metadata",
  )