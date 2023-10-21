import axios from 'axios';
import React, { useState } from 'react';
import Loader from '../components/Loader';


const Main = () => {

    const [originalImage, setOriginalImage] = useState(null);
    const [upScaled, setUpScaled] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // handle choose image 
    const handleChooseImage = (e) => {
        setOriginalImage(URL.createObjectURL(e.target.files[0]));
    }


    // handle reset fields 
    const handleReset = () => {
        setOriginalImage(null);
        setUpScaled(null);
    }

    // handle submit 
    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        const formData = new FormData(e.target);
        formData.append("upscale_factor", "x8");
        formData.append("format", "JPG");

        const options = {
            method: 'POST',
            url: import.meta.env.VITE_APP_URL,
            headers: {
                accept: 'application/json',
                'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
                'X-Picsart-API-Key': import.meta.env.VITE_APP_PICSART_API
            },
            data: formData
        };

        try {
            const res = await axios.request(options);
            const data = res.data;
            setUpScaled(data.data.url);
            setIsLoading(false);
        } catch (e) {
            console.log(e.message);
            setIsLoading(false);
        }
    }

    return (
        <>
            {isLoading && <Loader />}
            <div className='main'>
                <header>
                    <h3>Image Enhancer Tool</h3>
                </header>

                <main>
                    <div className="main-container">
                        <h1>Upload an Image</h1>

                        <form id='form' onSubmit={handleSubmit}>
                            <input type="file" name='image' id='image' className='image' required onChange={handleChooseImage} />
                            <button className='uploadBtn' type='submit'>Upload</button>
                            <button className='resetBtn' type='reset' onClick={handleReset}>Reset</button>
                        </form>

                        <div className="content">
                            <div className="content-box-header">
                                <p>Origial Image</p>
                            </div>
                            <div className="content-box-header">
                                <p>Upscaled Image</p>
                            </div>
                            <div className="original-image content-box">
                                {originalImage && <img src={originalImage} alt='original Image' />}
                            </div>
                            <div className="upscaled-image content-box">
                                {upScaled && <img src={upScaled} alt='upscaled image' />}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Main