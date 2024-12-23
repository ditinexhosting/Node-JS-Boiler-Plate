const {env, mongoose, app} = require('./config');
const {
  constants: {LOG_LEVELS},
} = require('./utils');

/**
 * Overwrite default console log
 * So that error and server log can be handled in structured way
 */
var origLog = console.log;
console.log = (...args) => {
  let level = LOG_LEVELS.DEBUG;
  if (Object.keys(LOG_LEVELS).includes(args[args.length - 1])) {
    level = args[args.length - 1];
    args.pop();
  }
  origLog(new Date(), ' ', level, '\t : ', ...args);
};

/**
 * Connect Mongoose and start server
 */

mongoose
  .connect(env.mongodb)
  .then(() => {
    app.listen(env.port, () => {
      console.log(
        `Server started on port ${env.port} (${env.env})`,
        LOG_LEVELS.INFO,
      );
    });
  })
  .catch(e => {
    console.log('Invalid database connection...!', LOG_LEVELS.ERROR);
  });
