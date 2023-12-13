import express, {Express, Request, Response} from 'express'
import cors from 'cors'

import galleryData from './gallery-images.json'

type imageObj = {
    id: string;
    title: string;
    imageUrl: string;
    thumbsUp: number;
    thumbsDown: number;
}

let gallery:imageObj[] = galleryData.images

let app:Express = express()

app.use(cors())
app.use(express.json())

app.get('/gallery', (req:Request, res:Response) => {
    res.status(200).send({gallery})
})

app.patch('/image/:id', (req:Request, res:Response) => {
    let imageToUpdate = gallery.find( img => img.id === req.params.id)
    if (imageToUpdate != undefined) {
        let imageIndex = gallery.indexOf(imageToUpdate)
        Object.assign(imageToUpdate, req.body)
        gallery[imageIndex] = imageToUpdate

        res.status(200).send({
            status: "success",
            data: {
                image: imageToUpdate
            }
        })
    } else {
        res.status(200).send({
            status: "notFound",
            data: null
        })
    }
})

app.get('/', (req:Request, res:Response) => {
  res.status(200).send({ status: "ok", "data": "image gallery API"})
});

app.listen(3001, () => {
  console.log('Server is listening on port 3001');
});