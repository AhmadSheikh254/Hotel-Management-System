import React from 'react'

export default function GalleryPublic(){
  const images = [
    'https://source.unsplash.com/800x600/?hotel,lobby',
    'https://source.unsplash.com/800x600/?hotel,room',
    'https://source.unsplash.com/800x600/?hotel,pool',
  ]
  return (
    <section className="gallery-public">
      <h2>Gallery</h2>
      <div className="gallery-grid">
        {images.map((src,i)=> <img key={i} src={src} alt={`gallery ${i}`} />)}
      </div>
    </section>
  )
}
