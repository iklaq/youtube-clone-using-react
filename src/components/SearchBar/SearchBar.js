import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import ChannelRow from "../ChannelRow/ChannelRow";
import VideoRow from "../VideoRow/VideoRow";

const SearchBar = ({ inputSearch }) => {
  const [channelRow, setChannelRow] = useState({});
  const [videoRows, setVideoRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setChannelRow("");
    setVideoRows([]);

    const fetchChannelData = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=channel&q=${inputSearch}&safeSearch=none&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
        );
        const data = await response.json();

        createChannelRow(data["items"][0]);
      } catch (error) {
        alert("Search not found");
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchChannelData();

    const fetchVideosData = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=9&type=video&q=${inputSearch}&safeSearch=none&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
        );
        const data = await response.json();

        createVideoRows(data["items"]);
        setIsError(false);
      } catch (error) {
        alert("Search not found");
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchVideosData();
  }, [inputSearch]);

  async function createChannelRow(channel) {
    const channelId = channel.id.channelId;
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    );
    const data = await response.json();
    const noOfVideos = data.items[0].statistics.videoCount;
    const subs = data.items[0].statistics.subscriberCount;
    const snippet = channel.snippet;
    const title = snippet.title;
    const description = snippet.description;
    const image = snippet.thumbnails.medium.url;

    setChannelRow({
      channelId,
      image,
      title,
      subs,
      noOfVideos,
      description,
    });
    setIsLoading(false);
  }

  async function createVideoRows(videos) {
    let newVideoRows = [];
    for (const video of videos) {
      const videoId = video.id.videoId;
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics%2C%20snippet&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
      );
      const data = await response.json();
      const views = data.items[0].statistics.viewCount;
      const snippet = video.snippet;
      const title = snippet.title;

      const channel = snippet.channelTitle;
      const description = snippet.description;
      const image = snippet.thumbnails.medium.url;

      newVideoRows.push({
        videoId,
        title,
        image,
        views,

        channel,
        description,
      });
    }

    setVideoRows(newVideoRows);
    setIsLoading(false);
  }
  if (isError) {
    return <h1>No Results found!</h1>;
  }
  return (
    <div className="searchpage">
      <div className="searchpage__filter"></div>
      {isLoading ? <h1>Searching...</h1> : null}
      <hr />
      {!isLoading ? (
        <ChannelRow
          key={channelRow.channelId}
          image={channelRow.image}
          channel={channelRow.title}
          subs={channelRow.subs}
          noOfVideos={channelRow.noOfVideos}
          description={channelRow.description}
        />
      ) : null}
      <hr />
      {videoRows.map((item) => {
        return (
          <VideoRow
            title={item.title}
            image={item.image}
            views={item.views}
            timestamp={item.timestamp}
            channel={item.channel}
            description={item.description}
          />
        );
      })}
    </div>
  );
};

export default SearchBar;
