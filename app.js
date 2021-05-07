const songs = {
  data: [
    {
      name: "Beaver Creek",
      cover:
        "https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg",
      artist: "Aso, Middle School, Aviino",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=10075",
      color: ["#205950", "#2ab3bf"],
      id: 1,
      active: true,
    },
    {
      name: "Daylight",
      cover:
        "https://chillhop.com/wp-content/uploads/2020/07/ef95e219a44869318b7806e9f0f794a1f9c451e4-1024x1024.jpg",
      artist: "Aiguille",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=9272",
      color: ["#EF8EA9", "#ab417f"],
      id: 2,
      active: false,
    },
    {
      name: "Keep Going",
      cover:
        "https://chillhop.com/wp-content/uploads/2020/07/ff35dede32321a8aa0953809812941bcf8a6bd35-1024x1024.jpg",
      artist: "Swørn",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=9222",
      color: ["#CD607D", "#c94043"],
      id: 3,
      active: false,
    },
    {
      name: "Nightfall",
      cover:
        "https://chillhop.com/wp-content/uploads/2020/07/ef95e219a44869318b7806e9f0f794a1f9c451e4-1024x1024.jpg",
      artist: "Aiguille",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=9148",
      color: ["#EF8EA9", "#ab417f"],
      id: 4,
      active: false,
    },
    {
      name: "Reflection",
      cover:
        "https://chillhop.com/wp-content/uploads/2020/07/ff35dede32321a8aa0953809812941bcf8a6bd35-1024x1024.jpg",
      artist: "Swørn",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=9228",
      color: ["#CD607D", "#c94043"],
      id: 5,
      active: false,
    },
    {
      name: "Under the City Stars",
      cover:
        "https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg",
      artist: "Aso, Middle School, Aviino",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=10074",
      color: ["#205950", "#2ab3bf"],
      id: 6,
      active: false,
    },
    {
      name: "By Chance",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=15223",
      cover:
        "https://chillhop.com/wp-content/uploads/2021/03/74d62bc9370a68e440c1b98eaf650344f0a7faea-1024x1024.jpg",
      artist: " SwuM",
      id: 7,
      active: true,
    },
    {
      name: "Melodiya",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=16059",
      cover:
        "https://chillhop.com/wp-content/uploads/2021/03/630fbe3721ce9fa27e56b6b01c460f709fbce3b7-1024x1024.jpg",
      artist: " Screen Jazzmaster, Zmeyev ",
      id: 8,
      active: false,
    },
    {
      name: "Roses n Flames",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=14984",
      cover:
        "https://chillhop.com/wp-content/uploads/2021/02/d12927eedcc2f5afba2ab049a4a1ea46c2266ae3-1024x1024.jpg",
      artist: "C Y G N",
      id: 9,
      active: false,
    },
    {
      name: "Stuck with you",
      audio: "./music/stuckwithyou.mp3",
      cover: "./img/zojaboy.jpeg",
      artist: " ZoJaBoii FT Uknowwhatimean & Xxxvviiv ",
      id: 10,
      active: false,
    },
  ],
};

//Variable Global
const btn_play = document.querySelector(".play");
var audio_ref = document.querySelector("audio");
const btn_library = document.querySelector(".Btn-library");
const library = document.querySelector(".library");
const playIcon = document.querySelector(".play");
const song_container = document.querySelector(".song-container");
const time_control = document.querySelector(".time-control");
const input_range = document.querySelector(".input-range");
const btn_forward = document.querySelector(".forward");
const btn_back = document.querySelector(".back");

var isplaying = true;
var libraryActive = true;

//Invoke functions
fetchLibraryList();
//AddEventListener

audio_ref.setAttribute("src", ``);
//Playsong
btn_play.addEventListener("click", () => {
  if (isplaying) {
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
    if (audio_ref !== undefined) {
      audio_ref.play();
    }
    isplaying = !isplaying;
  } else {
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
    audio_ref.pause();
    isplaying = !isplaying;
  }
});

//ToggleLibrary
btn_library.addEventListener("click", () => {
  if (libraryActive) {
    library.classList.add("library-active");
    libraryActive = !libraryActive;
  } else {
    library.classList.remove("library-active");
    libraryActive = !libraryActive;
  }
});

library.addEventListener("click", (e) => {
  isplaying = true;
  const data_id = e.target.getAttribute("data-id");
  LibraryFilter_getActive(data_id);

  const curent = getCurrentSong(data_id);

  songStartPlay(data_id);
});

//Control song-input-range
input_range.addEventListener("click", (e) => {
  audio_ref.currentTime = e.target.value;
});

audio_ref.addEventListener("ended", () => {
  input_range.setAttribute("value", "0");
  input_range.setAttribute("Max", "0");
  audio_ref.load();

  let ID = audio_ref.getAttribute("id");
  let NextID = Number(ID) + 1;
  console.log(NextID);
  console.log(songs.data.length);
  if (NextID > songs.data.length) {
    NextID = NextID % songs.data.length;
    console.log(NextID);

    songStartPlay(NextID);
    return;
  }
  songStartPlay(NextID);

  ToggleIcon(isplaying);
});

document.addEventListener("onloadeddata", () => {
  if (isplaying) {
    audio_ref.play();
  } else {
    audio_ref.pause;
  }
});

btn_forward.addEventListener("click", () => {
  audio_ref.load();

  let ID = audio_ref.getAttribute("id");
  let NextID = Number(ID) + 1;
  console.log(NextID);
  console.log(songs.data.length);
  if (NextID > songs.data.length) {
    NextID = NextID % songs.data.length;
    console.log(NextID);

    songStartPlay(NextID);
    return;
  }
  songStartPlay(NextID);
});

btn_back.addEventListener("click", () => {
  audio_ref.load();

  let ID = audio_ref.getAttribute("id");
  let previousID = Number(ID) - 1;
  console.log(previousID);
  console.log(songs.data.length);

  if (previousID === 0) {
    previousID = songs.data.length;
    console.log(previousID + "id");
    songStartPlay(previousID);
    return;
  }
  songStartPlay(previousID);
});

function fetchLibraryList() {
  songs.data.forEach((song) => {
    //Create LibrarySong
    const library_song = document.createElement("div");
    library_song.classList.add("library-song");
    library_song.setAttribute("data-id", `${song.id}`);
    //Create Img-song
    const song_img = document.createElement("img");
    song_img.setAttribute("src", `${song.cover}`);
    //Create SongDescription
    const song_description = document.createElement("div");
    song_description.classList.add("song-info");
    song_description.innerHTML = `<h3>${song.name}</h3><h4>${song.artist}</h4>`;
    //appendChild
    library_song.appendChild(song_img);
    library_song.appendChild(song_description);
    //append to library
    library.appendChild(library_song);
  });
}

function LibraryFilter_getActive(data_id) {
  const library_song_active = songs.data.map((s) => {
    if (s.id == data_id) {
      return { ...s, active: true };
    } else {
      return { ...s, active: false };
    }
  });

  return library_song_active;
}

function getCurrentSong(data_id) {
  var currentSong = songs.data.filter((s) => s.id == data_id);

  return currentSong;
}

function ToggleIcon(isplaying) {
  if (isplaying) {
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");

    isplaying = !isplaying;
  } else {
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");

    isplaying = !isplaying;
  }
}

function getTime(time) {
  return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
}

function songStartPlay(currentID) {
  isplaying = true;
  let Song = songs.data.filter((s) => currentID == s.id);

  setTimeout(() => {
    //Link currentSong to Songcontainer when we click on library
    song_container.children[0].setAttribute("src", `${Song[0].cover}`);
    song_container.children[1].children[0].innerText = Song[0].name;
    song_container.children[1].children[1].innerText = Song[0].artist;
    //reset input
    input_range.setAttribute("value", "0");
    input_range.setAttribute("Max", "0");

    audio_ref.setAttribute("src", `${Song[0].audio}`);
    audio_ref.setAttribute("id", `${currentID}`);
    //Playsong
    ToggleIcon(isplaying);
    audio_ref.load();
    audio_ref.play();
    //Updating Time
    audio_ref.addEventListener("timeupdate", () => {
      //Link CurrentSong to time-control
      time_control.children[0].innerText = getTime(audio_ref.currentTime);
      time_control.children[1].setAttribute(
        "value",
        `${audio_ref.currentTime}`
      );
      time_control.children[1].setAttribute("Max", `${audio_ref.duration}`);

      time_control.children[2].innerText = getTime(audio_ref.duration);
    });
  }, 2000);
}
