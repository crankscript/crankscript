/// <reference path="../libs/types/types/latest.d.ts" />

let dataBuffer = '';
let isComplete = false;
let connection: playdate.network.http | undefined;

playdate.update = () => {
    if (!connection) {
        connection = playdate.network.http.new('example.com');

        if (!connection) {
            throw 'Failed to create connection';
        }

        connection.setRequestCallback(() => {
            if (!connection) {
                throw 'Connection is nil';
            }

            const available = connection.getBytesAvailable();
            if (available > 0) {
                dataBuffer += connection.read(available);
            }
        });

        connection.setRequestCompleteCallback(() => {
            if (!connection) {
                throw 'Connection is nil';
            }

            const available = connection.getBytesAvailable();
            if (available > 0) {
                dataBuffer += connection.read(available);
            }
            isComplete = true;
        });

        connection.get('/');
    }

    playdate.graphics.clear();

    if (!isComplete) {
        playdate.graphics.drawText('Loading...', 10, 10);
    } else {
        const startTag = dataBuffer.indexOf('<p');
        const contentStart = dataBuffer.indexOf('>', startTag) + 1;
        const contentEnd = dataBuffer.indexOf('</p>', contentStart);
        const [content] = string.gsub(
            dataBuffer.substring(contentStart, contentEnd),
            '%s+',
            ' ',
        );

        playdate.graphics.drawTextInRect(
            `Contents from example.com: "${content}"`,
            10,
            10,
            380,
            220,
        );
    }
};
