
# Guts

A Nx-based monorepo that contains some important stuff (most likely just for learning purpose).

## Project structure

```
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
