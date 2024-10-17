import React, { useState } from "react";
import axios from "axios";

const NftSign = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [ipfsHash, setIpfsHash] = useState("");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const uploadToPinata = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        const metadata = JSON.stringify({
            name: "MyImage",
        });
        formData.append("pinataMetadata", metadata);

        const pinataOptions = JSON.stringify({
            cidVersion: 0,
        });
        formData.append("pinataOptions", pinataOptions);

        try {
            const res = await axios.post(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                formData,
                {
                    headers: {
                        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                        pinata_api_key: "c3b87ecde64af10f6a43",
                        pinata_secret_api_key: "6c1905aec9afc723a77c97c9a5600ffe4d01e86f4426759287950e9557560e61",
                    },
                }
            );

            console.log("IPFS Hash: ", res.data.IpfsHash);
            setIpfsHash(res.data.IpfsHash);
        } catch (error) {
            console.error("Error uploading to Pinata: ", error);
            alert("Error uploading file!");
        }
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 ">
                        <br></br>
                        <h1>Mint Nft</h1>
                        <form onSubmit={uploadToPinata} className="text-center">
                            <input type="file" onChange={handleFileChange} />
                            <br></br><br></br>
                            <button type="submit" className="text-center">Mint</button>
                        </form>

                        {ipfsHash && (
                            <div>
                                <p>Image successfully uploaded!</p>
                                <p>IPFS Hash: {ipfsHash}</p>
                                <a
                                    href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View Image
                                </a>
                            </div>
                        )}
                    </div>

                    <div className="col-md-6 text-center">
                        <br></br>
                        <h1>My Nfts</h1>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NftSign;
