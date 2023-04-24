import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import s from "./Audio.module.css";
import "./Player.css";

export default function Audio({ song, artist }) {
  return (
    <div className={s.playerContainer} key={Math.random()}>
      <img src={song.cover} alt="song cover" />
      <div className={s.songInfo}>
        <h3>{song.title}</h3>
        <h4>{artist?.name}</h4>
        <AudioPlayer
          key={Math.random()}
          autoPlay={false}
          preload={"false"}
          style={{ borderRadius: "1rem" }}
          src={song.content}
          showSkipControls={false}
          showJumpControls={true}
        />
      </div>
    </div>
  );
}
