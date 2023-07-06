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
const fileRoutes = require('./routes/file.routes');
const NotificationRoutes = require('./routes/notification.routes');


const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({  limit: '50mb', extended: false }));
app.use(morgan('dev'));
app.use(morgan('combined', { stream: httpLogStream }));

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PUT','PATCH'],
}
));


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
      defaultSrc: ["'self'", "https://cdn.jsdelivr.net", "http://localhost:3000", "https://www.youtube.com/", "https://cdn.embedplaylist.com/js/playlist.js", "https://platform.twitter.com/widgets.js", "https://platform.twitter.com/widgets/widget_iframe.2b2d73daf636805223fb11d48f3e94f7.html?origin=https%3A%2F%2Fitplive.itpshare.com", "https://platform.twitter.com/js/tweet.b81b6d7af2d75db873cff6099e4f433a.js", "https://jnn-pa.googleapis.com/$rpc/google.internal.waa.v1.Waa/Create", "https://static.elfsight.com/platform/platform.js", "https://core.service.elfsight.com/p/boot/?page=https%3A%2F%2Fitplive.itpshare.com%2FEAFC&w=4561dddd-2089-462d-8bc6-20ae7a81d5c6", "https://static.elfsight.com/apps/yottie/release/a96f04fb9f1f003577deddcde770e194c495e326/app/yottie.js", "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js", "https://storage.elfsight.com/api/youtube?q=%2Fchannels%3Fid%3DUCS4vAU1B8bguVVHXi5rvQIw%26maxResults%3D1%26part%3Dsnippet%252CbrandingSettings%252Cstatistics%252CcontentDetails&callback=jQuery111305141344650396656_1688549203211&public_key=RWxmc2lnaHQuIEFsbCByaWdodHMgcmVzZXJ2ZWQu&_=1688549203212", "https://apis.google.com/js/platform.js", "https://platform.twitter.com/"],
      connectSrc: ["'self'", "https://cdn.jsdelivr.net", 'http://localhost:3000', "https://www.youtube.com/", "https://cdn.embedplaylist.com/js/playlist.js", "https://platform.twitter.com/widgets.js", "https://platform.twitter.com/widgets/widget_iframe.2b2d73daf636805223fb11d48f3e94f7.html?origin=https%3A%2F%2Fitplive.itpshare.com", "https://platform.twitter.com/js/tweet.b81b6d7af2d75db873cff6099e4f433a.js", "https://jnn-pa.googleapis.com/$rpc/google.internal.waa.v1.Waa/Create", "https://static.elfsight.com/platform/platform.js", "https://core.service.elfsight.com/p/boot/?page=https%3A%2F%2Fitplive.itpshare.com%2FEAFC&w=4561dddd-2089-462d-8bc6-20ae7a81d5c6", "https://static.elfsight.com/apps/yottie/release/a96f04fb9f1f003577deddcde770e194c495e326/app/yottie.js", "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js", "https://storage.elfsight.com/api/youtube?q=%2Fchannels%3Fid%3DUCS4vAU1B8bguVVHXi5rvQIw%26maxResults%3D1%26part%3Dsnippet%252CbrandingSettings%252Cstatistics%252CcontentDetails&callback=jQuery111305141344650396656_1688549203211&public_key=RWxmc2lnaHQuIEFsbCByaWdodHMgcmVzZXJ2ZWQu&_=1688549203212", "https://apis.google.com/js/platform.js"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "http://localhost:3000", "https://www.youtube.com/", "https://cdn.embedplaylist.com/js/playlist.js", "https://platform.twitter.com/widgets.js", "https://platform.twitter.com/widgets/widget_iframe.2b2d73daf636805223fb11d48f3e94f7.html?origin=https%3A%2F%2Fitplive.itpshare.com", "https://platform.twitter.com/js/tweet.b81b6d7af2d75db873cff6099e4f433a.js", "https://jnn-pa.googleapis.com/$rpc/google.internal.waa.v1.Waa/Create", "https://static.elfsight.com/platform/platform.js", "https://core.service.elfsight.com/p/boot/?page=https%3A%2F%2Fitplive.itpshare.com%2FEAFC&w=4561dddd-2089-462d-8bc6-20ae7a81d5c6", "https://static.elfsight.com/apps/yottie/release/a96f04fb9f1f003577deddcde770e194c495e326/app/yottie.js", "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js", "https://storage.elfsight.com/api/youtube?q=%2Fchannels%3Fid%3DUCS4vAU1B8bguVVHXi5rvQIw%26maxResults%3D1%26part%3Dsnippet%252CbrandingSettings%252Cstatistics%252CcontentDetails&callback=jQuery111305141344650396656_1688549203211&public_key=RWxmc2lnaHQuIEFsbCByaWdodHMgcmVzZXJ2ZWQu&_=1688549203212", "https://apis.google.com/js/platform.js"],
      imgSrc: ["'self'", "yt3.ggpht.com"],
    }
  }));

app.use(compression());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/influencers', authHandler, influencerRoutes);
app.use('/api/v1/celebrities', authHandler, celebrityRoutes);
app.use('/api/v1/logs', authHandler, logRoutes);
app.use('/api/v1/salesbriefs', authHandler, salesBriefRoutes);
app.use('/api/v1/tasks', authHandler, TaskRoutes); 
app.use('/api/v1/files', authHandler, fileRoutes);

app.use('/api/v1/notifications', authHandler, NotificationRoutes)

app.use('/api/v1/webhooks', webHookRoutes);

console.log('Backend started');
app.use('/api/v1/seeds', exportRoutes);



app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        status: "error",
        message: err.message
    });
    next();
});

module.exports = app;