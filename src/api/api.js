const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const url = require('./urls');

const getGenres = async (slug) => {
  try {
    const res = await fetch(`${url.BASE_URL}/anime/${slug}`);
    const body = await res.text();
    const $ = cheerio.load(body);
    const promises = [];

    $('div.bigcontent').each((index, element) => {
      const el = $(element);
      
      el.find('div.infox div.spe span:first-of-type a').each((index, element) => {
        promises.push({
          genre: $(element).text() || null,
          slug: $(element).attr('href').split('/')[4] || null
        })
      });
    })

    return promises;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
}

const ongoingSeries = async (page) => {
  try {
    const res = await fetch(`${url.BASE_URL}/sedang-tayang/?halaman=${page}`);
    const body = await res.text();
    const $ = cheerio.load(body);
    const promises = {
      anime: [],
      pagination: {},
    };
    
    $('div.listupd div.bs').each((index, element) => {
      const el = $(element);
      const name = el.find('div.bsx div.tt').text().trim();
      const slug = el.find('div.bsx a').attr('href').split('/')[4];
      const type = el.find('div.bsx a div.limit div.typez').text().trim();
      const episode = el.find('div.bsx a div.limit div.bt span.epx').text().trim();
      const img = el.find('div.bsx a div.limit img.lazy').attr('data-src');
      const status = el.find('div.bsx a div.limit div.bt span.sb').text() || null;

      promises.anime.push(getGenres(slug).then(extra => ({
        slug: slug || null,
        name: name || null,
        type: type || null,
        episode: episode || null,
        img: img || null,
        status: status || null,
        genres: extra || null,
      })))

    })

    await Promise.all(promises.anime).then(anime => {
      promises.anime = anime;
    })

    // pagination handler
    const prev = $('div.hpage a.l').text().trim();
    const next = $('div.hpage a.r').text().trim();

    promises.pagination.prev = prev || null;
    promises.pagination.next = next || null;
    // =====

    return promises;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

const animeDetails = async (slug) => {
  try {
    const res = await fetch(`${url.BASE_URL}/anime/${slug}`);
    const body = await res.text();
    const $ = cheerio.load(body);
    const promises = [];
  
    $('div.bigcontent').each((index, element) => {
      const el = $(element);
      const img = el.find('div.thumb img:first-child').attr('data-src');
      const title = el.find('div.infox h1').text().trim();
      const name = el.find('div.infox span.alter').text().trim();
      const status = el.find('div.infox div.spe span b:contains("Status:")').first().parent().text().replace('Status: ', '');
      const type = el.find('div.infox div.spe span b:contains("Jenis:")').first().parent().text().replace('Jenis: ', '');
      const release = el.find('div.infox div.spe span b:contains("Rilis:")').first().parent().text().replace('Rilis: ', '');
      const studio = el.find('div.infox div.spe span b:contains("Studio:")').first().parent().text().replace('Studio: ', '');
      const duration = el.find('div.infox div.spe span b:contains("Durasi:")').first().parent().text().replace('Durasi: ', '');
      const synopsis = $('div.sinopsis p:first-child').text().trim();
      const episodes = []; 
      const genres = [];
      
      el.find('div.infox div.spe span:first-of-type a').each((index, element) => {
        genres.push({
          genre: $(element).text() || null,
          slug: $(element).attr('href').split('/')[4] || null
        })
      });
      
      $('div.bixbox ul#daftarepisode li').each((index, element) => {
        episodes.push({
          episode: $(element).find('span.lchx a').text().trim(),
          slug: $(element).find('span.lchx a').attr('href').split('/')[3],
        })
      })
      
      promises.push({
        img: img || null,
        title: title || null,
        name: name || null,
        status: status || null,
        release: release || null,
        duration: duration || null,
        type: type || null,
        studio: studio || null,
        synopsis: synopsis || null,
        genres: genres || null,
        episodes: episodes || null
      })
    })
  
    return await Promise.all(promises);
  } catch (error) {
    throw new Error('Internal Server Error');
  }
}

const animeEpisode = async (slug) => {
  try {
    const res = await fetch(`${url.BASE_URL}/${slug}`);
    const body = await res.text();
    const $ = cheerio.load(body);
    const promises = [];
    
    $('div.postbody article').each((index, element) => {
      const el = $(element);
      const stream_url = el.find('div.video-content div.player-embed iframe').attr('src');
      const img = el.find('div.meta div.tb img').attr('data-src');
      const title = el.find('div.meta div.lm h1').text().trim();
      const name = el.find('div.meta div.lm span.epx a:first-child').text().trim();
      const anime_slug = el.find('div.meta div.lm span.epx a:first-child').attr('href').split('/')[4];
      const status = el.find('div.releases h3 font').text().trim();
      const episodes = [];
      
      el.find('div.bixbox ul#daftarepisode li').each((index, element) => {
        episodes.push({
          episode: $(element).find('span.lchx a').text().trim(),
          slug: $(element).find('span.lchx a').attr('href').split('/')[3],
        })
      })
  
      promises.push({
        title: title || null,
        name: name || null,
        status: status || null,
        anime_slug: anime_slug || null,
        img: img || null,
        stream_url: stream_url || null,
        episodes: episodes || null
      })
    })
  
    return await Promise.all(promises);
  } catch (error) {
    throw new Error('Internal Server Error');
  }
}

const animeVideoSources = async (slug) => {
  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${url.BASE_URL}/${slug}`);
    const promises = [];
    
    await page.waitForSelector('div.postbody article select.mirror');
    
    const options = await page.evaluate(() => {
      const options = Array.from(document.querySelectorAll('div.postbody article select.mirror option'));
      return options.map(option => ({
        label: option.textContent,
        value: option.value
      }));
    });

    for (const option of options) {
      await page.select('div.postbody article select.mirror', option.value);
      await page.waitForSelector('div.postbody article div.player-embed iframe');
      const iframeSrc = await page.$eval('div.postbody article div.player-embed iframe', iframe => iframe.src);
      promises.push({
        label: option.label || null,
        stream_url: iframeSrc || null,
      });
    }
    
    return await Promise.all(promises);
  } catch (error) {
    throw new Error('Internal Server Error');
  } finally {
    try {
      if(browser) {
        await browser.close();
      }
    } catch (error) {
      console.error('Failed to close the browser:', error);
    }
  }
}

const search = async (keyword, page) => {
  try {
    const res = await fetch(`${url.BASE_URL}/page/${page}/?s=${keyword}`);
    const body = await res.text();
    const $ = cheerio.load(body);
    const promises = {
      anime: [],
      paginationCount: null,
    };
  
    $('div.listupd div.bs').each((index, element) => {
      const el = $(element);
      const name = el.find('div.bsx div.tt').text().trim();
      const slug = el.find('div.bsx a').attr('href').split('/')[4];
      const type = el.find('div.bsx a div.limit div.typez').text().trim();
      const episode = el.find('div.bsx a div.limit div.bt span.epx').text().trim();
      const img = el.find('div.bsx a div.limit img.lazy').attr('data-src');
      const status = el.find('div.bsx a div.limit div.bt span.sb').text();

      promises.anime.push(getGenres(slug).then(extra => ({
        slug: slug || null,
        name: name || null,
        type: type || null,
        episode: episode || null,
        img: img || null,
        status: status|| null,
        genres: extra || null,
      })))
    })
    
    await Promise.all(promises.anime).then(anime => {
      promises.anime = anime;
    })

    // pagination handler
    const pagination = $('div.pagination .page-numbers:not(.next)');
    let paginationCount;
    if(pagination.length > 0) {
      paginationCount = Number(pagination.last().text().trim());
    }
    // ===================

    promises.paginationCount = paginationCount || null;

    return promises;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
}

const genres = async () => {
  try {
    const res = await fetch(`${url.BASE_URL}/genre-anime`);
    const body = await res.text();
    const $ = cheerio.load(body);
    const promises = [];
    
    $('div.postbody div.genrepage a').each((index, element) => {
      const el = $(element);
      const genre = el.text().trim();
      const slug = el.attr('href').split('/')[4]; 
      if(genre === 'Animasu' || genre === 'Animasu.cc' || genre === 'Animasu.win') return;
      promises.push({
        genre: genre || null,
        slug: slug || null
      })
    })
    
    return await Promise.all(promises);
  } catch (error) {
    throw new Error('Internal Server Error');
  }
}

const genre = async (slug, page) => {
  try {
    const res = await fetch(`${url.BASE_URL}/genre/${slug}/page/${page}`);
    const body = await res.text();
    const $ = cheerio.load(body);
    const promises = {
      anime: [],
      paginationCount: null,
    };
  
    $('div.listupd div.bs').each((index, element) => {
      const el = $(element);
      const name = el.find('div.bsx div.tt').text().trim();
      const slug = el.find('div.bsx a').attr('href').split('/')[4];
      const type = el.find('div.bsx a div.limit div.typez').text().trim();
      const episode = el.find('div.bsx a div.limit div.bt span.epx').text().trim();
      const img = el.find('div.bsx a div.limit img.lazy').attr('data-src');
      const status = el.find('div.bsx a div.limit div.bt span.sb').text();
  
      promises.anime.push(getGenres(slug).then(extra => ({
        slug: slug || null,
        name: name || null,
        type: type || null,
        episode: episode || null,
        img: img || null,
        status: status|| null,
        genres: extra || null,
      })))
    })

    await Promise.all(promises.anime).then(anime => {
      promises.anime = anime;
    })

    // pagination handler
    const pagination = $('div.pagination .page-numbers:not(.next)');
    let paginationCount;
    if(pagination.length > 0) {
      paginationCount = Number(pagination.last().text().trim());
    }
    // ===================

    promises.paginationCount = paginationCount || null;
  
    return promises;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
}

const characterTypes = async () => {
  try {
    const res = await fetch(`${url.BASE_URL}/tipe-karakter`);
    const body = await res.text();
    const $ = cheerio.load(body);
    const promises = [];
    
    $('div.postbody div.genrepage a').each((index, element) => {
      const el = $(element);
      const type = el.text().trim();
      const slug = el.attr('href').split('/')[4]; 
      if(type === 'Animasu' || type === 'Animasu.cc' || type === 'Animasu.win') return;
      promises.push({
        type: type || null,
        slug: slug || null
      })
    })
    
    return await Promise.all(promises);
  } catch (error) {
    throw new Error('Internal Server Error');
  }
}

const characterType = async (slug, page) => {
  try {
    const res = await fetch(`${url.BASE_URL}/karakter/${slug}/page/${page}`);
    const body = await res.text();
    const $ = cheerio.load(body);
    const promises = {
      anime: [],
      paginationCount: null,
    };
  
    $('div.listupd div.bs').each((index, element) => {
      const el = $(element);
      const name = el.find('div.bsx div.tt').text().trim();
      const slug = el.find('div.bsx a').attr('href').split('/')[4];
      const type = el.find('div.bsx a div.limit div.typez').text().trim();
      const episode = el.find('div.bsx a div.limit div.bt span.epx').text().trim();
      const img = el.find('div.bsx a div.limit img.lazy').attr('data-src');
      const status = el.find('div.bsx a div.limit div.bt span.sb').text();
  
      promises.anime.push(getGenres(slug).then(extra => ({
        slug: slug || null,
        name: name || null,
        type: type || null,
        episode: episode || null,
        img: img || null,
        status: status|| null,
        genres: extra || null,
      })))
    })
    
    await Promise.all(promises.anime).then(anime => {
      promises.anime = anime;
    })

    // pagination handler
    const pagination = $('div.pagination .page-numbers:not(.next)');
    let paginationCount;
    if(pagination.length > 0) {
      paginationCount = Number(pagination.last().text().trim());
    }
    // ===================

    promises.paginationCount = paginationCount || null;
  
    return promises;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
}

const movies = async (page) => {
  try {
    const res = await fetch(`${url.BASE_URL}/movie/?halaman=${page}`);
    const body = await res.text();
    const $ = cheerio.load(body);
    const promises = {
      anime: [],
      pagination: {},
    };
    
    $('div.listupd div.bs').each((index, element) => {
      const el = $(element);
      const name = el.find('div.bsx div.tt').text().trim();
      const slug = el.find('div.bsx a').attr('href').split('/')[4];
      const type = el.find('div.bsx a div.limit div.typez').text().trim();
      const episode = el.find('div.bsx a div.limit div.bt span.epx').text().trim();
      const img = el.find('div.bsx a div.limit img.lazy').attr('data-src');
      const status = el.find('div.bsx a div.limit div.bt span.sb').text();
  
      promises.anime.push(getGenres(slug).then(extra => ({
        slug: slug || null,
        name: name || null,
        type: type || null,
        episode: episode || null,
        img: img || null,
        status: status|| null,
        genres: extra || null,
      })))
  })
  
    await Promise.all(promises.anime).then(anime => {
      promises.anime = anime;
    })
    
    // pagination handler
    const prev = $('div.hpage a.l').text().trim();
    const next = $('div.hpage a.r').text().trim();

    promises.pagination.prev = prev || null;
    promises.pagination.next = next || null;
    // =====

    return promises;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

const animeList = async (query, page) => {
  try {
    const res = await fetch(`${url.BASE_URL}/pencarian/?halaman=${page}&${query}`);
    const body = await res.text();
    const $ = cheerio.load(body);
    const promises = {
      anime: [],
      pagination: {},
    };
    
    $('div.listupd div.bs').each((index, element) => {
      const el = $(element);
      const name = el.find('div.bsx div.tt').text().trim();
      const slug = el.find('div.bsx a').attr('href').split('/')[4];
      const type = el.find('div.bsx a div.limit div.typez').text().trim();
      const episode = el.find('div.bsx a div.limit div.bt span.epx').text().trim();
      const img = el.find('div.bsx a div.limit img.lazy').attr('data-src');
      const status = el.find('div.bsx a div.limit div.bt span.sb').text();
    
      promises.anime.push(getGenres(slug).then(extra => ({
        slug: slug || null,
        name: name || null,
        type: type || null,
        episode: episode || null,
        img: img || null,
        status: status|| null,
        genres: extra || null,
      })))
  })
  
    await Promise.all(promises.anime).then(anime => {
      promises.anime = anime;
    })
    
    // pagination handler
    const prev = $('div.hpage a.l').text().trim();
    const next = $('div.hpage a.r').text().trim();

    promises.pagination.prev = prev || null;
    promises.pagination.next = next || null;
    // =====

    return promises;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
}

module.exports = {
  ongoingSeries,
  animeDetails,
  animeEpisode,
  animeVideoSources,
  search,
  genres,
  genre,
  characterTypes,
  characterType,
  movies,
  animeList,
}