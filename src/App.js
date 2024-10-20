import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
import CryptoTransfer from "./CryptoTransfer.json"; // Import ABI
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Componenets/Home';
import About from './Componenets/About';
import Nft from './Componenets/Nft';
import NftSign from './Componenets/NftSign';
import Service from './Componenets/Service';
import '../src/bootstrap/css/bootstrap.min.css';
import '../src/css/style.css';
import Popup from './Popup'; // Import the Popup component
import { ethers } from "ethers"


const App = () => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })
  const [active, setActive] = useState('home');

  const [account, setAccount] = useState("");
  const connectWallet = async () => {
    const contractAddres = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    //Metamask part
    //1. In order do transactions on goerli testnet
    //2. Metmask consists of infura api which actually help in connectig to the blockhain
    try {

      const { ethereum } = window;
      const account = await ethereum.request({
        method: "eth_requestAccounts"
      })

      window.ethereum.on("accountsChanged", () => {
        window.location.reload()
      })
      setAccount(account);

      console.log(account)
      const provider = new ethers.providers.Web3Provider(ethereum);//read the Blockchain
      const signer = provider.getSigner(); //write the blockchain

      // Get the connected wallet address
      const walletAddress = await signer.getAddress();

      console.log("Connected Wallet Address:", walletAddress);


      provider.getBalance(contractAddres, "latest").then((balance) => {
        console.log("Balance:", ethers.utils.formatEther(balance));
      }).catch((error) => {
        console.error("Error fetching balance:", error);
      });

      console.log(provider)

    } catch (error) {
      console.log(error)
    }

  };

  return (
    <Router>
      {/* <Popup isOpen={isOpen} onClose={togglePopup}>
                <h2>This is a Popup</h2>
                <p>You can put any content here.</p>
            </Popup> */}
      {/* <button onClick={togglePopup}>Open Popup</button> */}

      <div className="app-container">
        {/* Fixed Navbar */}

        <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand" href="#">EthNfts</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className={`nav-link ${active == 'home' ? 'active' : ''}`} onClick={() => setActive('home')} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${active == 'about' ? 'active' : ''}`} onClick={() => setActive('about')} to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${active == 'services' ? 'active' : ''}`} onClick={() => setActive('services')} to="/services">Services</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${active == 'contact' ? 'active' : ''}`} onClick={() => setActive('contact')} to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${active == 'nft' ? 'active' : ''}`} onClick={() => setActive('nft')} to="/nft">NFT-Number</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${active == 'nft-sign' ? 'active' : ''}`} onClick={() => setActive('nft-sign')} to="/nft-sign">Digital-nft-sign</Link>
              </li>
            </ul>
            <div className="form-inline my-2 my-lg-0">
              <button onClick={connectWallet} className="btn btn-outline-light my-2 my-sm-0" type="submit">Login</button>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/nft" element={<Nft />} />
            <Route path="/nft-sign" element={<NftSign />} />
            <Route path="/services" element={<Service />} />
          </Routes>
        </div>

        {/* Fixed Footer */}
        <footer className="text-center text-lg-start bg-body-tertiary">
          <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
            <div className="me-5 d-none d-lg-block">
              <span>Get connected with us on social networks:</span>
            </div>

            <div>
              <a href="" className="me-4 text-reset">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="" className="me-4 text-reset">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="" className="me-4 text-reset">
                <i className="fab fa-google"></i>
              </a>
              <a href="" className="me-4 text-reset">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="" className="me-4 text-reset">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="" className="me-4 text-reset">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </section>

          <section className="">
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">
                    <i className="fas fa-gem me-3"></i>Company name
                  </h6>
                  <p>
                    Here you can use rows and columns to organize your footer content. Lorem ipsum
                    dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>

                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">
                    Products
                  </h6>
                  <p>
                    <a href="#!" className="text-reset">Angular</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">React</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">Vue</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">Laravel</a>
                  </p>
                </div>

                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">
                    Useful links
                  </h6>
                  <p>
                    <a href="#!" className="text-reset">Pricing</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">Settings</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">Orders</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">Help</a>
                  </p>
                </div>

                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                  <p><i className="fas fa-home me-3"></i> New York, NY 10012, US</p>
                  <p>
                    <i className="fas fa-envelope me-3"></i>
                    info@example.com
                  </p>
                  <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
                  <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
                </div>
              </div>
            </div>
          </section>

          <div className="text-center p-4">
            © 2021 Copyright:
            <a className="text-reset fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;