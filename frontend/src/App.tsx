import { useState, useEffect } from 'react';

import './App.css';
import Header from './Header'
import ImageGallery from './ImageGallery';

const App = () => {

    const [gallery, setGallery] = useState<imageObj[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)


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
        <ImageGallery gallery={gallery} isLoading={isLoading} />
    </>
  );
}

export default App;
