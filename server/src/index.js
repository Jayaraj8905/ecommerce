let express = require('express');

let app = express();

// api routes
app.use('/users', require('./user/user.controller'));

app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.info(`Server has started on ${port}`));