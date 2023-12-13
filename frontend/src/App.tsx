import { useState, useEffect } from 'react';

import './App.css';
import Header from './Header'
import ImageGallery from './ImageGallery';

const App = () => {

    const [gallery, setGallery] = useState<imageObj[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleUpdateThumbsUp = (image:imageObj) => {
        let imageIndex = gallery.indexOf(image)
        let postBody = { 
            thumbsUp: image.thumbsUp + 1
        }
        fetch("http://localhost:3001/image/"+image.id, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(postBody)
        })
            .then(response => {
                if (response.ok) {
                    const updatedGallery= {...gallery[imageIndex], thumbsUp: postBody.thumbsUp}
                    const newGallery = [...gallery]
                    newGallery[imageIndex] = updatedGallery;
                    setGallery(newGallery)
                }
            })
            .catch(error => console.log("API error: ", error))
    }

    const handleUpdateThumbsDown = (image:imageObj) => {
        let imageIndex = gallery.indexOf(image)
        let postBody = { 
            thumbsDown: image.thumbsDown + 1
        }
        fetch("http://localhost:3001/image/"+image.id, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(postBody)
        })
            .then(response => {
                if (response.ok) {
                    const updatedGallery= {...gallery[imageIndex], thumbsDown: postBody.thumbsDown}
                    const newGallery = [...gallery]
                    newGallery[imageIndex] = updatedGallery;
                    setGallery(newGallery)
                }
            })
            .catch(error => console.log("API error: ", error))
    }

    useEffect(() => {
        async function getGallery() {
            console.log("Fetching gallery data...")
            setIsLoading(true)
            try {
                const response = await fetch("http://localhost:3001/gallery")
                if (response.ok) {
                    const data = await response.json()
                    setGallery(data.gallery)
                }
            } catch {
                console.log("ERROR: Failed to fetch.")
            }
            setIsLoading(false)
        } 
        getGallery()
    }, [])

  return (
    <>
        <Header />
        <ImageGallery 
            gallery={gallery} 
            isLoading={isLoading} 
            handleUpdateThumbsUp={handleUpdateThumbsUp}
            handleUpdateThumbsDown={handleUpdateThumbsDown} />
    </>
  );
}

export default App;
