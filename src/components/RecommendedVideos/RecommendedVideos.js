
import React, {useEffect, useState} from 'react';
import VideoCard from '../VideoCard/VideoCard';
import './RecommendedVideos.css';




const RecommendedVideos = () => {

    const [videoCards, setVideoCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {

      const fetchData = async () => {
        try {
          const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=12&regionCode=US&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`);
          const data = await response.json();
          console.log(data.items)
          createVideoCards(data.items);
      
          
        } catch (error) {
          alert("not found");
        }
      };

      fetchData();
      
        
    }, [])

    async function createVideoCards(videoItems) {
      let newVideoCards = [];
      for (const video of videoItems) {
        const videoId = video.id;
        const snippet = video.snippet;
        const channelId = snippet.channelId;
        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        const data = await response.json();
        const channelImage = data.items[0].snippet.thumbnails.medium.url;

        const title = snippet.title;
        const image = snippet.thumbnails.medium.url;
        const views = video.statistics.viewCount;
        
        const channel = snippet.channelTitle;

        newVideoCards.push({
          videoId,
          image,
          title,
          channel,
          views,
          channelImage
        });
      };
      setVideoCards(newVideoCards);
      setIsLoading(false);
    }

    if(isError) {
      return alert("error loading")
    }
    return (
        
        <div className='recommendedvideos'>
            { isLoading ? <h1>Loading...</h1> : null }
            <div className="recommendedvideos__videos">
                {
                  videoCards.map(item => {
                    return (
                        <VideoCard key={item.videoId}
                            title={item.title}
                            image={item.image}
                            views={item.views}
                            timestamp={item.timestamp}
                            channel={item.channel}
                            channelImage={item.channelImage}
                        />
                    )
                  })
                }
            </div>
        </div>
    )
}

export default RecommendedVideos;