import {AcbStreamDecoder} from '@atesgoral/acb';

const decoder = new AcbStreamDecoder();

decoder.on('book', (book) => {
  console.log(JSON.stringify(book, null, 2));
});

decoder.on('error', (error) => console.error(error));

process.stdin.pipe(decoder).pipe(process.stdout);