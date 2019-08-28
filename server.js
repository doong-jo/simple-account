const
    express = require('express');
    app = express(),
    reload = require('reload'),
    watch = require('watch'),

    path = require('path'),

    staticServe = express.static(path.join(__dirname, 'src'));
    port = 8090;

reload(app).then(function (reloadReturned) {
    watch.watchTree(path.join(__dirname, 'src'), { 'interval': 0.5 }, function (f, curr, prev) {
        // Fire server-side reload event
        reloadReturned.reload();
    });
}).catch(function (err) {
    console.error('Reload could not start, could not start server/sample app', err);
});

app.use('/', staticServe);
app.use('*', staticServe);

app.listen(port, () => {
    console.log(`Listening to ${port}...`);
});