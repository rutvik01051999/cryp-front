require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// Upload image to Pinata
const uploadToPinata = async (filePath) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));

  const metadata = JSON.stringify({
    name: 'ImageUpload',
  });
  formData.append('pinataMetadata', metadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append('pinataOptions', pinataOptions);

  try {
    const res = await axios.post(url, formData, {
      maxBodyLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'pinata_api_key': process.env.PINATA_API_KEY,
        'pinata_secret_api_key': process.env.PINATA_API_SECRET,
      },
    });

    console.log('IPFS Hash:', res.data.IpfsHash);
    return res.data.IpfsHash;
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
  }
};

// Example usage
uploadToPinata('./path_to_image.png');
