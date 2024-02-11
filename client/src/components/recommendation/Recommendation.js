import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../navbar/Navbar';
import './recommendation.css';
import boy from "../../assets/images/boy.svg";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";
import { getRecommendationAPIMethod } from "../../api/question";
    

const Recommendation = () => {
    const [recommendation, setRecommendation] = useState(null);
    const [recList, setRecList] = useState([]); // top 10 recommendation
    const { age, description } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        getRecommendationAPIMethod(age, description)
        .then(response => response.json())
        .then(data => {
            setRecommendation(data);
            if (data !== null) {
                setRecList(data.data.slice(0, 10));
            }
        })
    }, []);
    
    return (
        <div className='recommendation'>
            <Navbar />
            <div className='to_mainpage' onClick={() => navigate('/mainpage')}>
                <KeyboardBackspaceIcon />
                <div>To main page</div>
            </div>
            <div className='recommendation_outer'>
                <h1>Recommendations ({data.length})</h1>
                <div className='recommendation_container'>
                    {data.map((d) => (
                        <div className='recommendation_object'>
                            <div>{d.img}</div>
                            <div className='recommendation_object_bottom'>
                                <h1>{d.title}</h1>
                                <p>{d.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Recommendation;