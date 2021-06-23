import React from "react";

// util

const librarySongs = ({
  audioRef,
  songs,
  setCurrentSong,
  song,
  id,
  isPlaying,
  setIsPlaying,
  setSongs,
}) => {
  const songSelectHandler = async () => {
    console.log(song);
    await setCurrentSong(song);

    const newSong = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });

    setSongs(newSong);

    console.log("library-songs");

    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-songs-container ${song.active ? "selected" : ""}`}
    >
      <img alt={song.name} src={song.cover} />

      <div className="song-disc">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default librarySongs;
