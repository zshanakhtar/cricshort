# This Dockerfile sets up a production environment
# For local development without Docker, you can:
# 1. Install bun (https://bun.sh)
# 2. Run: bun install
# 3. Run: bun run dev

# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun AS base
WORKDIR /usr/src/app

USER root
RUN apt-get update && apt-get install -y cron

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# build for production
ENV NODE_ENV=production
RUN bun run build

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app .
COPY --from=prerelease /usr/src/app/package.json .

# Add crontab file
COPY crontab /etc/cron.d/bun-cron
RUN chmod 0644 /etc/cron.d/bun-cron
RUN crontab /etc/cron.d/bun-cron

# Create log files
RUN touch /var/log/cron.log /var/log/innings.log /var/log/matches.log /var/log/points.log

# Add the startup script
COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

EXPOSE 3000/tcp

# Run as bun user
# USER bun

ENTRYPOINT ["/usr/local/bin/start.sh"]
