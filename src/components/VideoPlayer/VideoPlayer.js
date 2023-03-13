import React from "react";
import { useParams } from "react-router-dom";
import RecommendedVideos from "../RecommendedVideos/RecommendedVideos";
import Video from "./Video";
import "./VideoPlayer.css";

const VideoPlayer = ()=> {
  let { videoId } = useParams();

  return (
    <div className="head">
      <div className="video_player">
        <Video videoId={videoId} />
      </div>
      <div className="RecommendedVideos">
        <h1>Recommended Videos</h1>
        <hr />
        <RecommendedVideos />
      </div>
    </div>
  );
}

export default VideoPlayer;
