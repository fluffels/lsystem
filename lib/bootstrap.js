var logger;

$(document).ready(function()
{
    include("lib/log4js.js");
    logger = Log4js.getLogger("main");
    logger.addAppender(new Log4js.BrowserConsoleAppender());
    logger.setLevel(Log4js.Level.TRACE);
    logger.trace("Program entry.");

    include("src/main.js");
    main();
});

