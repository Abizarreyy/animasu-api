const express = require('express');
const routes = require('./routes/index');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API Entries',
    entries: [
      {
        "Search": "/api/v1/search/:keyword/:page",
        "Ongoing Series": "/api/v1/ongoing-series/:page",
        "Anime Details": "/api/v1/anime/:slug",
        "Anime Episode": "/api/v1/episode/:slug",
        "Anime Video Sources": "/api/v1/video-sources/:slug",
        "Genre List": "/api/v1/genres",
        "Genre": "/api/v1/genre/:slug/:page",
        "Character Type List": "/api/v1/character-types",
        "Character Type": "/api/v1/character-type/:slug/:page",
        "Movies": "/api/v1/movies/:page",
      }
    ]
  });
});

router.use('/', routes);

module.exports = router;