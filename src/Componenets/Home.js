import React from 'react';

const Home = () => {
  return <>
    <div className='container'>
      <div className='row'>
        <div className='col-md-3'><br></br>
          <img src="images/robot.jpg" width="100%" alt="" />
        </div>
        <div className='col-md-9'>
          <br></br>
          <div className='contanet text-center'>
            <h1 className='title_des'>what is nft ?</h1>
            <div className='details'>
              An NFT (Non-Fungible Token) is a type of digital asset that represents ownership or proof of authenticity of a unique item or piece of content, such as art, music, videos, virtual real estate, in-game items, and more, on a blockchain
            </div><br></br>
            <h1 className='title_des'>why should i buy nft ?</h1>
            <div className='details'>
              NFTs can represent digital or real-world items like artwork and real estate. "Tokenizing" these real-world tangible assets makes buying, selling, and trading them more efficient while reducing the probability of fraud. NFTs can represent individuals' identities, property rights, and more.
            </div><br></br>
            <h1 className='title_des'>Top NFTs</h1>
          </div>
          <br></br>
          <div className="card-group">
            <div className="card">
              <img className="card-img-top" src="images/download.png" alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
              </div>
            </div>
            <div className="card">
              <img className="card-img-top" src="images/download.png" alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
              </div>
            </div>
            <div className="card">
              <img className="card-img-top" src="images/download.png" alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
              </div>
            </div>
          </div>
        </div>
      </div><br></br>
      <div className='product'>
        <h1 className='title_des'>our product</h1>
        <div className='row'>
          <div className='col-md-6'>
            <div className='row'>
              <div className='col-md-6'>
                <img src="images/download.png" width="100%" alt="" />
              </div>
              <div className='col-md-6'>
                <img src="images/download.png" width="100%" alt="" />
              </div>
            </div>
          </div>
          <div className='col-md-6'>

          </div>
        </div>
      </div>
      <br></br>
    </div>
  </>;
};

export default Home;  // Make sure this is default export
