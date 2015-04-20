var models  = require('./models'),
    User  	= models.users,
    Video   = models.videos;

User.destroy;
Video.destroy;

var videos = [
  {
    audience: 100,
    bookmarks_total: 50,
    broadcasting: true,
    channel: 'music',
    country: 'fr',
    title: 'test show 1',
    description: 'this is test show 1',
    duration_formatted: '07:03',
    start_time: 1287507036,
    end_time: 1287507048,
    explicit: false,
    source_video_id: 'xrd1wgm',
    language: 'en',
    metadata_credit_actors: "Michael J. Fox, Christopher Lloyd",
    metadata_credit_director: "Michael J. Fox, Christopher Lloyd",
    metadata_genre: 'drama',
    metadata_original_title: 'the tester show - part 1',
    onair: false,
    owner: "x456oo5",
    poster_url: "http:\/\/ak.dailymotion.com\/thumbnail\/x26m1j4\/45x60-abc.jpg",
    recurrence: 'daily',
    status: 'ready',
    tags: [],
    thumbnail_url: "http:\/\/ak.dailymotion.com\/thumbnail\/x26m1j4\/45x60-abc.jpg",
    video_url: "http:\/\/ak.dailymotion.com\/thumbnail\/x26m1j4\/45x60-abc.jpg",
    views_last_hour: 10,
    views_last_day: 100,
    views_last_week: 1000,
    views_last_month: 1500,
    views_last_total: 2000,
    embed_html: "<iframe frameborder=\"0\" width=\"480\" height=\"270\" src=\"//www.dailymotion.com/embed/video/x2mrggm\" allowfullscreen></iframe>"
  },
  {
    audience: 50,
    bookmarks_total: 25,
    broadcasting: false,
    channel: 'news',
    country: 'US',
    title: 'test show 2',
    description: 'this is test show 2',
    duration_formatted: '05:00',
    start_time: 1287507036,
    end_time: 1287507048,
    explicit: false,
    source_video_id: 'xrd1wgh',
    language: 'en',
    metadata_credit_actors: "Michael J. Fox",
    metadata_credit_director: "Michael J. Fox",
    metadata_genre: 'comedy',
    metadata_original_title: 'the tester show - part 2',
    onair: false,
    owner: "x456oo5",
    poster_url: "http:\/\/ak.dailymotion.com\/thumbnail\/x26m1j4\/45x60-abc.jpg",
    recurrence: 'daily',
    status: 'ready',
    tags: [],
    thumbnail_url: "http:\/\/ak.dailymotion.com\/thumbnail\/x26m1j4\/45x60-abc.jpg",
    video_url: "http:\/\/ak.dailymotion.com\/thumbnail\/x26m1j4\/45x60-abc.jpg",
    views_last_hour: 10,
    views_last_day: 100,
    views_last_week: 1000,
    views_last_month: 1500,
    views_last_total: 2000,
    embed_html: "<iframe frameborder=\"0\" width=\"480\" height=\"270\" src=\"//www.dailymotion.com/embed/video/x2mvy5j\" allowfullscreen></iframe>"
  },
  {
    audience: 10,
    bookmarks_total: 5,
    broadcasting: true,
    channel: 'sports',
    country: 'US',
    title: 'test show 3',
    description: 'this is test show 3',
    duration_formatted: '02:00',
    start_time: 1287507036,
    end_time: 1287507048,
    explicit: false,
    source_video_id: 'xrd1wgl',
    language: 'en',
    metadata_credit_actors: "Christopher Lloyd",
    metadata_credit_director: "Christopher Lloyd",
    metadata_genre: 'drama',
    metadata_original_title: 'the tester show - part 3',
    onair: false,
    owner: "x456oo5",
    poster_url: "http:\/\/ak.dailymotion.com\/thumbnail\/x26m1j4\/45x60-abc.jpg",
    recurrence: 'daily',
    status: 'processing',
    tags: [],
    thumbnail_url: "http:\/\/ak.dailymotion.com\/thumbnail\/x26m1j4\/45x60-abc.jpg",
    video_url: "http:\/\/ak.dailymotion.com\/thumbnail\/x26m1j4\/45x60-abc.jpg",
    views_last_hour: 10,
    views_last_day: 100,
    views_last_week: 1000,
    views_last_month: 1500,
    views_last_total: 2000,
    embed_html: "<iframe frameborder=\"0\" width=\"480\" height=\"270\" src=\"//www.dailymotion.com/embed/video/x14gtas\" allowfullscreen></iframe>"
  }
];

var users = [
  {
    username: 'tester1',
    password_digest: 'asdf',
    name: 'tester one',
    email: 'tester1@email.com',
    birthdate: '1/2/1896',
    state: 'NY',
    city: 'NYC'
  },
  {
    username: 'tester2',
    password_digest: 'asdf',
    name: 'tester two',
    email: 'tester2@email.com',
    birthdate: '1/2/1986',
    state: 'NJ',
    city: 'Montclair'
  },
  {
    username: 'tester3',
    password_digest: 'asdf',
    name: 'tester three',
    email: 'tester3@email.com',
    birthdate: '2/1/1996',
    state: 'CA',
    city: 'LA'
  }
];

var seedVideo = function() {
  videos.forEach(function(seed) {
    Video.bulkCreate(videos)
  });
};

var seedUser = function() {
  users.forEach(function(seed) {
    User.bulkCreate(users)
  });
};

seedVideo();
seedUser();

// module.exports = function(done) {
//   Video.destroy({ truncate: true }).then(function() {
//     User.destroy({ truncate: true }).then(function() {
//       Video.bulkCreate(videos).then(function() {
//         User.bulkCreate(users).then(function() {
//           done();
//         });
//       });
//     });
//   });
// };