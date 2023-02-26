const logger = require('./logger/logger');

function todo() {
    try {

        logger.log.silly("This is a silly log.", { category: 'index.js', subcategory: 'todo()' });
        logger.log.debug("This is a debug log.", { category: 'index.js', subcategory: 'todo()' });
        logger.log.verbose("This is a verbose log.", { category: 'index.js', subcategory: 'todo()' });
        logger.log.http("This is a http log.", { category: 'index.js', subcategory: 'todo()' });
        logger.log.info("This is a info log.", { category: 'index.js', subcategory: 'todo()' });
        logger.log.warn("This is a warn log.", { category: 'index.js', subcategory: 'todo()' });
        logger.log.error("This is a error log.", { category: 'index.js', subcategory: 'todo()' });

        let a = mssql.a();
        console.log("print a:", a); // this line will never work due to error above

    } catch (error) {
        logger.log.error(error, { category: 'index.js', subcategory: 'todo()' });
    }
}

todo();
