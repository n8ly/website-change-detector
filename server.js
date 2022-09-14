const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const detector = function (interval, URL, elements, nodefsData) {
  setInterval(() => {
    request(URL, function (err, res, body) {
      if (err) {
        console.log('Error!!!');
      } else {
        let $ = cheerio.load(body);

        let names = '';
        $(elements).each((i, el) => {
          let name = $(el).text();
          names += name;
        });

        fs.readFile(nodefsData, 'utf8', (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          if (names === data) {
            console.log('No change in names');
          } else {
            fs.writeFile('data.txt', names, function (err) {
              if (err) {
                console.log(err);
              } else {
                console.log(names);
              }
            });
          }
        });
      }
    });
  }, interval);
};

detector(
  60000,
  'https://www.dallascowboys.com/',
  '.nfl-c-media-playlist__aside-item > .d3-o-media-object__body > .d3-o-media-object__title',
  '/Users/mergtech/tutorJobs/data.txt'
);

// sample if needed: const name = $(this).find('div._1-2Iqu>div.col-7-12>div._3wU53n').text();
