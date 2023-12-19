import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react'
export default function FundRaiserHome() {
    const [fundraisers, setFundraisers] = useState([]);

    useEffect(() => {
        const fetchFundraisers = async () => {
            try {
                const response = await fetch('http://localhost:5000/getall');
                if (!response.ok) {
                    throw new Error('Failed to fetch fundraisers');
                }
                const data = await response.json();
                setFundraisers(data);
                console.log(fundraisers);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFundraisers();
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
