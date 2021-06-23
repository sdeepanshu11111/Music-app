import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  songInfo,
  setSongInfo,
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  setCurrentSong,
  songs,
  setSongs,
}) => {
  // Event handler

  const activeLibrary = (nextPrev) => {
    const newSong = songs.map((song) => {
      if (song.id === nextPrev.id) {
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
    console.log("from use effect");
  };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (time) => {
    console.log(time.target.value);
    audioRef.current.currentTime = time.target.value;
    setSongInfo({ ...songInfo, currentTime: time.target.value });
  };

  const skipTrackHandler = async (text) => {
    let currentIndex = songs.findIndex((song) => {
      return song.id === currentSong.id;
    });
    if (text === "left") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibrary(songs[songs.length - 1]);

        if (isPlaying) audioRef.current.play();

        return;
      }

      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibrary(songs[(currentIndex - 1) % songs.length]);
      if (isPlaying) audioRef.current.play();
    } else if (text === "right") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);

      activeLibrary(songs[(currentIndex + 1) % songs.length]);

      if (isPlaying) audioRef.current.play();
    }
  };

  // style handler
  const st = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            type="range"
            onChange={dragHandler}
            min="0"
            value={songInfo.currentTime}
            max={songInfo.duration || 0}
          />
          <div style={st} className="animate-track"></div>
        </div>

        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>

      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("left")}
          className="left"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          className="play"
          onClick={playSongHandler}
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("right")}
          className="right"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
