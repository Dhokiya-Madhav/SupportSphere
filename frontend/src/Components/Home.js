import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Statistic, Grid, Image, Segment, Card, Button } from 'semantic-ui-react';
import P1 from '../images/patient1.jpg';
import P2 from '../images/patient2.jpg';
import P3 from '../images/patient3.jpg';
import P4 from '../images/patient4.jpg';
import '../css/Home.css';
export default function Home() {
    const [fundraisers, setFundraisers] = useState([]);
    useEffect(() => {
        const fetchFundraisers = async () => {
            try {
                const response = await fetch('http://localhost:5000/trending');
                if (!response.ok) {
                    throw new Error('Failed to fetch fundraisers');
                }
                const data = await response.json();
                setFundraisers(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFundraisers();
    }, []);
    return (
        <>
            <Segment>
                <Grid columns={2} stackable>
                    <Grid.Column>
                        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="1500">
                                    <img src={P1} className="d-block w-100 img-fluid" alt="..." />
                                </div>
                                <div className="carousel-item" data-bs-interval="1500">
                                    <img src={P3} className="d-block w-100 img-fluid" alt="..." />
                                </div>
                                <div className="carousel-item" data-bs-interval="1500">
                                    <img src={P4} className="d-block w-100 img-fluid" alt="..." />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <p style={{ fontSize: 35 }} className="fontStyle">
                            <center><b>"Together, we can heal hearts and save lives"</b></center>
                        </p>

                        <p className="fontStyle">

                            <Statistic.Group size="tiny">
                                <Statistic>
                                    <Statistic.Value>0%</Statistic.Value>
                                    <Statistic.Label>Platform Fees</Statistic.Label>
                                </Statistic>
                                <Statistic>
                                    <Statistic.Value>5 Lakh+</Statistic.Value>
                                    <Statistic.Label>Donors</Statistic.Label>
                                </Statistic>
                                <Statistic>
                                    <Statistic.Value>7.2 Lakh+</Statistic.Value>
                                    <Statistic.Label>Fundraisers</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>

                        </p>
                        <br></br><br></br>
                        <p style={{ fontSize: 20 }} className="fontStyle">
                            <b>0% Platform fees</b> ensures maximum funds for you
                        </p>
                    </Grid.Column>
                </Grid>

            </Segment>

            <div>
                <center><p className="fontStyle trending">Trending Fundraisers</p>
                    <ul className="list-group list-group-horizontal position-relative overflow-auto w-75">
                        {fundraisers.map((fundraiser) => (
                            <li className="list-group-item">

                                <Card>
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

                            </li>
                        ))}
                    </ul>
                </center>
            </div>
        </>
    )
}