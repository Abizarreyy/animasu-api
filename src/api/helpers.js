const getCards = (body) => {

  const cards = [];

  body('div.listupd div.bs').each((index, element) => {
    const el = body(element);
    const name = el.find('div.bsx div.tt').text().trim();
    const slug = el.find('div.bsx a').attr('href').split('/')[4];
    const type = el.find('div.bsx a div.limit div.typez').text().trim();
    const episode = el.find('div.bsx a div.limit div.bt span.epx').text().trim();
    const img = el.find('div.bsx a div.limit img.lazy').attr('data-src');
    const status = el.find('div.bsx a div.limit div.bt span.sb').text() || null;

    cards.push({
      slug: slug || null,
      name: name || null,
      type: type || null,
      episode: episode || null,
      img: img || null,
      status: status || null,
    })

  })

  return cards;
}

const getPaginationCount = (body) => {
  const pagination = body('div.pagination .page-numbers:not(.next)');
  let paginationCount;
  if(pagination.length > 0) {
    paginationCount = Number(pagination.last().text().trim());
  }

  return paginationCount || 1;
}

const getPaginationButton = (body) => {
  const pagination = {};
  const prev = body('div.hpage a.l').text().trim();
  const next = body('div.hpage a.r').text().trim();

  pagination.prev = prev || null;
  pagination.next = next || null;

  return pagination;
}

module.exports = {
  getCards,
  getPaginationCount,
  getPaginationButton,
}