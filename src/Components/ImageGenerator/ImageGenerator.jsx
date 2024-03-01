import React, { useState, useRef } from 'react'
import './ImageGenerator.css'
import image from '../Assets/Ai.png';
import { Configuration, OpenAIApi } from 'openai';
import 'dotenv/config';


const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
    // const configuration = new Configuration({
    //   apiKey: import.meta.env.OPENAI_API_KEY,
    // });
    // const openai = new OpenAIApi(configuration);

  const imageGenerator = async () => {
  
    if(inputRef.current.value===""){
      return 0;
    }
    setLoading(true);
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers:{
          "Content-type": "application/json",
          Authorization:
          `Bearer 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`,
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
    let data_array = data.data;
    setImage_url(data_array[0].url);
    setLoading(false);
  }
  



  return (
    <div className='ai-image-generator'>
      <div className='header'>AI Image <span>Generator</span></div>
      <div className='img-loading'>
        <div className='image'><img src={image_url==="/"?image:image_url} alt=""/></div>
        <div className='loading'>
          <div className={loading?"loading-bar-full":"loading-bar"}></div>
            <div className={loading?'loading-text':"display-none"}> Loading....</div>
        </div>
      </div>
      <div className="search">
        <input type="text" ref={inputRef} className='search-input' placeholder='What you want to create today' />
        <div className="generate-btn" onClick={()=>{imageGenerator();}}>Generate</div>
      </div>
    </div>

  )
}

export default ImageGenerator;