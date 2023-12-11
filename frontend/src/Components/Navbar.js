import React from 'react';
import Logo from '../images/donation.png';
import { SelectMenu, Button } from 'evergreen-ui'
export default function Navbar() {
    const [selected, setSelected] = React.useState(null)
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#FF5001" }}>
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="#"><img src={Logo} className='img-fluid' height={50} width={50} /></a>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" style={{ color: "#EFEFEF", fontFamily: 'Nunito', fontSize: 19 }} aria-current="page" href="#"><b><i>Support-Sphere</i></b></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" style={{ color: "#EFEFEF" }} href="#">Browse Fundraisers</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">
                            <SelectMenu
                                title="Select"
                                options={['Medical', 'Education', 'Sports', 'Child Welfare', 'Animal'].map((label) => ({ label, value: label }))}
                                width={280}
                                height={200}
                                selected={selected}
                                onSelect={(item) => setSelected(item.value)}
                            >
                                <Button>{selected || 'Fundraise For'}</Button>
                            </SelectMenu>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" style={{ color: "#EFEFEF" }} href="#">About us</a>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <button style={{ backgroundColor: "", color: "#EFEFEF" }} className='btn btn-outline-dark' type="submit">Start a Fundraiser</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}