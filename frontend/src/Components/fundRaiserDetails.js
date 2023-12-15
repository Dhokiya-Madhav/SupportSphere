import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
export default function FundRaiserDetails() {
    const location = useLocation();
    const [fundRaiserDetails, setDetails] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/fund-raiser/" + location.state.id).then((response) => response.json())
            .then((data) => {
                setDetails(data);
                console.log(fundRaiserDetails);
            })
    }, []);

    return (
        <div>Hello</div>
    )

}