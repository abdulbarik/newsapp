import './env';
import './db';

import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
const CronJob = require('cron').CronJob;


import routes from './routes';
import logger, { logStream } from './utils/logger';


const app = express();

/**
 * Call controller to execute news API.
 */
import NewsArticle from './controllers/articles';

const APP_PORT =
  (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || process.env.PORT || '3000';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';

app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;



app.use(morgan('tiny', { stream: logStream }));
app.use(bodyParser.json());
// API Routes
app.use('/api', routes);

// This error handler must be before any other error middleware


app.listen(app.get('port'), app.get('host'), () => {
  logger.info(`Node server is started at http://${app.get('host')}:${app.get('port')}`);
  const article = new NewsArticle();

  /**
   *  Start CRON JOB from here.
   */
  new CronJob({
    cronTime: '*/30 * * * *',
    onTick: () => {
        logger.info('Cron started to create offer in every 30 mins');
        article.init();
    },
    start: true,
    runOnInit: true
})
});

// Catch unhandled rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled rejection', err);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception', err);
});

export default app;
