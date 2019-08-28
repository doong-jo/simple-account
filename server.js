const
    express = require('express');
    app = express(),
    reload = require('reload'),
    watch = require('watch'),

    path = require('path'),

    staticServe = express.static(__dirname + '/src');
    port = 8090;

if (process.env.NODE_ENV == 'production') {
    console.log("Production Mode");
} else if (process.env.NODE_ENV == 'development') {
    reload(app).then(function (reloadReturned) {
        watch.watchTree(path.join(__dirname, 'src'), { 'interval': 0.5 }, function (f, curr, prev) {
        // Fire server-side reload event
        reloadReturned.reload();
        })
    }).catch(function (err) {
        console.error('Reload could not start, could not start server/sample app', err);
    });

    console.log("Development Mode");
}


app.use('/', staticServe);
app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index');
})

app.listen(port, () => {
    console.log(`Listening to ${port}...`);
});