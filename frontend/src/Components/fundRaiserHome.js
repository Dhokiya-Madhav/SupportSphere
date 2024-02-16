import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react'
export default function FundRaiserHome() {
    const [fundraisers, setFundraisers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchError, setSearchError] = useState('');
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


    const handleSearchChange = async (e) => {
        const query = e.target.value.toLowerCase();
        if (query === '') {

            setSearchError('');
            setSearchQuery('');
            const originalData = await fetchOriginalData();
            setFundraisers(originalData);
            return;
        }

        // const filteredFundraisers = fundraisers.filter((fundraiser) =>
        //     fundraiser.fundRaiser.fundRaiserTitle.toLowerCase().includes(query)
        // );

        const filteredFundraisers = fundraisers.filter((fundraiser) =>
        (
            fundraiser.fundRaiser.fundRaiserTitle.toLowerCase().includes(query) ||
            fundraiser.fundRaiser.amount.toLowerCase().includes(query) ||
            fundraiser.patientDetails.age.toLowerCase().includes(query) ||
            fundraiser.patientDetails.Name.toLowerCase().includes(query)
        )
        );
        if (filteredFundraisers.length === 0) {
            setSearchError('No fundraisers found');
        } else {
            setSearchError('');
        }
        setFundraisers(filteredFundraisers);
        setSearchQuery(query);
    };

    const fetchOriginalData = async () => {
        try {
            const response = await fetch('http://localhost:5000/getall');
            if (!response.ok) {
                throw new Error('Failed to fetch fundraisers');
            }
            return response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    return (
        <>
            <div className="mx-auto mt-1 ms-4">
                <center>
                    <input
                        type="text"
                        placeholder="Search fundraisers by title,age,amount"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className='form-control mt-2'
                        style={{ width: 400 }}
                    />

                    {searchError && <div style={{ width: 300 }} className='alert alert-danger mt-3'>{searchError}</div>}
                </center>
                <Card.Group className="mt-2 ms-5">
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
            </div>
            <br></br><br></br><br></br><br></br><br></br>
        </>
    );
}
