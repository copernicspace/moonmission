name: Run Tests

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:latest
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: password
          POSTGRES_DB: mydb
        ports:
          - 5432:5432
        options: >-
          --health-cmd "pg_isready -U postgres"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Bun
      uses: oven-sh/setup-bun@v1

    - name: Install dependencies
      run: bun install

    - name: Run tests
      run: bun test