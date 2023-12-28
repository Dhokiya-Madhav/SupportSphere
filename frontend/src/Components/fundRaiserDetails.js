import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { Message } from 'semantic-ui-react'

export default function FundRaiserDetails() {
    const location = useLocation();
    const [fundRaiserDetails, setDetails] = useState([]);
    const [paymentDetails, setPaymentDetails] = useState([]);
    const [activeTab, setActiveTab] = useState(1);
    const [totalAmount, setTotalAmount] = useState(null);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [percentageRaised, setPercentageRaised] = useState(0);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const isFundraiserClosed = totalAmount >= fundRaiserDetails.fundRaiser?.amount;
    const [openDonorList, setOpenDonorList] = useState(false);
    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };
    useEffect(() => {
        if(sessionStorage.getItem("userEmail") == null){
            window.location='http://localhost:3000/login';
            return;
        }
        fetch("http://localhost:5000/fund-raiser/" + location.state.id).then((response) => response.json())
            .then((data) => {
                setDetails(data);
                fetchPaymentDetails();
            })
    }, []);

    const fetchPaymentDetails = () => {
        //console.log(location.state.id);
        fetch("http://localhost:5000/payment-details/" + location.state.id).then((response) => response.json())
            .then((data) => {
                setPaymentDetails(data);
                console.log(data)
                const totalAmount = data.reduce((total, payment) => total + payment.amount, 0);
                console.log('Total Amount:', totalAmount);
                setTotalAmount(totalAmount);
            })
    }
    const [selectedOption, setSelectedOption] = useState(null);
    const [pay, setPay] = useState(null);
    const [amount, setAmount] = useState(null);
    const handleRadioChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        console.log(`Selected Radio Button: ${selectedValue}`);
        if (selectedValue === "option3") {
            setActiveTab(3);
        }
    };

    const handlePayment = (e) => {
        e.preventDefault();
        if (selectedOption === "option2" && amount != null && name !== "" && phoneNumber !== "") {
            setPay(true)

            storePaymentDetails(name, phoneNumber, amount, location.state.id);
        }
        else if (selectedOption === "option3" && amount != null && name !== "" && phoneNumber !== "") {

        }
    }

    const storePaymentDetails = (name, phoneNumber, amount, fundRaiserId) => {
        fetch("http://localhost:5000/store-payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                phoneNumber,
                amount,
                fundRaiserId,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Payment details stored successfully:", data);
                setPaymentSuccess(true);
                setTimeout(() => {
                    setPaymentSuccess(false)
                }, 4000);
            })
            .catch((error) => {
                console.error("Error storing payment details:", error);
            });
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '600px' }}>
            <ul className="nav nav-tabs flex-column flex-sm-row">
                <li className="nav-item">
                    <button
                        className={`btn btn-dark ${activeTab === 1 ? 'active' : ''} mb-2 mb-sm-0`}
                        onClick={() => handleTabClick(1)}
                    >
                        Patient Details
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`btn btn-dark ms-0 ms-sm-3 ${activeTab === 2 ? 'active' : ''} mb-2 mb-sm-0`}
                        onClick={() => handleTabClick(2)}
                    >
                        Fundraiser Details
                    </button>
                </li>
                {!isFundraiserClosed && (<><li className="nav-item">
                    <button
                        className={`btn btn-dark ms-0 ms-sm-3 ${activeTab === 3 ? 'active' : ''}`}
                        onClick={() => handleTabClick(3)}
                    >
                        Payment Details
                    </button>
                </li>
                    <li className="nav-item">
                        <button
                            className={`btn btn-dark ms-0 ms-sm-3 ${activeTab === 4 ? 'active' : ''}`}
                            onClick={() => handleTabClick(4)}
                        >
                            Contribute
                        </button>
                    </li></>)}
            </ul>

            <br></br>
            <div className="tab-content mt-2">
                <div className={`tab-pane ${activeTab === 1 ? 'active' : ''}`}>
                    {isFundraiserClosed && (<><div className="alert alert-success">Fundraiser is closed. Target amount has been reached. Thank you for your support!
                    </div></>)}
                    <h1>{fundRaiserDetails.fundRaiser?.fundRaiserTitle}</h1>
                    <center>
                        <img src={fundRaiserDetails.fundRaiser?.image} height={190} width={190} />
                    </center>
                    <h2>{fundRaiserDetails.patientDetails?.Name}</h2>
                    <p>{fundRaiserDetails.patientDetails?.age} Years</p>
                    <h4><b>Hospital : </b>{fundRaiserDetails.patientDetails?.hospitalName}</h4>
                    <h4><b>City : </b>{fundRaiserDetails.patientDetails?.city}</h4>
                </div>
                <div className={`tab-pane ${activeTab === 2 ? 'active' : ''}`}>
                    {isFundraiserClosed && (<><div className="alert alert-success">Fundraiser is closed. Target amount has been reached. Thank you for your support!
                    </div></>)}

                    <h1>{fundRaiserDetails.fundRaiser?.amount} Rs To be raised</h1>
                    <h4 className="text-danger">Total Amount Raised Till Now: {totalAmount} Rs</h4>

                    <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Open Donor List
                    </button>


                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Donor List</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    {paymentDetails.map((pd) => (
                                        <Message>
                                            <Message.Header>{pd?.name}</Message.Header>
                                            <p>
                                                {pd?.amount} Rs
                                            </p>
                                        </Message>
                                    ))}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h4>This fundraiser is for my <b>{fundRaiserDetails.fundRaiser?.fundRaiseFor}</b></h4>
                    <h4>{fundRaiserDetails.whyFundRaiser?.story}</h4>
                    <h4><a href={fundRaiserDetails.whyFundRaiser?.gdrive}>Link of medical documents</a></h4>
                </div>
                <div className={`tab-pane ${activeTab === 3 ? 'active' : ''}`}>
                    <h4>Bank Name: {fundRaiserDetails.paymentDetails?.bankName}</h4>
                    <h4>Account Number: {fundRaiserDetails.paymentDetails?.accountNo}</h4>
                    <h4>IFSC: {fundRaiserDetails.paymentDetails?.ifscCode}</h4>
                    <h4>UPI: {fundRaiserDetails.paymentDetails?.upiId}</h4>
                </div>
                <div className={`tab-pane ${activeTab === 4 ? 'active' : ''}`}>
                    <div className="container mt-4">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="exampleRadios"
                                        id="option2"
                                        value="option2"
                                        checked={selectedOption === 'option2'}
                                        onChange={handleRadioChange}
                                    />
                                    <label className="form-check-label" htmlFor="option2">
                                        UPI Transfer
                                    </label>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="exampleRadios"
                                        id="option3"
                                        value="option3"
                                        checked={selectedOption === 'option3'}
                                        onChange={handleRadioChange}
                                    />
                                    <label className="form-check-label" htmlFor="option3">
                                        Direct Bank Transfer
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    {paymentSuccess && (
                        <div className="alert alert-success mt-3" role="alert">
                            Payment Successful! Thank you for your contribution.
                        </div>
                    )}
                    <br></br>
                    <strong>Name :</strong>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required /><br></br>
                    <strong>Phone Number :</strong>
                    <input type="number" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required /><br></br>
                    <strong>Amount :</strong>
                    <input type="number" className="form-control" onChange={(e) => setAmount(e.target.value)} required /><br></br>
                    <button className="btn btn-outline-dark" onClick={handlePayment}>Pay</button>
                    {pay === true && (<div><h4 className="mt-1">Scan the qrcode</h4>
                        <QRCode className="" value={`upi://pay?pa=${fundRaiserDetails.paymentDetails?.upiId}&pn=Madhav&am=${amount}`} title='upi' />
                    </div>)}
                </div>
            </div>
        </div>
    )

}