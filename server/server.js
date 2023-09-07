const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

// REQUIRED ROUTERS
const apiRouter = require('./routes/oAuthRouter');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const oAuthRouter = require('./routes/oAuthRouter');
const cookieController = require('./controllers/cookiesController');

// Use cors
app.use(cors());

// PARSE JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, './../dist')));

// // serve index.html from bundled dist folder
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, './../dist/index.html'));
// });

app.use((req, res, next) => {
  console.log('Request received:', req.method, req.path, req.body);
  next();
});

// app.use('*', oAuthRouter);
app.use('/verify', oAuthRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api', apiRouter);

app.get('*', async (req, res, next) => {
  if (req.path === '/app') return next();
  console.log('checking SSID cookie');
  if (Object.keys(req.cookies).length !== 0) {
    await cookieController.verifySession(req, res, () => {
      console.log('verified session');
      return res.redirect('/app');
    });
  } else {
    return next();
  }
});

// serve 404 status
// TODO: Add 404 html page

// Catch All for uncertain routes, redirect to build for react router
app.get('*', (req, res) => {
  console.log('entered build');
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.use((req, res) => res.status(404).send('Oops! Looks like you took a wrong turn!'));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };

  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Environments
if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
}
console.log('NODE_ENV: ', process.env.NODE_ENV);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
