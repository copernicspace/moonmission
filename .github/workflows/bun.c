name: install-bun
on: [push]
jobs:
  install-bun:
    name: install-bun
    runs-on: ubuntu-latest
    steps:
      # ...
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2

      # run any `bun` or `bunx` command
      - run: bun install
      - run: bun index.ts
      - run: bun run build