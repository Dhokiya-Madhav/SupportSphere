import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import QRCode from 'react-qr-code';

export default function FundRaiserDetails() {
    const location = useLocation();
    const [fundRaiserDetails, setDetails] = useState([]);
    const [activeTab, setActiveTab] = useState(1);

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };
    useEffect(() => {
        fetch("http://localhost:5000/fund-raiser/" + location.state.id).then((response) => response.json())
            .then((data) => {
                setDetails(data);
            })
    }, []);
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
                <li className="nav-item">
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
                </li>
            </ul>

            <br></br>
            <div className="tab-content mt-2">
                <div className={`tab-pane ${activeTab === 1 ? 'active' : ''}`}>
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
                    <h1>{fundRaiserDetails.fundRaiser?.amount} To be raised</h1>
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