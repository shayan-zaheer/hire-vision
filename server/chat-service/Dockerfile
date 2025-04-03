FROM node:20-alpine

WORKDIR /app

# First install shared utils
COPY shared-utils/package.json /shared-utils/package.json
RUN cd /shared-utils && npm install --force

# Then install service dependencies
COPY chat-service/package*.json ./
RUN npm install

# Copy application code
COPY chat-service/. .
COPY shared-utils /shared-utils

# Create symlink for development convenience
RUN ln -s /shared-utils ./shared-utils

EXPOSE 8001
CMD ["node", "index.js"]