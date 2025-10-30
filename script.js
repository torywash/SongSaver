// Claude used for debugging
// gotta get the song, and disply it in the song list
// lets
let songs = [];
let songCount = 0;
let colormode = false;

// DOM elements
const form = document.getElementById("song-form");
const songTotal = document.getElementById("song-total");
const songContainer = document.getElementById("song-list")

// dark mode cause i have weak eyes
function darkmode() {
    document.body.classList.toggle("dark-mode");
    colormode = !colormode;
    saveToStorage();  // Save immediately when toggled
}

// update dark mode
function updateColorMode() {
    if (colormode) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

// save to and load from localstorage
// had to look this up
// save
function saveToStorage() {
    localStorage.setItem('songs', JSON.stringify(songs));
    localStorage.setItem('colormode', JSON.stringify(colormode));
}

// load 
function loadFromStorage() {
    const savedSongs = localStorage.getItem('songs');
    const savedColor = localStorage.getItem('colormode');

    if (savedSongs) {
        songs = JSON.parse(savedSongs);
        songCount = songs.length;
    }

    if (savedColor) {
        colormode = JSON.parse(savedColor);
    }

    updateTotals();
    displaySongs();
    updateColorMode();
}

// update song count
function updateTotals() {
    songTotal.textContent = `${songCount} Song${songCount !== 1 ? 's' : ''}`;
}

// time to display
function displaySongs() {
    songContainer.innerHTML = '';

    songs.forEach((song, index) => {
        const songDiv = document.createElement('div');
        songDiv.className = 'song';
        songDiv.innerHTML = `
        <span id="songDisplay">${song.name} - ${song.artist}</span>
        <span id="reviewDisplay">"${song.review}"</span>
        <button onclick="removeSong(${index})">Remove Song</button>
        `;
        songContainer.appendChild(songDiv);
    });
}

// remove song function
function removeSong(index) {
    songs.splice(index, 1);
    songCount--;

    // update displays
    updateTotals();
    displaySongs();
    
    // update storage
    saveToStorage();
}

// move to end to prevent dupes
// listener
form.addEventListener('submit', (e) => {
    // stop page reset
    e.preventDefault();

    // grab constants
    const name = document.getElementById("songName").value;
    const artist = document.getElementById("songArtist").value;
    const review = document.getElementById("songReview").value;

    // push into array
    songs.push({name, artist, review});
    
    // add to song count
    songCount++;

    // update displays
    updateTotals();
    displaySongs();
    updateColorMode();

    // update storage
    saveToStorage();

    // reset form when submitted
    form.reset();
});

// initialize the display and load previous songs!
loadFromStorage();
updateColorMode();
updateTotals();