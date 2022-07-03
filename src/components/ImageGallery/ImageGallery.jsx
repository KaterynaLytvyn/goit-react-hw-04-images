import PropTypes from 'prop-types';
import {useState} from "react";
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'
import Modal from 'components/Modal/Modal'
import s from './ImageGallery.module.css'

export default function ImageGallery({images}) {


    const [showModal, setShowModal] = useState(false)
    const [modalUrl, setModalUrl] = useState('')


    const handleGalleryItemClick = (url) => {
        setModalUrl(url)
        toggleModal()
    }

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    return(
        <div className={s.gallery__container}>
            <ul className={s.imageGallery}>
                {images.map(image =>
                <ImageGalleryItem 
                    key={image.id} 
                    image={image}
                    onClick={handleGalleryItemClick}
                />
                )}
            </ul>

            {showModal && <Modal url={modalUrl} onClose={toggleModal}/>}                
        </div>
    )
}


ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
  };