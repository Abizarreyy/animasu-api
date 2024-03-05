const express = require('express');
const router = express.Router();
const api = require('../api');

router.get('/search/:keyword/:page', (req, res) => {
  const keyword = req.params.keyword;
  const page = req.params.page;
  api.search(keyword, page).then(search => {
    res.status(200).json(search);
  }).catch(error => {
    res.status(500).send(error.message);
  })
});

router.get('/ongoing-series/:page', (req, res) => {
  const page = req.params.page;
  api.ongoingSeries(page).then(anime => {
    res.status(200).json(anime);
  }).catch(error => {
    res.status(500).send(error.message);
  })
});

router.get('/anime/:slug', (req, res) => {
  const slug = req.params.slug;
  api.animeDetails(slug).then(anime => {
    res.status(200).json(anime);
  }).catch(error => {
    res.status(500).send(error.message);
  })
});

router.get('/episode/:slug', (req, res) => {
  const slug = req.params.slug;
  api.animeEpisode(slug).then(anime => {
    res.status(200).json(anime);
  }).catch(error => {
    res.status(500).send(error.message);
  })
});

router.get('/genre/:slug/:page', (req, res) => {
  const slug = req.params.slug;
  const page = req.params.page;
  api.genre(slug, page).then(anime => {
    res.status(200).json(anime);
  }).catch(error => {
    res.status(500).send(error.message);
  })
});

router.get('/character-type/:slug/:page', (req, res) => {
  const slug = req.params.slug;
  const page = req.params.page;
  api.characterType(slug, page).then(types => {
    res.status(200).json(types);
  }).catch(error => {
    res.status(500).send(error.message);
  })
});

router.get('/movies/:page', (req, res) => {
  const page = req.params.page;
  api.movies(page).then(movies => {
    res.status(200).json(movies);
  }).catch(error => {
    res.status(500).send(error.message);
  })
});

router.get('/filter-list/:query/:page', (req, res) => {
  const page = req.params.page;
  const query = req.params.query;
  api.filterList(query, page).then(anime => {
    res.status(200).json(anime);
  }).catch(error => {
    res.status(500).send(error.message);
  })
});


module.exports = router;
