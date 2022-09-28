import { CompositePropagator } from '@opentelemetry/core';
import { B3InjectEncoding } from '@opentelemetry/propagator-b3';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const { context, trace } = require('@opentelemetry/api');
const { ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { WebTracerProvider } = require('@opentelemetry/sdk-trace-web');
const { B3Propagator } = require('@opentelemetry/propagator-b3');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { FetchInstrumentation } = require('@opentelemetry/instrumentation-fetch');
const { ZoneContextManager } = require('@opentelemetry/context-zone');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin');

const provider = new WebTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'JS-frontend',
  }),
});

const consoleExporter = new ConsoleSpanExporter();
const zipkinExporter = new ZipkinExporter(); // default endpoint: http://localhost:9411/api/v2/spans
// const otlpExporter = new OTLPTraceExporter(); // default collector endpoint: http://localhost:4318/v1/traces


provider.addSpanProcessor(new SimpleSpanProcessor(consoleExporter));
provider.addSpanProcessor(new SimpleSpanProcessor(zipkinExporter));


provider.register({
  contextManager: new ZoneContextManager(),
  propagator: new CompositePropagator({
    propagators: [
      new B3Propagator(),
      new B3Propagator({ injectEncoding: B3InjectEncoding.MULTI_HEADER })
    ]
  })
});

registerInstrumentations({
  instrumentations: [
    new FetchInstrumentation({
      ignoreUrls: [/localhost:8090\/sockjs-node/],
      propagateTraceHeaderCorsUrls: [
        'https://cors-test.appspot.com/test',
        'https://httpbin.org/get',
        /http:\/\/localhost:8080\.*/
      ],
      clearTimingResources: true
    })
  ]
});

const webTracer = provider.getTracer('otel-client-frontend');

const fetchData = (url: string) => fetch(url, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const onClick = (url: string) => {
  const clickSpan = webTracer.startSpan('click-span');
  context.with(trace.setSpan(context.active(), clickSpan), () => {
    fetchData(url).then((_data) => {
      trace.getSpan(context.active()).addEvent('fetching-single-span-completed');
      clickSpan.end();
    });
  });
};

const serverUrl = 'http://localhost:8080';

export function App() {
  return (
    <>
      <div
        onClick={() => onClick(serverUrl)}
        style={{
          width: '100px',
          height: '50px',
          backgroundColor: 'coral'
        }}>Click Me!
      </div>
    </>
  );
}

export default App;
