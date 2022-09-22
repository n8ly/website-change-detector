const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const emailUpdates = require('./send-mail');

const detector = function (interval, URL, pageElements, nodefsData) {
  setInterval(() => {
    request(URL, function (err, res, body) {
      if (err) {
        console.log('Error!!!');
      } else {
        let $ = cheerio.load(body);

        let names = '';
        $(pageElements).each((i, el) => {
          let name = $(el).text();
          names += name;
        });

        fs.readFile(nodefsData, 'utf8', (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          if (names === data) {
            // console.log('No change in names'); // for testing
            // emailUpdates('No change in names'); // for testing
          } else {
            fs.writeFile('data.txt', names, function (err) {
              if (err) {
                console.log(err);
              } else {
                // console.log(names); // for testing
                emailUpdates(names);
              }
            });
          }
        });
      }
    });
  }, interval);
};

detector(
  20000,
  'https://www.dallascowboys.com/',
  '.nfl-c-media-playlist__aside-item > .d3-o-media-object__body > .d3-o-media-object__title',
  '/Users/mergtech/tutorJobs/data.txt'
);
