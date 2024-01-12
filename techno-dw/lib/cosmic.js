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
export const getEventosForUnderground = async (sort, limit, skip, query) => {
  const hoje = new Date().toLocaleDateString("pt", {timeZone: "Portugal"})
                    .split('/').reverse().join('-')

  let find = {
    "type": "eventos"
  }
  if(query !== undefined){
    /////    /////    /////
    if(query.date !== undefined){
      find["metadata.data_do_evento"] = {}

                /////    /////    /////
      if(query.date.min !== undefined) find["metadata.data_do_evento"]["$gte"] = query.date.min
      else find["metadata.data_do_evento"]["$gte"] = hoje

      if(query.date.max !== undefined) find["metadata.data_do_evento"]["$lte"] = query.date.max
    }

    /////    /////    /////
    if(query.search !== undefined) find["title"] = {$regex: query.search, $options: "i"}

    /////    /////    /////
    if(query.generosID !== undefined){
        find["metadata.generos"] = {
          "$in": query.generosID
        }
    }

    /////    /////    /////
    if(query.localizacoesID !== undefined){
        find["metadata.localizacao"] = {
          "$in": query.localizacoesID
        }
    }
  }


  
  try {
    const data = await Promise.resolve(
      cosmic.objects
        .find(find)
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


/* getEventosForUnderground("created_at", 4, 0, {localizacoesID: ['65a07352aa609f4b521b3f89']})
.then(res => console.log(res)) */






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




  export const getAllGeneros = async () =>
    getFromCosmic(
      false,
      {"type": "generos"},
      "slug, title, metadata, id",
    )

  export const getAllDistritos = async () =>
    getFromCosmic(
      false,
      {"type": "distritos"},
      "slug, title, metadata, id",
    )

  export const getLocalizacoesByDistritoIDs = async (district) =>
    getFromCosmic(
      false,
      {
        "type": "localizacoes",
        "metadata.distrito.id": {$in: district}
      },
      "slug,title,metadata, id",
    )
  

/* getLocalizacoesByDistritoID(['65a071a6aa609f4b521b3f70', '65a072efaa609f4b521b3f82'])
    .then(res => {
      let localIDarray = []
      if(res.length == 0) return undefined
      else localIDarray = res.map(r => r.id)
      return getEventosForUnderground("created_at", 4, 0, {localizacoesID: localIDarray})
              .then(res => console.log(res))
      }
    ) */