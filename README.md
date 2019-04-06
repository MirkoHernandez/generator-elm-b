# generator-elm-b [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A minimalist elm project; it includes a build system implemented with gulp and rollup.

## Installation

```bash
npm install -g yo
npm install -g  git:<url of this repository>
```

Or clone this repository and install with npm link. 

```bash
npm link 
```

## Using this generator

Create a new project.

```bash
mkdir <project> && cd <project>
yo elm-b .
```

Create an elm json file (not included in the generator in order to
have the last available libraries).

```bash
npx elm init
```

Create the compiled files and start watching.

```bash
npx gulp init
npx gulp watch
```

## Generator structure

### Fixed part

- src/index.html
- src/Main.elm
- styles/main.scss
- main-rollup.js
- gulpfile.js
- rollup-config.js

### Flexible part
- package.json  - The name of the project is inserted here.

### Libraries

- elm : 0.19.0-bugfix6
- gulp
- gulp-elm
- gulp-sass
- rollup

Required for gulp pipe operations: 
- vinyl-buffer
- vinyl-source-stream

Required for rollup operations:
- rollup-plugin-commonjs
- rollup-plugin-json
- rollup-plugin-node-resolve
- rollup-plugin-postcss
- rollup-stream

## License

MIT © []()
