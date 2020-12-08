<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
Alternatively, run in docker: ```docker build -t sv-server .``` and ```docker run -d -p 3000:3000 sv-server```
When connecting to mongodb running locally: ```DB_CONNECTION_STRING = "mongodb://host.docker.internal:27017/screening"```


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


  
  ## Clip categories
Any metadata you might want displayed outside of video e.g. film maker, duration, key info. Thumbnail for image search option. 
For each language:
location, tags, URL (sharing link from youtube), phrases.

## Inserting CSV data into MongoDB locally
Using mongodb shell to convert csv inputted list into an array
https://stackoverflow.com/questions/43699098/mongoimport-csv-file-that-contains-a-column-with-array-values

1. Create .tsv file. Save excel file as tab delimited .txt, then change filename to .tsv in explorer
2. Import .tsv file. From cmd NOT mongo shell run : `mongoimport -d screening -c clips --type tsv --headerline C:\Users\nkc124\Desktop\SVDatav2.tsv`
3. Convert list into array. In mongodb shell run:

```use screening```

```db.clips.find().forEach(function (el) {  var str = JSON.stringify(el.tagsen); var list = str.split(' ,'); list[0]=list[0].replace('"',''); list[list.length-1] = list[list.length-1].replace('"',''); el.tagsen = list;  db.clips.save(el);});```


This example is for tagsen - add similar for each field that is a list


db.clips.find().forEach(function (el) {  var str = JSON.stringify(el.tagsen); var list = str.split(' ,'); list[0]=list[0].replace('"',''); list[list.length-1] = list[list.length-1].replace('"',''); el.tagsen = list;  db.clips.save(el);});
