
# Guts

A Nx-based monorepo that contains some important stuff (most likely just for learning purpose).

## Project structure

```
apps
└── toy # toy implementation of interesting concepts
    └── google-doc
    └── block-editor
    └── websocket-server
└── cg # computer graphics demo (mostly based on WebGL & Three.js)
    └── static-cube
    └── particles
    └── raycast
    └── physics
    └── model-viewer
└── cloud # cloud computing
    └── otel-client: frontend with OpenTelemetry tracing
    └── otel-servers: backend with OpenTelemetry tracing
libs
└── toy # toy implementation of interesting concepts
    └── mini-webpack
    

```

## Usage

### init

```bash
# install local dependencies
npm install

# install nx globally as the monorepo toolchain
npm i -g nx
```

### build and run projects

- the common syntax for build, run and other tasks is: `nx run [project-name]`:[target]
- a list of available projects can be found in `workspace.json`

## Scaffolding

### creating apps

**Create new React App** [More Options](https://nx.dev/packages/react/generators/application#nrwlreactapplication)

```bash
nx g @nrwl/react:app --name=[project_name] --directory=[sub directory in apps directory]
```

- build：Webpack + Babel
- language：TypeScript
- framework：React
- Style：CSS Module
- Unit tests：Jest
- E2E tests：Cypress

**Create Express App** [More Options](https://nx.dev/packages/express/generators/application)

```bash
nx g @nrwl/express:application --name=[project_name] --directory=[sub directory in apps directory]
```

- build：Webpack + Babel
- language：TypeScript
- framework：Express

