# Nunjucks Template Tests

This subdirectory contains test code for the Nunjucks templates in this repository, written using the [ts-jest](https://github.com/kulshekhar/ts-jest) and [Nunjucks](https://mozilla.github.io/nunjucks/templating.html) libraries.

## Prerequisites

- Node.js v18 or later
- [yarn](https://yarnpkg.com/)

## Running the tests

1) `yarn install`
2) `yarn test`

## Adding more tests

1) Describe test case and inputs, based on the [format used by jest](https://jestjs.io/docs/getting-started):

<img width="815" alt="Image" src="https://github.com/user-attachments/assets/2f86e045-5c71-4fef-a750-0d4841f8b11e" />

2) Add any necessary test data under `./test_data/model|model-server` in a folder matching your test case's name (e.g. `002-model-all-techdocs`).