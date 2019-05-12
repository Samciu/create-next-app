const Sentry = require('@sentry/node');
const SentryIntegrations = require('@sentry/integrations');
const Cookie = require('js-cookie');

module.exports = (release = process.env.SENTRY_RELEASE) => {
  const sentryOptions = {
    dsn: 'https://c7d833a70e5f4b07a22094c7db8204f6@report.easyrentcars.com/9',
    release,
    maxBreadcrumbs: 50,
    attachStacktrace: true
  }

  // dev 环境
  if (process.env.NODE_ENV !== 'production') {
    const sentryTestkit = require('sentry-testkit');
    const { sentryTransport } = sentryTestkit();

    // Don't actually send the errors to Sentry
    sentryOptions.transport = sentryTransport;

    // Instead, dump the errors to the console
    sentryOptions.integrations = [
      new SentryIntegrations.Debug({
        // Trigger DevTools debugger instead of using console.log
        debugger: false,
      })
    ]
  }

  Sentry.init(sentryOptions);
  return {
    Sentry,
    CaptureException: (err, ctx) => {
      Sentry.configureScope(scope => {
        if (err.message) {
          // De-duplication currently doesn't work correctly for SSR / browser errors
          // so we force deduplication by error message if it is present
          scope.setFingerprint([err.message]);
        }
        
        if(err.statusCode) {
          scope.setExtra('statusCode', err.statusCode);
        }

        if (ctx) {
          const { req, res, errorInfo, query, pathname } = ctx;

          if (res && res.statusCode) {
            scope.setExtra('statusCode', res.statusCode);
          }

          if (process.browser) {
            scope.setTag('ssr', false);
            scope.setExtra('query', query);
            scope.setExtra('pathname', pathname);

            // on Client-side we use js-cookie package to fetch it
            const sessionId = Cookie.get('sid');
            if (sessionId) {
              scope.setUser({ id: sessionId });
            }
          } else {
            scope.setTag('ssr', true);
            scope.setExtra('url', req.url);
            scope.setExtra('method', req.method);
            scope.setExtra('headers', req.headers);
            scope.setExtra('params', req.params);
            scope.setExtra('query', req.query);

            // on Server-side we take session cookie directly from request
            if (req.cookies.sid) {
              scope.setUser({ id: req.cookies.sid });
            }
          }

          if (errorInfo) {
            Object.keys(errorInfo).forEach(key => 
              scope.setExtra(key, errorInfo[key])
            );
          }
        }
      })

      return Sentry.captureException(err);
    }
  }
}