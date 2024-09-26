# Use Bun as the base image
FROM jarredsumner/bun:edge

WORKDIR /app

# Copy over your app code and package files
COPY . .

# Install dependencies using Bun
RUN bun install

# Run the build process using Bun
RUN bun build

# Start the application using Bun
CMD ["bun", "start"]