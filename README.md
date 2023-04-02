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
