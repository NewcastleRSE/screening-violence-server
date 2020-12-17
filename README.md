# Screening Violence Server

Nest.js server for the Screening Violence RIF project, Nov 2020 - Jan 2021.

## Developer
Kate Court

## Researcher
Gemma McKinnie

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

## Environment variables
Set DB_CONNECTION_STRING

## Inserting CSV data into MongoDB locally as tab separated and including lists within a field
1. Create .tsv file. Save excel file as tab delimited .txt, then change filename to .tsv in explorer
2. Import .tsv file. From cmd NOT mongo shell run : `mongoimport -d screening -c clips --type tsv --headerline C:\Users\nkc124\Desktop\SVDatav2.tsv --drop` Include `--drop` to replace existing documents.
3. Convert lists (English, French and Spanish tags) into array. In mongodb shell (C:\Program Files\MongoDB\Server\4.2\bin) run: 
```use screening```

```db.clips.find().forEach(function (el) {
if (el.tagsen) { 
var str = JSON.stringify(el.tagsen); 
var list = str.split(', '); 
list[0]=list[0].replace(/\\/g, ''); 
list[list.length-1] = list[list.length-1].replace(/\\/g,'');
list[0]=list[0].replace('""',''); 
list[list.length-1] = list[list.length-1].replace('""',''); 
el.tagsen = list;
} 
if (el.tagsfr) { 
var strfr = JSON.stringify(el.tagsfr); 
var listfr = strfr.split(', '); 
listfr[0]=listfr[0].replace(/\\/g, ''); 
listfr[listfr.length-1] = listfr[listfr.length-1].replace(/\\/g,'');
 listfr[0]=listfr[0].replace('""',''); 
 listfr[listfr.length-1] = listfr[listfr.length-1].replace('""',''); 
el.tagsfr = listfr;
}
if (el.tagses) { 
var stres = JSON.stringify(el.tagses); 
var listes = stres.split(', '); 
listes[0]=listes[0].replace(/\\/g, ''); 
listes[listes.length-1] = listes[listes.length-1].replace(/\\/g,'');
 listes[0]=listes[0].replace('""',''); 
 listes[listes.length-1] = listes[listes.length-1].replace('""',''); 
el.tagses = listes; 
  }
db.clips.save(el);
});```

```









```db.clips.find().forEach(function (el) { 
var str = JSON.stringify(el.tagsen);  
var list = strReady.split(', '); 
list[0]=list[0].replace(/\\/g, ''); 
list[list.length-1] = list[list.length-1].replace(/\\/g,'');  
el.tagsen = list;

var stres = JSON.stringify(el.tagses);  
var listes = stresReady.split(', '); 
listes[0]=listes[0].replace(/\\/g, ''); 
listes[listes.length-1] = listes[listes.length-1].replace(/\\/g,'');  
el.tagses = listes;

var strfr = JSON.stringify(el.tagsfr);  
var list = strfrReady.split(', '); 
listfr[0]=listfr[0].replace(/\\/g, ''); 
listfr[listfr.length-1] = listfr[listfr.length-1].replace(/\\/g,'');  
el.tagsfr = listfr;
  
db.clips.save(el);
}
);```

This example is for tagsen - add similar for each field that is a list


str = str.replace(/"\\"/g, ''); str = str.replace(/\\""/g, ''); print(str);


