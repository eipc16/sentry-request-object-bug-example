import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HttpClient as HttpClientIntegration } from '@sentry/integrations';
import * as Sentry from '@sentry/react';
import { Hook, Console, Decode } from 'console-feed';

Sentry.init({
  dsn: 'https://123@123.ingest.sentry.io/123',
  debug: true,
  release: 'local-test',
  environment: 'local-test',
  integrations: [new HttpClientIntegration()],
});

function App(): JSX.Element {
  const [logs, setLogs] = useState<ReturnType<typeof Decode>[]>([]);

  useEffect(() => {
    Hook(window.console, (log) => {
      setLogs((currentLogs) => [Decode(log), ...currentLogs]);
    });
  }, []);

  return (
    <Router>
      <main>
        <div
          style={{
            display: 'flex',
            height: '100px',
            width: '100%',
            justifyContent: 'space-around',
          }}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              fetch('/api/error', {
                method: 'post',
                body: JSON.stringify({ property: 'value' }),
              });
            }}
          >
            Simple Fetch
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              fetch(
                new Request('/api/error', {
                  method: 'post',
                  body: JSON.stringify({ property: 'value' }),
                })
              );
            }}
          >
            Fetch with Request Object
          </button>
        </div>
        <div style={{ padding: '25px' }}>
          <Console logs={logs as any} variant="dark" />
        </div>
      </main>
    </Router>
  );
}

export default App;
