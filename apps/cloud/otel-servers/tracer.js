'use strict';

const opentelemetry = require('@opentelemetry/api');
const {registerInstrumentations} = require('@opentelemetry/instrumentation');
const {NodeTracerProvider} = require('@opentelemetry/sdk-trace-node');
const {Resource} = require('@opentelemetry/resources');
const {SemanticResourceAttributes} = require('@opentelemetry/semantic-conventions');
const {SimpleSpanProcessor} = require('@opentelemetry/sdk-trace-base');
const {JaegerExporter} = require('@opentelemetry/exporter-jaeger');
const {ZipkinExporter} = require('@opentelemetry/exporter-zipkin');
const {HttpInstrumentation} = require('@opentelemetry/instrumentation-http');
const { B3Propagator, B3InjectEncoding } = require('@opentelemetry/propagator-b3');
const { CompositePropagator } = require('@opentelemetry/core');


module.exports = (serviceName) => {
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
    }),
  });

  // let exporter = new JaegerExporter();
  const exporter = new ZipkinExporter();
  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

  // Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
  provider.register({
    propagator: new CompositePropagator({
      propagators: [
        new B3Propagator(),
        new B3Propagator({ injectEncoding: B3InjectEncoding.MULTI_HEADER }),
      ],
    })
  });

  registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation(),
    ],
  });

  return opentelemetry.trace.getTracer('http-example');
};
