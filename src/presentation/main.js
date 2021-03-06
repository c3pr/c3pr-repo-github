const c3prLOG = require("node-c3pr-logger");
const express = require('express');
const bodyParser = require('body-parser');

const webhookListenerController = require('./webhookListenerController');
const config = require('../config');

const app = express();

app.use(webhookListenerController);

app.use(express.static('resources/public'));

app.use(bodyParser.json());

require('./prsController')(app);

// The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
    res.status(404).send(`No C3PR endpoint is listening at ${req.url}.`);
});

app.listen(config.c3pr.port, () => {
    console.log(`
c3pr-repo-github now listening at port ${config.c3pr.port}.

c3pr BRAIN changes URL will be: ${config.c3pr.changesUrl}
c3pr-repo-github prs URL will be: ${config.c3pr.prsUrl}

c3pr's git user name and password will be: '${config.c3pr.gitUserName.replace(/'/g, '')}' <'${config.c3pr.gitUserEmail.replace(/'/g, '')}'>
`); // TODO maybe add validation of presence of these vars
    c3prLOG(`C-3PR Github Repo is up at ${config.c3pr.prsUrl}`, {nodeName: 'c3pr-repo-github', correlationIds: 'boot', moduleName: 'main'});
});
