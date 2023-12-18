import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react'
export default function FundRaiserHome() {
    const [fundraisers, setFundraisers] = useState([]);

    useEffect(() => {
        const apiUrl = 'http://localhost:5000/get-all-fundraisers';
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setFundraisers(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <Card.Group className="mt-2 ms-1">
            {fundraisers.map((fundraiser, index) => (
                <Card key={index}>
                    <Card.Content>
                        <Image
                            floated='right'
                            size='mini'
                            src={fundraiser.fundRaiser.image}
                        />
                        <Card.Header>{fundraiser.fundRaiser.fundRaiserTitle}</Card.Header>
                        <Card.Meta>{fundraiser.patientDetails.Name}--{fundraiser.patientDetails.age} Years</Card.Meta>
                        <Card.Description>
                            Total Raised <br></br>
                            Amount to be raised :- {fundraiser.fundRaiser.amount}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Link to='/fundraiser' state={{ id: fundraiser._id }}>
                                <Button basic color='green'>
                                    More Details
                                </Button>
                            </Link>
                        </div>
                    </Card.Content>
                </Card>
            ))}
        </Card.Group>
    );
}
