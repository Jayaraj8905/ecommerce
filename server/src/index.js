let express = require('express');

let app = express();

app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.info(`Server has started on ${port}`));