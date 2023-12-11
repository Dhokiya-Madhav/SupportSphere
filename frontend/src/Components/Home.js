import React from "react";
import { Statistic, Grid, Image, Segment, Card, Icon } from 'semantic-ui-react';
import P1 from '../images/patient1.jpg';
import P2 from '../images/patient2.jpg';
import P3 from '../images/patient3.jpg';
import P4 from '../images/patient4.jpg';
import '../css/Home.css';
export default function Home() {
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
                <center><p className="fontStyle trending">Trending Fundraisers</p></center>
                
            </div>
        </>
    )
}