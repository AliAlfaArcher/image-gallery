import { FunctionComponent } from "react"
import "./ImageGallery.css"

type imageGalleryProps = {
    gallery: imageObj[];
    isLoading: boolean;
    handleUpdateThumbsUp: Function;
    handleUpdateThumbsDown: Function;
}

const ImageGallery:FunctionComponent<imageGalleryProps> = ({gallery, isLoading, handleUpdateThumbsUp, handleUpdateThumbsDown}:imageGalleryProps) => {
    return (
        <ul className="galleryContainer">
            {!isLoading && gallery.length > 0 && ( 
                gallery.map((image,index) => (
                    <li key={index} className="imageContainer">
                        <div className="imageTitle">{image.title}</div>
                        <div className="imageFrame">
                            <img src={`/gallery/${image.imageUrl}`} alt={image.title} />
                        </div>
                        <div className="thumbBtns">
                            <div className="imageThmbUp">
                                <button onClick={()=>handleUpdateThumbsUp(image)}><img src="/like.png" alt=""/><div>{image.thumbsUp}</div></button>
                            </div>
                            <div className="imageThmbDown">
                                <button onClick={()=>handleUpdateThumbsDown(image)}><img src="/dislike.png" alt=""/><div>{image.thumbsDown}</div></button>
                            </div>
                            </div>
                    </li>
                ))
             )}
             {!isLoading && gallery.length === 0 && (
                <div className="emptyGallery">
                    <h3>No images in gallery yet.</h3>
                </div>
            )}
            {isLoading && (
                <div className="loadingGallery">Loading gallery...</div>
            )}
        </ul>
    )
}

export default ImageGallery