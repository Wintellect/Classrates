
var express = require('express');
var routes = require('./routes');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var path = require('path');
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'))); 
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
 
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

var comments = require('./routes/comments');
app.get('/comments', comments.comments);

//Create temporary storage items
var ratings = [
  {
    classId: 0,
    ratingCount: 0,
    ratingTotal: 0

  },
  {
    classId: 1,
    ratingCount: 0,
    ratingTotal: 0
  },
  {
    classId: 2,
    ratingCount: 0,
    ratingTotal: 0
  },
  {
    classId: 3,
    ratingCount: 0,
    ratingTotal: 0
  },
  {
    classId: 4,
    ratingCount: 0,
    ratingTotal: 0
  },
  {
    classId: 5,
    ratingCount: 0,
    ratingTotal: 0
  }
];

var commentCounts = [0, 0, 0, 0, 0, 0];
var classTitles = ['Deep Learning with Neural Networks', 'Advanced Calculus for Scholarship Athletes', 'Data Structures and Algorithms in Python', 'Processing Big Data with Spark and Hadoop', 'Essential Mathematics for Machine Learning', 'Social Media for Career Advancement'];
var classDescriptions = [
  'The future of software development lies in deep learning. Discover what deep learning is, how it works, and how to build neural networks using popular libraries such as CNTK and TensorFlow.',
  'Take a deep dive into integrals, partial differential equations, and other tenets of advanced calculus. A great way to kill time on the sidelines while waiting for your name to be called!',
  'Python is the language of choice for data scientists worldwide. Learn how to build machine-learning models in Python using popular libraries such as scikit-learn and TensorFlow.',
  'Learn how to use Apache Hadoop and Apache Spark to extract information from massive datasets. Also learn how to deploy Hadoop and Spark clusters in Azure with just a few button clicks.',
  'Machine learning is rooted in statistics. Prepare yourself for a career in machine learning by learning about regression and other tools that put the learning in machine learning.',
  'Social media has changed the world we live in, and the modern computer scientist must learn how to harness its power for good. Learn how to use Facebook, Twitter, and other social-media platforms to further your career.'
];
var imageUrls = ['/img/stars0.png', '/img/stars0.png', '/img/stars0.png', '/img/stars0.png', '/img/stars0.png','/img/stars0.png'];

global.ratings = ratings;
global.comments = [];
global.commentCounts = commentCounts;
global.classTitles = classTitles;
global.classDescriptions = classDescriptions;
global.imageUrls = imageUrls;

http.createServer(app).listen(app.get('port'), function(){   
  console.log('Express server listening on port ' + app.get('port'));
});
