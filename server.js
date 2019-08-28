const
    express = require('express');
    app = express(),

    path = require('path'),

    port = 8090;

app.use(express.static(path.join(__dirname, 'src')));

app.listen(port, () => {
    console.log(`Listening to ${port}...`);
});