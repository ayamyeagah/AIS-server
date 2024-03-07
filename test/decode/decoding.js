const AisDecoder = require('ais-stream-decoder');
const split = require('split');
const { createReadStream } = require('fs');
const { resolve } = require('path');

const fileStream = createReadStream(
  resolve(__dirname, './messages.txt')
);
const aisDecoder = new AisDecoder.default({ silent: true });

fileStream
  .pipe(split())
  .pipe(aisDecoder)
  .on('data', decodedMessage => {
    console.log(decodedMessage);
  });
