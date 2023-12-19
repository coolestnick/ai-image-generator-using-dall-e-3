import React, { useState, useRef } from 'react'
import './ImageGenerator.css'
import image from '../Assets/Ai.png';

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);

  const imageGenerator = async () => {
    if(inputRef.current.value===""){
      return 0;
    }
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers:{
          "Content-type": "application/json",
          Authorization:
          "Bearer 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",
          "User-Agent": "Chrome",
        },
        body:JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n:1,
          size:"512x512",
        }),
      }
    );
    let data = await response.json();
    console.log(data); 
  }



  return (
    <div className='ai-image-generator'>
      <div className='header'>AI Image <span>Generator</span></div>
      <div className='img-loading'>
        <div className='image'><img src={image_url==="/"?image:image_url} alt=""/></div>
      </div>
      <div className="search">
        <input type="text" ref={inputRef} className='search-input' placeholder='What you want to create today' />
        <div className="generate-btn" onClick={()=>{imageGenerator();}}>Generate</div>
      </div>
    </div>

  )
}

export default ImageGenerator