# Copernic Space Moon Mission application
This is a stand-alone application that serves as the "client portal" for our 2024 Moon Mission.

# Documentation
## Installation & Setup

You'll need Docker, Bun, & Supabase installed.

First, initialise Supabase locally and add the environment variables:

```bash
    supabase init
    supabase start
```

```zsh
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

Then, run the command to build the container:

```bash
    docker-compose up --build
```


# To-Do
1. Github Action to push db migrations to prod