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

Along with the log data generated from the system or codebase (messages for all log levels, and error stack + message for error log level), we also have some metadata to help identify the source of the logs.

The metadatas available are listed below:
- **project**: name of the project
- **repo**: the repo where the code resides
- **type**: what type of repo it is? backend? frontend? cloud app?
- **location**: where is the repo hosted?
- **timestamp**: the time when this log was generated
- **level**: what kind of log it is? info? error? etc... (RFC5424)
- **category**: the category this log belongs to (maybe file name or similar)
- **subcategory**: division of category (maybe line no, fn name, or logic - reference)
- **message**: the actual error message
- **stack**: if error, full error stack trace

# About Logging Mechanism
This project was inspired from the talk "[Everything You Wanted to Know About Logging](https://www.youtube.com/watch?v=pkh3J3u-jN4&ab_channel=node.js)" by Charlie Robbins

I have broken down the logging mechanism into 5 acts. (similar to what is there in the talk, but not exactly the same)

They are:

### **Act I** - Log Levels & Log Format
decide on the log levels to be used in the logging framework, and decide on the format in which the log data would be generated by the logging framework.

- [X] use log levels as per the guidelines of [RFC5424](https://www.rfc-editor.org/rfc/rfc5424)
- [X] have 7 log levels in this logging framework as described [above](#log-object)
- [X] have metadata and category and subcategory data with each log data as described [above](#log-object)


### **Act II** - Log Transport & Log Rotate
have a log transport (to file or to the console), and a log rotate feature.

- [X] save the log data in the log files as JSON format
- [X] output the log data in the console as string in the format:

`[timestamp] (log-level): repo-name > category > subcategory - message`<br>
if the log-level is error, then after this line, a full error stack trace would also be printed. 

- [X] have a process to rotate the logs on the basis of date, time, frequency, memory or space, etc
- [X] have archival and removal options for old log data

### **Act III** - Stream & Transfer
so, now that we have the logs in the code instance, we have to have a mechanism transfer and ship the log data outside.
Maybe you want the log files to be dumped into your local machine? or into a database? or say to some cloud drive? or say Azure BLOB storage or AWS S3, ... etc

> **TODO**

(work in progress)
### **Act IV** - Collect & Combine the Logs
In scenarios where your code was running on multiple instances or pods, then the logs would be generated from all the instances, and your full application logs would be split into n number of files, where n=number of instances of your running application.

in such cases, we have to combine and stitch all the logs together, maintaining chronological order

> **TODO**

### **Act V** - Visualize, Filter & Sort, and Mutation
Once all the logs are gathered into one place, we can have a portal or a visulaization tool, where we can view all the logs, search and filter the log data based on all the metadata or some keywords.

We can also apply mutation to the log data, to convert the technical log strings (example error code or log id or number) into a more human understandable words.

Example:
- HTTP 404 -> resource not found
- ENOENT -> No such file or directory
- etc.

> **TODO**
