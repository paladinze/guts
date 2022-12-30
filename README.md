
# Guts

A Nx-based monorepo that contains some important stuff (most likely just for learning purpose).

## Project structure

```
apps
└── toy # toy implementation of interesting concepts
    └── google-doc
    └── block-editor
    └── websocket-server
└── css # CSS processors demo & mockups
    └── sass-demo: demo of SASS preprocessor
    └── emotion: demo of emotion style-in-js solution
└── two # canvas based drawing
    └── canvas-basic: demo of basic 2D drawing API
    └── canvas-events: drawing API + mouse events
    └── canvas-paints: drawing API + pixel-based painting      
└── cg # computer graphics demo (mostly based on WebGL & Three.js)
    └── static-cube
    └── particles
    └── raycast
    └── physics
    └── model-viewer
    └── shader-noise: experiment on noises and shaders
    └── r3f-starter: basic rendering features of React Three fiber (R3F)
    └── r3f-model: glTF (with draco) model imports and animation
    └── r3f-text: 3D text with matcap material
    └── r3f-baked-scene: render a baked scene + shader material
    └── r3f-pointer: handle mouse events and cursor style
    └── r3f-postprocess: postprocessing
    └── r3f-physics: simulation on rigidbody collisions of instanced meshes
    └── zefolio: personal portfolio based on r3f and webgl
└── cloud # cloud computing
    └── otel-client: JS frontend with OpenTelemetry tracing
    └── otel-servers: JS backend with OpenTelemetry tracing
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

- the common syntax for start a project in dev mode: `nx serve [category]-[project-name]`
  - a list of available projects can be found in `workspace.json`
  - example: `nx serve cg-zefolio`
- run custom task: `nx run [category]-[project-name]:[task-name]`
  - available task names are defined in the `project.json` of each project
  - example: `nx run cg-zefolio:build`


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

