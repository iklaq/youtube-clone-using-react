import React from 'react';
import './ChannelRow.css';

const ChannelRow = ({image, channel, subs, noOfVideos, description}) => {
    return (
        <div className='channelrow'>
              
           
            <div className="channelrow__text">
              <h4>{channel}</h4>
              <p>{subs} subscribers • {noOfVideos} videos</p>
              <p>{description}</p>
            </div>
        </div>
    )
}

export default ChannelRow;