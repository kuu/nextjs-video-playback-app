FROM --platform=linux/x86_64 node:lts

WORKDIR /

COPY . .

RUN npm install && npm run build

EXPOSE 80

ENTRYPOINT ["npm", "run", "start"]
