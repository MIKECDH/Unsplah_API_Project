import React, {useState, useEffect} from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

function Photo() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [photo, setPhoto] = useState("");
    const [pageNum, setPageNum] = useState(1);
    const [clientId, setClientId] = useState("nyYnTPdGiHM4rIgOOGYxBQwJsv4ufi2gJh9exuseVms");
    const [result, setResult] = useState([]);

    function handleSubmit() {
        console.log(photo);
        const url = "https://api.unsplash.com/search/photos?query=" + photo + "&client_id=" + clientId;
        let cancel;
  
        axios({
          method: 'GET',
          url: url,
          cancelToken: new axios.CancelToken(c => cancel = c)
      }).then(res => {
          console.log(res.data);
          setResult(res.data.results);
          setHasMore(res.data.total > 0);
          setLoading(false);
      }).catch(e => {
          if(axios.isCancel(e)) return;
          setError(true);
      })
      return () => cancel();
      }
  
    function handleChange(event) {
      setPhoto(event.target.value);
    }
  
    function onKeyPressed(event) {
      if(event.key === 'Enter') {
        handleSubmit();
      }
    }
  
    return (
      <div className="App">
        <h1>App</h1>
        <input onChange={handleChange} onKeyPress={onKeyPressed} type="text" name="photo" placeholder="Search Photos"></input>
        <div className="PhotoHolder">
          {result.map((photo) => {
              return <img src={photo.urls.thumb} alt={photo.description} key={photo.id} />
          })}
        </div>
        <div>{loading && 'Loading...'}</div>
        <div>{error && 'Error'}</div>
      </div>
    );
  }

  export default Photo;