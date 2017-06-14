FROM node:8.1.0

WORKDIR /opt/app
COPY ./node_modules /opt/app/node_modules
RUN npm rm bcryp && npm install bcrypt
COPY ./dist /opt/app/dist

WORKDIR /opt/app/dist
CMD ["node", "server/bin/www.js"]
