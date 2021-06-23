import React, { useState, useRef } from "react";

// import components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";

// data
import data from "./data";

// Styles
import "./styles/app.scss";

// App
function App() {
  // Ref
  let audioRef = useRef(null);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    // percentage
    const percentage = (current / duration) * 100;

    console.log(percentage);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: percentage,
    });
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => {
      return song.id === currentSong.id;
    });
    if (isPlaying) {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      audioRef.current.play();
    }
  };

  // state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  // Player
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const [libraryStatus, setLibraryStatus] = useState(false);

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        timeUpdateHandler={timeUpdateHandler}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        libraryStatus={libraryStatus}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        songs={songs}
      />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        src={currentSong.audio}
        ref={audioRef}
        type="audio/mp3"
        onEnded={songEndHandler}
      />
    </div>
  );
}

export default App;
