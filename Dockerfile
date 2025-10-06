FROM node:18-alpine

RUN mkdir /app
WORKDIR /app

COPY ./package*.json /app/
RUN npm install

COPY . /app/
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

