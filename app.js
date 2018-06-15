const blessed = require('blessed');
const spotify = require('spotify-node-applescript-promise');

var screen = blessed.screen({
    smartCSR: true
});

var container = blessed.box({
    parent: screen,
    top: 0,
    width: '100%',
    height: 1,
    tags: true,
    content: ''
})

let display = async () => {
    let isRunning = await spotify.isRunning()
    if (!isRunning) {
        container.content = '{red-fg}Spotify is not running{/red-fg}'
    } else {
        let state = await spotify.getState()
        let stateIcon = state.state == 'playing' ? '' : '❚❚  '

        let track = await spotify.getTrack()

        container.content = `{green-fg}${stateIcon}{/green-fg}{blue-fg}${track.name}{/blue-fg}{grey-fg} - ${track.album_artist}{/grey-fg}`
    }

    screen.render()
}
display()

setInterval(display, 500)

screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
});

screen.render();