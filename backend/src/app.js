const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');



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




/*

 {
       
app.use(helmet.hsts({ maxAge: 31536000 }));
app.use(helmet());
app.use(helmet({
    contentSecurityPolicy:  directives: {
          defaultSrc: ["'self'", 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js'],
          connectSrc: ["'self'", 'http://localhost:3000/api/v1/users/login',  
          'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js']
        }
      },
    
    referrerPolicy: { policy: 'no-referrer' },
    featurePolicy: {
      features: {
        payment: ['self'],
      },
    },
    expectCt: { enforce: true, maxAge: 123 },
    hsts: { maxAge: 31536000, includeSubDomains: true },
    originAgentCluster: 'origin-keyed',
  }));
app.use(helmet.hidePoweredBy({ setTo: 'PHP 8.2.0'}));
app.use(helmet.xssFilter({ setOnOldIE: true }));
app.use(helmet.noSniff({ nosniff: true }));
app.use(helmet.frameguard({ action: 'DENY' })); */
/* app.use(csp({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "http://localhost:3000"]
    }
  })); */

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

app.use('/api/v1/webhooks', webHookRoutes)
app.use('/api/v1/seeds', exportRoutes);



app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        status: "error",
        message: err.message
    });
    next();
});

module.exports = app;