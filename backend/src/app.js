const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
/* const msal = require('@azure/msal-node'); */



require('dotenv').config();


const { httpLogStream } = require('./utils/logger');

const authHandler = require('./middlewares/authHandler');
const userRoutes = require('./routes/user.routes');
const influencerRoutes = require('./routes/influencer.routes');
const celebrityRoutes = require('./routes/celebrity.routes');
const logRoutes = require('./routes/log.routes');
const salesBriefRoutes = require('./routes/salesBrief.routes');
const TaskRoutes = require('./routes/task.routes'); 

const exportRoutes = require('./routes/export-seeds.routes');
const webHookRoutes = require('./routes/webhook.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(morgan('combined', { stream: httpLogStream }));

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PUT','PATCH'],
}
));

/* const msalConfig = {
  auth: {
    clientId: 'cc55790a-85af-4585-8380-27647cb3a361',
    authority: 'https://login.microsoftonline.com/5f865142-0d0d-438b-92fe-96e73f712ad1',
    clientSecret: 'myf8Q~Wsibhvh0gEB6Pjz_cZPgiy9JDStLyeNbTn',
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Info,
    },
  },
};
 */
/* const msalClient = new msal.ConfidentialClientApplication(msalConfig); */

/* async function getAccessToken() {
  const tokenRequest = {
    scopes: ['https://analysis.windows.net/powerbi/api/.default'],
  };

  try {
    const response = await msalClient.acquireTokenByClientCredential(tokenRequest);
    return response.accessToken;
  } catch (error) {
    console.error('Error acquiring token', error);
    throw error;
  }
} */

app.get('/api/powerbi/token', async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    res.json({ accessToken : accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "https://cdn.jsdelivr.net", "http://localhost:3000"],
      connectSrc: ["'self'", "https://cdn.jsdelivr.net", 'http://localhost:3000'],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "http://localhost:3000"],
    }
  }));

app.use(compression());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/influencers', authHandler, influencerRoutes);
app.use('/api/v1/celebrities', authHandler, celebrityRoutes);
app.use('/api/v1/logs', authHandler, logRoutes);
app.use('/api/v1/salesbriefs', authHandler, salesBriefRoutes);
app.use('/api/v1/tasks', authHandler, TaskRoutes); 

console.log('Backend started 1')

app.use('/api/v1/webhooks', webHookRoutes);

console.log('Backend started 2');
app.use('/api/v1/seeds', exportRoutes);



app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        status: "error",
        message: err.message
    });
    next();
});

module.exports = app;