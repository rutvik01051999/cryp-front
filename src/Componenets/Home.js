import React from 'react';

const Home = () => {
  return <>
    <div className='container'>
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
          <img className="card-img-top" src="..." alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="..." alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="..." alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default Home;  // Make sure this is default export
