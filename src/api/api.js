const cheerio = require('cheerio');
const url = require('./urls');
const { getCards, getPaginationButton, getPaginationCount } = require('./helpers');

const ongoingSeries = async (page) => {
  try {
    const res = await fetch(`${url.BASE_URL}/sedang-tayang/?halaman=${page}`);
    const body = await res.text();
    const $ = cheerio.load(body);
    const data = {
      anime: [],
      pagination: {},
    };
    
    data.anime = getCards($);
    data.pagination = getPaginationButton($);

    return data;
  } catch (error) {
    console.log("🚀 ~ ongoingSeries ~ error:", error)
    throw new Error('Internal Server Error');
  }
};

const animeDetails = async (slug) => {
  try {
    const res = await fetch(`${url.BASE_URL}/anime/${slug}`);
    const body = await res.text();
    const $ = cheerio.load(body);
    const data = [];
  
    $('div.bigcontent').each((index, element) => {
      const el = $(element);
      const img = el.find('div.thumb img:first-child').attr('data-src');
      const title = el.find('div.infox h1').text().trim();
      const name = el.find('div.infox span.alter').text().trim();
      const status = el.find('div.infox div.spe span b:contains("Status:")').first().parent().text().replace('Status: ', '');
      const type = el.find('div.infox div.spe span b:contains("Jenis:")').first().parent().text().replace('Jenis: ', '');
      const release = el.find('div.infox div.spe span b:contains("Rilis:")').first().parent().text().replace('Rilis: ', '');
      const duration = el.find('div.infox div.spe span b:contains("Durasi:")').first().parent().text().replace('Durasi: ', '');
      const synopsis = $('div.sinopsis p:first-child').text().trim();
      const episodes = []; 
      const genres = [];
      const characterTypes = [];
      
      el.find('div.infox div.spe span b:contains("Genre:")').parent().find('a').each((index, element) => {
        genres.push({
          genre: $(element).text() || null,
          slug: $(element).attr('href').split('/')[4] || null
        })
      });

      el.find('div.infox div.spe span#tikar_shw b:contains("Karakter:")').parent().find('a').each((index, element) => {
        characterTypes.push({
          type: $(element).text() || null,
          slug: $(element).attr('href').split('/')[4] || null
        })
      });
      
      $('div.bixbox ul#daftarepisode li').each((index, element) => {
        episodes.push({
          episode: $(element).find('span.lchx a').text().trim(),
          slug: $(element).find('span.lchx a').attr('href').split('/')[3],
        })
      })
      
      data.push({
        img: img || null,
        title: title || null,
        name: name || null,
        status: status || null,
        release: release || null,
        duration: duration || null,
        type: type || null,
        synopsis: synopsis || null,
        genres: genres || null,
        characterTypes: characterTypes || null,
        episodes: episodes || null
      })
    })
  
    return data;
  } catch (error) {
    console.log("🚀 ~ animeDetails ~ error:", error)
    throw new Error('Internal Server Error');
  }
}

const animeEpisode = async (slug) => {
  try {
    const res = await fetch(`${url.BASE_URL}/${slug}`);
    const body = await res.text();
    const $ = cheerio.load(body);
    const data = [];
    
    $('div.postbody article').each((index, element) => {
      const el = $(element);
      const img = el.find('div.meta div.tb img').attr('data-src');
      const title = el.find('div.meta div.lm h1').text().trim();
      const name = el.find('div.meta div.lm span.epx a:first-child').text().trim();
      const slug = el.find('div.meta div.lm span.epx a:first-child').attr('href').split('/')[4];
      const status = el.find('div.releases h3 font').text().trim();

      const iframes = [];

      el.find('select.mirror option').each((index, element) => {
        const option = $(element);
        const decodedOptionValue = option.attr('value') ? atob(option.attr('value')) : null;
        if(!decodedOptionValue) return;
        
        const iframe = cheerio.load(decodedOptionValue)('iframe');
        const src = iframe.attr('src');
        const label = option.text().trim() || null;
        if(!src) return;

        iframes.push({
          label: label,
          src: src,
        })
      })

      const episodes = [];
      
      el.find('div.bixbox ul#daftarepisode li').each((index, element) => {
        episodes.push({
          episode: $(element).find('span.lchx a').text().trim(),
          slug: $(element).find('span.lchx a').attr('href').split('/')[3],
        })
      })
  
      data.push({
        title: title || null,
        name: name || null,
        status: status || null,
        slug: slug || null,
        img: img || null,
        iframes: iframes || null,
        episodes: episodes || null
      })
    })
  
    return data;
  } catch (error) {
    console.log("🚀 ~ animeEpisode ~ error:", error)
    throw new Error('Internal Server Error');
  }
}

const search = async (keyword, page) => {
  try {
    const res = await fetch(`${url.BASE_URL}/page/${page}/?s=${keyword}`);
    const body = await res.text();
    const $ = cheerio.load(body);
    const data = {
      anime: [],
      paginationCount: null,
    };
  
    data.anime = getCards($);
    data.paginationCount = getPaginationCount($);

    return data;
  } catch (error) {
    console.log("🚀 ~ search ~ error:", error)
    throw new Error('Internal Server Error');
  }
}

const genre = async (slug, page) => {
  try {
    const res = await fetch(`${url.BASE_URL}/genre/${slug}/page/${page}`);
    const body = await res.text();
    const $ = cheerio.load(body);
    const data = {
      anime: [],
      paginationCount: null,
    };
  
    data.anime = getCards($);
    data.paginationCount = getPaginationCount($);
  
    return data;
  } catch (error) {
    console.log("🚀 ~ genre ~ error:", error)
    throw new Error('Internal Server Error');
  }
}

const characterType = async (slug, page) => {
  try {
    const res = await fetch(`${url.BASE_URL}/karakter/${slug}/page/${page}`);
    const body = await res.text();
    const $ = cheerio.load(body);
    const data = {
      anime: [],
      paginationCount: null,
    };
  
    data.anime = getCards($);
    data.paginationCount = getPaginationCount($);
  
    return data;
  } catch (error) {
    console.log("🚀 ~ characterType ~ error:", error)
    throw new Error('Internal Server Error');
  }
}

const movies = async (page) => {
  try {
    const res = await fetch(`${url.BASE_URL}/movie/?halaman=${page}`);
    const body = await res.text();
    const $ = cheerio.load(body);
    const data = {
      anime: [],
      pagination: {},
    };
    
    data.anime = getCards($);
    data.pagination = getPaginationButton($);

    return data;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

const filterList = async (query, page) => {
  try {
    const res = await fetch(`${url.BASE_URL}/pencarian/?halaman=${page}&${query}`);
    const body = await res.text();
    const $ = cheerio.load(body);
    const data = {
      anime: [],
      pagination: {},
    };
    
    data.anime = getCards($);
    data.pagination = getPaginationButton($);

    return data;
  } catch (error) {
    console.log("🚀 ~ filterList ~ error:", error)
    throw new Error('Internal Server Error');
  }
}

module.exports = {
  ongoingSeries,
  animeDetails,
  animeEpisode,
  search,
  genre,
  characterType,
  movies,
  filterList,
}