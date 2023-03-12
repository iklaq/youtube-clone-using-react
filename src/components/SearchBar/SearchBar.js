import React from 'react'
import { useEffect } from 'react'

function SearchBar({inputSearch}) {

   

    useEffect(() => {
       
        const fetchData = async () => {
            try {
              const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=channel&q=${inputSearch}&safeSearch=none&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`);
              const data = await response.json();
              alert(data['items'])
             
             
            } catch (error) {
              alert("Search not found");
            }
          };
    
          fetchData();

      }, [inputSearch])


  return (
    <div>{inputSearch}</div>
  )
}

export default SearchBar