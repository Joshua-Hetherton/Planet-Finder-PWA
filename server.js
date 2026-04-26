require('dotenv').config();

const app = require('./app');
const chalk = require('chalk');
const debug = require('debug')('app');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${chalk.green(PORT)}`);
    debug("Current:", process.env.NODE_ENV)
    console.log(chalk.blue(`http://localhost:${PORT}`));
});

    