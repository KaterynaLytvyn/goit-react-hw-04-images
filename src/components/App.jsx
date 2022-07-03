import { useState, useEffect } from "react";
import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from 'components/ImageGallery/ImageGallery';
import axios from "axios";
import Loader from 'components/Loader/Loader'
import Button from 'components/Button/Button'


export default function App() {

  const [filter, setFilter] = useState('');
  const [images, setImages] = useState([])
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle')
  const [page, setPage] = useState(1)
  const [totalHits, setTotalHits] = useState(0)

  const loadBtn = document.getElementById("load-more");

  useEffect(() => {
    if(!filter){
        return
    }
    
    const fetchData = async() => {

        setStatus('pending')
        try {
            const response = await axios.get(`https://pixabay.com/api/?q=${filter}&page=${page}&key=26974006-daeb29fcab66c9b2b77884f92&image_type=photo&orientation=horizontal&per_page=12`)
            
            setImages([...images, ...response.data.hits])
            setTotalHits(response.data.totalHits)
            setStatus('resolved')
        } catch (error) {
            setError(error)
            setStatus('rejected')                
        }

    }
    fetchData();

    if(loadBtn){
      loadBtn.scrollIntoView({block: "center", behavior: "smooth"});
    }

  }, [filter, page])


  function handleFormSubmit(searchString) {
    setFilter(searchString);
    setPage(1);
    setImages([]);
  }

  const handleLoadMoreClick = () => {
    setPage(page +1)
}
    return(
      <div>
        <Searchbar onSubmit={handleFormSubmit}/>
        {images && <ImageGallery images={images}/>}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <div><p>An error occurred: {error.message} {error.response.data}</p></div>}
        {status === 'resolved' && images.length < totalHits && (
            <div id="load-more">
                <Button onClick={handleLoadMoreClick}/>
            </div>  
        )}
        {status === 'resolved' && totalHits === 0 && <h2 align="center">there are no images found</h2>}
      </div>
    )
}
