// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/11.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
	{
		songName: "Logica de programacao",
		filePath: "songs/11.mp3",
		coverPath: "covers/1.jpg",
	},
	{
		songName: "Recomendação de livros para programadores",
		filePath: "songs/12.mp3",
		coverPath: "covers/1.jpg",
	},
	{
		songName: "O mínimo sobre programação",
		filePath: "songs/13.mp3",
		coverPath: "covers/1.jpg",
	},
	{
		songName: "3 dicas para programadores iniciantes",
		filePath: "songs/14.mp3",
		coverPath: "covers/1.jpg",
	},
	{
		songName: "Guia de como estudar para o vestibular",
		filePath: "songs/15.mp3",
		coverPath: "covers/1.jpg",
	},
	{
		songName: "Como construir uma boa redação D.A",
		filePath: "songs/16.mp3",
		coverPath: "covers/1.jpg",
	},
	{
		songName: "Symbolism-Electro-Light",
		filePath: "songs/7.mp3",
		coverPath: "covers/1.jpg",
	},
	{
		songName: "Heroes Tonight-Janji",
		filePath: "songs/8.mp3",
		coverPath: "covers/1.jpg",
	},
	{
		songName: "My HDH",
		filePath: "songs/9.mp3",
		coverPath: "covers/1.jpg",
	},
	{
		songName: "Feel Good-Syn Cole",
		filePath: "songs/10.mp3",
		coverPath: "covers/1.jpg",
	},
];

songItems.forEach((element, i) => {
	element.getElementsByTagName("img")[0].src = songs[i].coverPath;
	element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener("click", () => {
	if (audioElement.paused || audioElement.currentTime <= 0) {
		audioElement.play();
		masterPlay.classList.remove("fa-play-circle");
		masterPlay.classList.add("fa-pause-circle");
		gif.style.opacity = 1;
	} else {
		audioElement.pause();
		masterPlay.classList.remove("fa-pause-circle");
		masterPlay.classList.add("fa-play-circle");
		gif.style.opacity = 0;
	}
});
// Listen to Events
audioElement.addEventListener("timeupdate", () => {
	// Update Seekbar
	progress = parseInt(
		(audioElement.currentTime / audioElement.duration) * 100
	);
	myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
	audioElement.currentTime =
		(myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
	Array.from(document.getElementsByClassName("songItemPlay")).forEach(
		(element) => {
			element.classList.remove("fa-pause-circle");
			element.classList.add("fa-play-circle");
		}
	);
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
	(element) => {
		element.addEventListener("click", (e) => {
			makeAllPlays();
			songIndex = parseInt(e.target.id);
			e.target.classList.remove("fa-play-circle");
			e.target.classList.add("fa-pause-circle");
			audioElement.src = `songs/${songIndex + 1}.mp3`;
			masterSongName.innerText = songs[songIndex].songName;
			audioElement.currentTime = 0;
			audioElement.play();
			gif.style.opacity = 1;
			masterPlay.classList.remove("fa-play-circle");
			masterPlay.classList.add("fa-pause-circle");
		});
	}
);

document.getElementById("next").addEventListener("click", () => {
	if (songIndex >= 9) {
		songIndex = 0;
	} else {
		songIndex += 1;
	}
	audioElement.src = `songs/${songIndex + 1}.mp3`;
	masterSongName.innerText = songs[songIndex].songName;
	audioElement.currentTime = 0;
	audioElement.play();
	masterPlay.classList.remove("fa-play-circle");
	masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click", () => {
	if (songIndex <= 0) {
		songIndex = 0;
	} else {
		songIndex -= 1;
	}
	audioElement.src = `songs/${songIndex + 1}.mp3`;
	masterSongName.innerText = songs[songIndex].songName;
	audioElement.currentTime = 0;
	audioElement.play();
	masterPlay.classList.remove("fa-play-circle");
	masterPlay.classList.add("fa-pause-circle");
});
