# Animasu API - Unofficial Animasu API
<p align="center">
  <a href="https://github.com/Abizarreyy/animasu-api"><img src="https://github.com/Abizarreyy/animasu-api/blob/media/kaguya.gif?raw=true" alt="chika fujiwara melting" /></a>
</p>

## Table of Contents

- [Installation](#installation)

  - [Local](#local)

- [API Documentation (Cara menggunakan)](#api-documentation)

  - [Search (Cari anime dengan Keyword)](#search)

  - [Ongoing Series (Anime yang Sedang Tayang)](#ongoing-series)

  - [Anime Details (Detail Informasi Anime)](#anime-details)
 
  - [Anime Episode (Dapatkan Link Streaming Anime dan Movie)](#anime-episode)

  - [Genre (Cari anime berdasarkan Genre)](#genre)

  - [Character Type (Cari anime berdasarkan Tipe Karakter)](#character-type)

  - [Filter List (Cari anime berdasarkan Kriteria)](#filter-list)

  - [Movies (Kumpulan Movie)](#movies)

- [Daftar Genre Yang Tersedia](#daftar-genre-yang-tersedia)

- [Daftar Tipe karakter Yang Tersedia](#daftar-tipe-karakter-yang-tersedia)

- [Author](#author)

## Installation
### Local
Run command berikut untuk cloning repository ini, dan install dependencies:

```cmd
git clone https://github.com/Abizarreyy/animasu-api.git
cd animasu-api
npm install
```

atau

```cmd
git clone https://github.com/Abizarreyy/animasu-api.git; cd animasu-api; npm install
```

**Setup Environment Variable:**

Rename .env.example menjadi .env dan tentukan URL situs web animasu saat ini ke variable `BASE_URL` contoh:

```env
BASE_URL=https://animasu.cc
```

**Start Local Node/Express Server dengan command berikut:**
```cmd
npm run dev
```

## API Documentation
📣Baca cara menggunakan dengan benar! 📣

Contoh dibawah menggunakan <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" target="_blank">Fetch API</a>, atau bisa menggunakan library lainnya.

### API Entries

`http://localhost:5000/api/v1`

```js
const response = await fetch('http://localhost:5000/api/v1');
const data = await response.json();
console.log(data);
```

Output dibawah adalah Endpoints yang bisa anda gunakan saat ini
```json
{
  "message": "API Entries",
  "entries": [
    {
      "Search": "/api/v1/search/:keyword/:page",
      "Ongoing Series": "/api/v1/ongoing-series/:page",
      "Anime Details": "/api/v1/anime/:slug",
      "Anime Episode": "/api/v1/episode/:slug",
      "Genre": "/api/v1/genre/:slug/:page",
      "Character Type": "/api/v1/character-type/:slug/:page",
      "Filter List": "/api/v1/filter-list/:query/:page",
      "Movies": "/api/v1/movies/:page"
    }
  ]
}
```

***

### Search

`http://localhost:5000/api/v1/:keyword/:page`

```js
const response = await fetch('http://localhost:5000/api/v1/search/dragon ball/1');
const data = await response.json();
console.log(data);
```

Output:
```json
{
  "anime": [
    {
      "slug": "dragon-ball-super-super-hero",
      "name": "Dragon Ball Super: Super Hero",
      "type": "Movie",
      "episode": "Movie",
      "img": "https://i1.wp.com/v2.animasu.cc/wp-content/uploads/2022/09/122797.jpg",
      "status": "Selesai ✓"
    },
    {
      "slug": "super-dragon-ball-heroes-indo",
      "name": "Super Dragon Ball Heroes",
      "type": "ONA",
      "episode": "Episode 50",
      "img": "https://cdn.myanimelist.net/images/anime/1480/92990.jpg",
      "status": "🔥🔥🔥"
    },
    {...}
  ]
  "paginationCount": 1
}
```

***

### Ongoing Series

`http://localhost:5000/api/v1/ongoing-series/:page`

```js
const response = await fetch('http://localhost:5000/api/v1/ongoing-series/1');
const data = await response.json();
console.log(data);
```

Output:

```json
{
  "anime": [
    {
      "slug": "dosanko-gal-wa-namara-menkoi",
      "name": "Dosanko Gal wa Namara Menkoi",
      "type": "TV",
      "episode": "Episode 9",
      "img": "https://i2.wp.com/v2.animasu.cc/wp-content/uploads/2024/01/136906-1.jpg",
      "status": "🔥🔥🔥"
    },
    {
      "slug": "oroka-na-tenshi-wa-akuma-to-odoru",
      "name": "Oroka na Tenshi wa Akuma to Odoru",
      "type": "TV",
      "episode": "Episode 9",
      "img": "https://i1.wp.com/v2.animasu.cc/wp-content/uploads/2024/01/139271-1.jpg",
      "status": "🔥🔥🔥"
    },
    {...}
  ],
  "pagination": {
    "prev": null,
    "next": "Lebih Lama"
  }
}
```

***

### Anime Details

`http://localhost:5000/api/v1/anime/:slug`


```js
const response = await fetch('http://localhost:5000/api/v1/anime/super-dragon-ball-heroes-indo');
const data = await response.json();
console.log(data);
```

Output:

```json
{
    "img": "https://cdn.myanimelist.net/images/anime/1480/92990.jpg",
    "title": "Super Dragon Ball Heroes Sub Indo",
    "name": "Super Dragon Ball Heroes",
    "status": "Sedang Tayang 🔥",
    "release": "Jul 1, 2018",
    "duration": "8 Menit",
    "type": "ONA",
    "synopsis": "Pada Mei 2018, V-Jump mengumumkan anime promosi untuk Dragon Ball Heroes, permainan kartu arcade dan perdagangan Jepang yang belum pernah dirilis di Barat. Anime ini diharapkan pendek dan tidak diharapkan untuk disiarkan di TV. Ini akan mengadaptasi Game Prison Planet Arc, sepenuhnya rinci dalam manga Heroes yang diterbitkan di Saikyou Jump, yang belum pernah diterbitkan dalam bahasa Inggris. Episode pertama akan debut 1 Juli 2018 di Aeon Lake Town.",
    "genres": [
      {
        "genre": "Aksi",
        "slug": "aksi"
      },
      {
        "genre": "Fantasi",
        "slug": "fantasi"
      },
      {
        "genre": "Komedi",
        "slug": "komedi"
      },
      {...}
    ],
    "characterTypes": [
      {
        "type": "Ambisi",
        "slug": "ambisius"
      },
      {
        "type": "Blakblakan",
        "slug": "blakblakan"
      },
      {
        "type": "Cerewet",
        "slug": "cerewet"
      },
      {...}
    ],
    "episodes": [
      {
        "episode": "Episode 50",
        "slug": "nonton-super-dragon-ball-heroes-episode-50"
      },
      {
        "episode": "Episode 49",
        "slug": "nonton-super-dragon-ball-heroes-episode-49"
      },
      {
        "episode": "Episode 48",
        "slug": "nonton-super-dragon-ball-heroes-episode-48"
      },
      {...}
    ]
}
```

***

### Anime Episode

`http://localhost:5000/api/v1/episode/:slug`

```js
const response = await fetch('http://localhost:5000/api/v1/episode/nonton-super-dragon-ball-heroes-episode-50');
const data = await response.json();
console.log(data);
// kalau movie langsung slug nya saja
```

Output:

```json
[
  {
    "title": "Nonton Super Dragon Ball Heroes Episode 50 Sub Indo",
    "name": "Super Dragon Ball Heroes",
    "status": "Sedang Tayang 🔥",
    "slug": "super-dragon-ball-heroes-indo",
    "img": "https://cdn.myanimelist.net/images/anime/1480/92990.jpg",
    "iframes": [
      {
        "label": "480p [1]",
        "src": "https://new.uservideo.xyz/file/zoronime-sdbh-50-480p-mp4/?embed=true&autoplay=true"
      },
      {
        "label": "480p [2]",
        "src": "https://www.blogger.com/video.g?token=AD6v5dwzxEMwqmwBHzqstPJqQWAu4AHDgMCANsJhrBoO7KFjBcMOVwkuJEwuhL-HleCejGIDBtMX2wbE03nfBo1VxcIBHooU1eBJ7xnrtObjaXE5aBj6LJqmX10UBJmYCDljOxp24Hho"
      },
      {
        "label": "1080p [1]",
        "src": "https://mega.nz/embed/SiJSkQLT#M9g8eiq67efd01HvoJxmBXx4h6CqMLGTSLtSicrwakI"
      },
      {
        "label": "1080p [2]",
        "src": "https://wibufile.com/embed/hOhYOpHQsRkgh8z"
      },
      {
        "label": "1080p [3]",
        "src": "https://krakenfiles.com/embed-video/hgKn4Ey0MR"
      }
    ],
    "episodes": [
      {
        "episode": "Episode 50",
        "slug": "nonton-super-dragon-ball-heroes-episode-50"
      },
      {
        "episode": "Episode 49",
        "slug": "nonton-super-dragon-ball-heroes-episode-49"
      },
      {
        "episode": "Episode 48",
        "slug": "nonton-super-dragon-ball-heroes-episode-48"
      },
      {...}
    ]
  }
]
```

***

### Genre

`http://localhost:5000/api/v1/genre/:slug/:page`


```js
const response = await fetch('http://localhost:5000/api/v1/genre/aksi/1');
const data = await response.json();
console.log(data);
```

Ouput:

```json
{
  "anime": [
    {
      "slug": "hakozume-kouban-joshi-no-gyakushuu",
      "name": "Hakozume: Kouban Joshi no Gyakushuu",
      "type": "TV",
      "episode": "13 Episode",
      "img": "https://i2.wp.com/v2.animasu.cc/wp-content/uploads/2022/01/119512.jpg",
      "status": "Selesai ✓"
    },
    {
      "slug": "kuroko-no-basket-tip-off",
      "name": "Kuroko no Basket: Tip Off",
      "type": "Special",
      "episode": "1 Episode",
      "img": "https://i1.wp.com/v2.animasu.cc/wp-content/uploads/2022/03/gekidzoban-kuroko-no-basket-last-game-5dab845da4061-1-11zon.webp",
      "status": "Selesai ✓"
    },
    {...}
  ],
  "paginationCount": 176
}
```

***

### Character Type

`http://localhost:5000/api/v1/character-type/:slug/:page`

```js
const response = await fetch('http://localhost:5000/api/v1/character-type/cerewet/1');
const data = await response.json();
console.log(data);
```

Output:

```json
{
  "anime": [
    {
      "slug": "one-piece-remastered-batch",
      "name": "One Piece Remastered Batch",
      "type": "TV",
      "episode": "Episode",
      "img": "https://i2.wp.com/v2.animasu.cc/wp-content/uploads/2024/01/100624l.jpg",
      "status": "Selesai ✓"
    },
    {
      "slug": "bang-dream-its-mygo-indo",
      "name": "BanG Dream! It’s MyGO!!!!!",
      "type": "TV",
      "episode": "13 Episode",
      "img": "https://i0.wp.com/v2.animasu.cc/wp-content/uploads/2023/06/136693.jpg",
      "status": "Selesai ✓"
    },
    {...}
  ],
  "paginationCount": 8
}
```

***

### Filter List

`http://localhost:5000/api/v1/filter-list/:query/:page`

```js
const response = await fetch('http://localhost:5000/api/v1/filter-list/genre[]=aksi&karakter[]=overpower/1');
const data = await response.json();
console.log(data);
```
Output:

```json
{
  "anime": [
    {
      "slug": "noragami-aragoto-ova-s2",
      "name": "Noragami Aragoto OVA Season 2",
      "type": "OVA",
      "episode": "2 Episode",
      "img": "https://cdn.myanimelist.net/images/anime/12/75331.jpg",
      "status": "Selesai ✓"
    },
    {
      "slug": "kekkai-sensen-ousama-no-restaurant-no-ousama",
      "name": "Kekkai Sensen: Ousama no Restaurant no Ousama",
      "type": "OVA",
      "episode": "1 Episode",
      "img": "https://cdn.myanimelist.net/images/anime/1861/96667.jpg",
      "status": "Selesai ✓"
    },
  {...}
  ],
  "pagination": {
    "prev": null,
    "next": "Selanjutnya"
  }
}
```

Format Query Tipe Karakter `karakter[]=<slug>`

Format Query Genre `genre[]=<slug>`

Query dipisahkan dengan tanda "&", contoh jika ingin mencari anime dengan tipe karakter Overpower dan Jenius

`http://localhost:5000/api/v1/filter-list/karakter[]=overpower&karakter[]=jenius/:page`

Jika ingin menambahkan berbagai genre tinggal gabungkan seperti diatas (urutan tidak berpengaruh)

`http://localhost:5000/api/v1/filter-list/karakter[]=overpower&karakter[]=jenius&genre[]=aksi&genre[]=sekolahan/:page`

***

### Movies

`http://localhost:5000/api/v1/movies/:page`

```js
const response = await fetch('http://localhost:5000/api/v1/movies/1');
const data = await response.json();
console.log(data);
```

Output:

```json
{
  "anime": [
    {
      "slug": "kara-no-kyoukai-mirai-fukuin-sub-indonesia",
      "name": "Kara no Kyoukai: Mirai Fukuin",
      "type": "★ 8.05",
      "episode": "Sep 28, 2013",
      "img": "https://cdn.myanimelist.net/images/anime/6/56621.jpg",
      "status": null
    },
    {
      "slug": "overlord-movie-2-shikkoku-no-eiyuu",
      "name": "Overlord Movie 2: Shikkoku no Eiyuu",
      "type": "★ 7.72",
      "episode": "Mar 11, 2017",
      "img": "https://i3.wp.com/v2.animasu.cc/wp-content/uploads/2020/04/87758.jpg",
      "status": null
    },
    {...}
  ],
  "pagination": {
    "prev": null,
    "next": "Lebih Lama"
  }
}
```

## Daftar Genre Yang Tersedia
| **Slug**                 | **Genre**           |
| :---                     | :---                |
| aksi                     | Aksi                |
| anak-anak                | Anak-Anak           |
| luar-angkasa             | Antariksa           |
| avant-garde              | Avant Garde         |
| boys-love                | Boys Love           |
| dementia                 | Dementia            |
| donghua                  | Donghua             |
| drama                    | Drama               |
| ecchi                    | Ecchi               |
| fantasi                  | Fantasi             |
| fantasi-urban            | Fantasi Urban       |
| game                     | Game                |
| girls-love               | Girls Love          |
| gourmet                  | Gourmet             |
| harem                    | Harem               |
| horror                   | Horror              |
| iblis                    | Iblis               |
| isekai                   | Isekai              |
| josei                    | Josei               |
| komedi                   | Komedi              |
| live-action              | Live Action         |
| makanan                  | Makanan             |
| martial-arts             | Martial Arts        |
| mecha                    | Mecha               |
| medical                  | Medical             |
| militer                  | Militer             |
| misteri                  | Misteri             |
| mobil                    | Mobil               |
| musik                    | Musik               |
| olahraga                 | Olahraga            |
| parodi                   | Parodi              |
| perang                   | Perang              |
| petualangan              | Petualangan         |
| polisi                   | Polisi              |
| psikologis               | Psikologis          |
| reincarnation            | Reincarnation       |
| romansa                  | Romansa             |
| samurai                  | Samurai             |
| sci-fi                   | Sci-Fi              |
| seinen                   | Seinen              |
| sejarah                  | Sejarah             |
| sekolahan                | Sekolahan           |
| shoujo                   | Shoujo              |
| shoujo-ai                | Shoujo Ai           |
| shounen                  | Shounen             |
| shounen-ai               | Shounen Ai          |
| sihir                    | Sihir               |
| slice-of-life            | Slice of Life       |
| super-power              | Super Power         |
| supranatural             | Supranatural        |
| suspense                 | Suspense            |
| thriller                 | Thriller            |
| time-travel              | Time Travel         |
| vampir                   | Vampir              |
| yaoi                     | Yaoi                |

## Daftar Tipe Karakter Yang Tersedia

| **Slug**                      | **Karakter**    |
| :---                          | :---            |
| ambisius                      | Ambisi          |
| anak-anak                     | Anak-Anak       |
| anti-sosial                   | Anti-Sosial     |
| arad                          | Arad            |
| badass                        | Badass          |
| berbisnis                     | Berbisnis       |
| berisik                       | Berisik         |
| berjuang                      | Berjuang        |
| beruntung                     | Beruntung       |
| blakblakan                    | Blakblakan      |
| bounty-hunter                 | Bounty Hunter   |
| cerewet                       | Cerewet         |
| ceria                         | Ceria           |
| ceroboh                       | Ceroboh         |
| perempuan                     | Cewek           |
| couple                        | Couple          |
| laki-laki                     | Cowok           |
| dewa                          | Dewa            |
| dikagumi                      | Dikagumi        |
| disepelekan                   | Disepelekan     |
| ditakuti                      | Ditakuti        |
| iblis                         | Iblis           |
| jenius                        | Jenius          |
| kejam                         | Kejam           |
| legenda                       | Legenda         |
| licik                         | Licik           |
| loli                          | Loli            |
| mencolok                      | Mencolok        |
| menyebalkan                   | Menyebalkan     |
| mesum                         | Mesum           |
| monster                       | Monster         |
| narsis                        | Narsis          |
| optimis                       | Optimis         |
| overpower                     | Overpower       |
| pemalas                       | Pemalas         |
| pemalu                        | Pemalu          |
| pemarah                       | Pemarah         |
| pemimpin                      | Pemimpin        |
| penakut                       | Penakut         |
| pendendam                     | Pendendam       |
| pendiam                       | Pendiam         |
| pesimis                       | Pesimis         |
| polos                         | Polos           |
| precure                       | Precure         |
| semangat                      | Semangat        |
| setia                         | Setia           |
| slengekan                     | Slengekan       |
| sopan                         | Sopan           |
| suram                         | Suram           |
| terkutuk                      | Terkutuk        |
| totalitas                     | Totalitas       |
| tsundere                      | Tsundere        |
| vampir                        | Vampir          |
| yandere                       | Yandere         |
| zero-to-hero                  | Zero To Hero    |

## Author

Abizar Reyfan

> Anda bisa mengikuti saya di <a href="https://github.com/Abizarreyy" title="https://github.com/Abizarreyy">Github</a> &middot; <a href="https://www.instagram.com/abizar_reyfan/" title="https://www.instagram.com/abizar_reyfan/">Instagram</a>

Silakan Berikan ⭐ repositori ini jika Anda menyukainya atau project ini membantu Anda!

Copyright © 2024 <a href="https://abizar.vercel.app" title="https://abizar.vercel.app">Abizar Reyfan</a>.
