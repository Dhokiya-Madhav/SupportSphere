import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Image } from 'semantic-ui-react'

export default function UserFundRaiser() {
    const [fundraisers, setFundraisers] = useState([]);

    useEffect(() => {
        const fetchFundraisers = async () => {
            try {
                const response = await fetch('http://localhost:5000/myfundraiser/' + sessionStorage.getItem('userEmail'));
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

    const handleDelete = async (id) => {
        try {
          const response = await fetch(`http://localhost:5000/delete-fundraiser/${id}`, {
            method: 'DELETE',
          });
    
          if (!response.ok) {
            throw new Error('Failed to delete fundraiser');
          }
          setFundraisers((prevFundraisers) =>
            prevFundraisers.filter((fundraiser) => fundraiser._id !== id)
          );
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <div className="mx-auto mt-1 ms-4">
            <Card.Group className="mt-2 ms-5">
                {fundraisers.map((fundraiser, index) => (
                    <Card key={index}>
                        <Card.Content>
                            <Image
                                floated='right'
                                size='mini'
                                src={fundraiser.fundRaiser.image}
                            />
                            <Button floated="right" size="mini" onClick={() => handleDelete(fundraiser._id)}>Delete</Button>
                            <Card.Header>{fundraiser.fundRaiser.fundRaiserTitle}</Card.Header>
                            <Card.Meta>{fundraiser.patientDetails.Name}--{fundraiser.patientDetails.age} Years</Card.Meta>
                            <Card.Description>
                                Total Raised <br></br>
                                Amount to be raised :- {fundraiser.fundRaiser.amount}
                                <br></br>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui three buttons'>
                                <Link to='/fundraiser' state={{ id: fundraiser._id }}>
                                    <Button basic color='green'>
                                        More Details
                                    </Button>
                                </Link>

                                <Link to='/update' state={{ id: fundraiser._id }}>
                                    <Button basic color='orange' className='ms-2'>
                                        Edit
                                    </Button>
                                </Link>
                            </div>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
            <br></br><br></br><br></br><br></br><br></br><br></br>
        </div>
    );
}
