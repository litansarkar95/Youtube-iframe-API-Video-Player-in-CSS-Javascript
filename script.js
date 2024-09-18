let player;
let isPlaying = false;

let duration;
let videoId = $("#videoId").attr("data-id"); //"DjwwzS0aMnM";

// This function creates an <iframe> and YouTube player after API code downloads
function onYouTubeIframeAPIReady() {
  createPlayer(videoId); // Create player with default or dynamic video ID
}

// Load YouTube IFrame API
function createPlayer(videoId) {
  player = new YT.Player("player", {
    // height: "337.5",
    // width: "600",
    videoId: videoId, // Example video, replace with your desired video ID
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

// When the player is ready
function onPlayerReady(event) {
  const playPauseBtn = document.getElementById("play-pause");
  const stopBtn = document.getElementById("stop");
  const volumeSlider = document.getElementById("volume");
  const progressBar = document.getElementById("progress-bar");
  const fullscreenBtn = document.getElementById("fullscreen");

  // Play/Pause functionality
  playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
      player.pauseVideo();
      playPauseBtn.innerHTML = ' <i class="fa-solid fa-play"></i>';
    } else {
      player.playVideo();
      playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    isPlaying = !isPlaying;
  });

  // Stop video
  stopBtn.addEventListener("click", () => {
    player.stopVideo();
    playPauseBtn.innerHTML = ' <i class="fa-solid fa-play"></i>';
    isPlaying = false;
  });

  // Volume control
  volumeSlider.addEventListener("input", (e) => {
    player.setVolume(e.target.value);
  });

  // Update progress bar and time display
  setInterval(() => {
    if (player && player.getDuration) {
      const duration = player.getDuration();
      const currentTime = player.getCurrentTime();
      const progress = (currentTime / duration) * 100;

      progressBar.value = progress;

      updateDisplayTime(currentTime, duration);
    }
  }, 1000);

  // Progress bar seek functionality
  progressBar.addEventListener("input", (e) => {
    const seekTo = (e.target.value / 100) * player.getDuration();
    player.seekTo(seekTo, true);
  });

  // Fullscreen functionality
  fullscreenBtn.addEventListener("click", () => {
    const iframe = document.getElementById("player");
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) {
      /* Firefox */
      iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
      /* IE/Edge */
      iframe.msRequestFullscreen();
    }
  });
}

// Handle state change (play/pause events)
function onPlayerStateChange(event) {
  const playPauseBtn = document.getElementById("play-pause");
  if (event.data == YT.PlayerState.PLAYING) {
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else if (
    event.data == YT.PlayerState.PAUSED ||
    event.data == YT.PlayerState.ENDED
  ) {
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
}

// Update time display
function updateDisplayTime(currentTime, duration) {
  const timeDisplay = document.getElementById("time-display");
  timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(
    duration
  )}`;
}

// Format time in MM:SS format
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Forward button functionality: skip forward by 10 seconds
document.getElementById("forwardBtn").addEventListener("click", function () {
  if (player && player.getCurrentTime) {
    var currentTime = player.getCurrentTime();
    player.seekTo(currentTime + 10, true); // Skip 10 seconds ahead
  }
});

// backward button functionality: skip forward by 10 seconds
document.getElementById("backwardBtn").addEventListener("click", function () {
  if (player && player.getCurrentTime) {
    var currentTime = player.getCurrentTime();
    player.seekTo(currentTime - 10, true); // Skip 10 seconds ahead
  }
});
