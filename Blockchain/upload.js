import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import dotenv from "dotenv";
dotenv.config();

// ✅ Load JWT Token
const pinataJWT = process.env.PINATA_JWT;

// ✅ Debug: Check if the token exists
if (!pinataJWT) {
  console.error("❌ ERROR: Pinata JWT Token is missing. Check your .env file!");
  process.exit(1);
}

// ✅ File Path
const filePath = "D:/hack/EthiChain/Blockchain/test-document.txt";

// ✅ Ensure file exists
if (!fs.existsSync(filePath)) {
  console.error("❌ ERROR: File does not exist. Please create 'test-document.txt' in Blockchain folder.");
  process.exit(1);
}

async function uploadFile() {
  const data = new FormData();
  data.append("file", fs.createReadStream(filePath)); // ✅ Correctly attach file

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
      headers: {
        "Authorization": `Bearer ${pinataJWT}`, // ✅ Proper JWT token usage
        ...data.getHeaders(), // ✅ Ensures correct `multipart/form-data` headers
      }
    });

    console.log(`✅ File uploaded to IPFS: https://ipfs.io/ipfs/${res.data.IpfsHash}`);
  } catch (error) {
    console.error("❌ Failed to upload to IPFS:", error.response ? error.response.data : error);
  }
}

uploadFile();
