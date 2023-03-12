import React from 'react';

import './VideoCard.css';

const VideoCard = ({image, title, channel, views, timestamp, channelImage}) => {
    return (
        <div className='videocard'>
          <img className='videocard__image' src={image} alt='' />
          <div className="videocard__info">
            
            <div className="videocard__text">
              <h4>{title}</h4>
              <p>{channel}</p>
              <p>{views} views • {timestamp}</p>
            </div> 
          </div>
        </div>
    )
}

export default VideoCard;