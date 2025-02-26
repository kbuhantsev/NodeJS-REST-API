FROM node:19

WORKDIR /phonebook_api

COPY . /phonebook_api  

RUN npm install

EXPOSE 3000

CMD ["node", "bin/server.js"]