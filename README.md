# tvmaze

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

###

State management using composables

- write that genres are from the doc here - https://www.tvmaze.com/faq/32/genre-definitions

- Reusable
- Clean
- No library possible
- Add unit tests, and e2e tests using playwright
- Responsive
- Add Cacheing mechanism
- Add accessibility test results and lighthouse performance result
  https://vueschool.io/articles/vuejs-tutorials/how-to-structure-a-large-scale-vue-js-application/

### State management

### Usage of base components

```
BaseInput.vue

<!-- With label (slot) -->
<BaseInput v-model="email" type="email" name="email" autocomplete="email" placeholder="you@example.com">
  Email
</BaseInput>

<!-- Without label: provide aria-label -->
<BaseInput v-model="q" placeholder="Search…" aria-label="Search" />

<!-- Need numbers? Use the modifier at call site -->

<BaseInput v-model.number="age" type="number">Age</BaseInput>
```
