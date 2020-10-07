'use strict';

const express = require('express');

const PORT = 8080;

const app = express();

app.use(express.static('webapp'));

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
