const winston = require('winston');
require('winston-daily-rotate-file');

// decide on log level based on environment [dev / qa / staging / prod]
const environment = 'dev'; // to be added from process.env
let level = environment === 'prod' ? 'http' : 'silly'

// default meta data
let project = 'Project Logging'
let repo = 'NodeJS-Logging-Mechanism'
let type = 'script'
let location = 'local runtime'

// output file
let logDir = './logFiles/';
let errorFileName = 'error.log';
let comboFileName = 'combined.log';


/**
 * A log object that will take care of the logging mechanism, built on top of Winston.
 * 
 * Note: Log Levels available (as per RFC5424) are:
 * 
 * 0. error
 * 1. warn
 * 2. info
 * 3. http
 * 4. verbose
 * 5. debug
 * 6. silly
 * 
 * You can also pass an object along with the log data in the end, that will act as a metadata.
 * a sample object format: `{ category: '<enter-category>', subcategory: '<enter-subcategory>' }`
 */
const log = winston.createLogger({
    level: level,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    defaultMeta: { project: project, repo: repo, type: type, location: location },
    transports: [
        new winston.transports.DailyRotateFile({
            level: 'error',
            filename: `${logDir}%DATE%-${errorFileName}`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: null,
            maxFiles: '30d'
        }).on('new', function (newFilename) {
            console.log("> on new:", newFilename);
            // do something, or perform some actions...
        }).on('rotate', function (oldFilename, newFilename) {
            console.log("> on rotate:", oldFilename, newFilename);
            // do something, or perform some actions...
        }).on('archive', function (zipFilename) {
            console.log("> on archive:", zipFilename);
            // do something, or perform some actions...
        }).on('logRemoved', function (removedFilename) {
            console.log("> on logRemoved:", removedFilename);
            // do something, or perform some actions...
        }),

        new winston.transports.DailyRotateFile({
            filename: `${logDir}%DATE%-${comboFileName}`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: null,
            maxFiles: '30d'
        }).on('new', function (newFilename) {
            console.log("> on new:", newFilename);
            // do something, or perform some actions...
        }).on('rotate', function (oldFilename, newFilename) {
            console.log("> on rotate:", oldFilename, newFilename);
            // do something, or perform some actions...
        }).on('archive', function (zipFilename) {
            console.log("> on archive:", zipFilename);
            // do something, or perform some actions...
        }).on('logRemoved', function (removedFilename) {
            console.log("> on logRemoved:", removedFilename);
            // do something, or perform some actions...
        }),

        // new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.Console({ format: winston.format.printf(info => `[${info.timestamp}] (${info.level}): ${info.repo} > ${info.category} > ${info.subcategory} - ${info.message} ${info.stack ? '\n' + info.stack : ''}`) })
    ]
});


module.exports.log = log;
