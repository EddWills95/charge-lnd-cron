FROM nikolaik/python-nodejs:python3.8-nodejs12-alpine

WORKDIR /app
COPY . .

# Get charge-lnd and install
RUN apk add --no-cache git
RUN git clone https://github.com/accumulator/charge-lnd.git
RUN cd charge-lnd && pip install -r requirements.txt

# Install deps for cron-watcher
RUN yarn install --production

# Run app
CMD ["node", "index.js"]