const { createInterface } = require('readline');
const { Writable } = require('stream');

const mutableStdout = new Writable({
    write: (chunk, encoding, callback) => {
        if (!this.muted) {
            process.stdout.write(chunk, encoding);
        }
        callback();
    }
})
mutableStdout.muted = true;

const readline = createInterface({ input: process.stdin, output: mutableStdout });

module.exports.readline = readline;
module.exports.ask = questionText => new Promise(resolve => {
    readline.question(questionText, resolve);
})
module.exports.updateConsole = (numberOfLines, msg) => {
    process.stdout.moveCursor(0, numberOfLines);
    process.stdout.cursorTo(0);
    process.stdout.clearScreenDown();
    process.stdout.write(msg);
}