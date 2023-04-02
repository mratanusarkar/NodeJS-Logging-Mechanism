# NodeJS-Logging-Mechanism
Aim to develop a logging framework for node js applications using winston

# log object

The module exports a log object that will take care of the logging mechanism, built on top of Winston.

Note: Log Levels available (as per RFC5424) are:

0. error
1. warn
2. info
3. http
4. verbose
5. debug
6. silly

You can also pass an object along with the log data in the end, that will act as a metadata.
a sample object format: `{ category: '<enter-category>', subcategory: '<enter-subcategory>' }`

Example 1:
```javascript
const logger = require('../logger/logger');
logger.log.info(`my info message with some data: ${data}`, { category: 'file locator', subcategory: 'code block locator' });
```

Example 2:
```javascript
import { log } from '../logger/logger';
try {
  // some code
}
catch (err) {
  log.error(err, { category: 'file locator', subcategory: 'code block locator' });
}
```

# About Logging Mechanism
This project was inspired from the talk "[Everything You Wanted to Know About Logging](https://www.youtube.com/watch?v=pkh3J3u-jN4&ab_channel=node.js)" by Charlie Robbins

I have broken down the logging mechanism into 5 acts. (similar to what is there in the talk, but not exactly the same)

They are:

1. Act I - Log Levels & Log Format


2. Act II - Log Transport & Log Rotate


3. Act III - Stream & Transfer


4. Act IV - Collect & Combine the Logs


5. Act V - Visualize, Filter & Sort, and Mutation

