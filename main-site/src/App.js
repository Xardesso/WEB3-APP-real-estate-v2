import { useState } from "react";
const { ethers } = require("ethers");

const properties = [
  {
    name: "Property 1",
    price: 50000,
    Lot: "333 sqft",
    image: "https://via.placeholder.com/300x200",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac enim ut lorem hendrerit vehicula. Vestibulum venenatis tellus vitae felis luctus, ut pulvinar massa tincidunt.",
  },
  {
    name: "Property 2",
    price: 75000,
    Lot: "8883 sqft",
    image: "https://via.placeholder.com/300x200",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac enim ut lorem hendrerit vehicula. Vestibulum venenatis tellus vitae felis luctus, ut pulvinar massa tincidunt.",
  },
  {
    name: "Property 3",
    price: 100000,
    Lot: "2000 sqft",
    image: "https://via.placeholder.com/300x200",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac enim ut lorem hendrerit vehicula. Vestibulum venenatis tellus vitae felis luctus, ut pulvinar massa tincidunt.",
  },
];

const Header = () => {
  const [walletAddress, setWalletAddress] = useState("connect wallet");

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [provider, setprovider] = useState("");

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    setShowPopup(true);
  };
  async function connect() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const add = await provider.send("eth_requestAccounts", []);
    console.log(add);
    setWalletAddress(add[0]);
    setprovider(provider);
    window.alert("wallet connected");
  }
  async function bid() {
    console.log(bidAmount);
    console.log(provider);
    const conadd = "0xeb5B0fbbeE16244aFb362451B48C9D934cFfA09E";
    const contractArtifacts = require("./artifacts/contracts/realesate.sol/BidContract.json");
    const contractABI = contractArtifacts.abi;
    console.log(contractABI);
    const out = ethers.utils.parseUnits(bidAmount, "ether");

    console.log(out);
    const values = {
      gasLimit: 1000000,
      value: out,
    };
    console.log(values);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(conadd, contractABI, signer);

    const tx = await contract.bid(values);

    const receipt = await tx.wait();
    console.log(receipt.status);
    if (receipt.status === 1) {
      window.alert("Transaction successful!");
    } else {
      window.alert("Transaction failed!");
    }
  }

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div
        style={{
          padding: "20px",
          backgroundColor: "#eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>Real Estate</div>
        <button
          id="conbutt"
          onClick={connect}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            fontSize: "20px",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {walletAddress}
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "flex-start",
          flexGrow: 1,
        }}
      >
        {properties.map((property, index) => (
          <div
            key={index}
            onClick={() => handlePropertyClick(property)}
            style={{
              width: "300px",
              height: "400px",
              marginBottom: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <img
              src={property.image}
              alt={property.name}
              style={{ width: "100%", height: "60%", objectFit: "cover" }}
            />
            <div
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "20%",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                {property.name}
              </div>
              <div style={{ fontSize: "20px" }}>{property.Lot}</div>

              <div style={{ fontSize: "35px" }}>${property.price}</div>
            </div>
          </div>
        ))}
      </div>
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={selectedProperty.image}
              alt={selectedProperty.name}
              style={{
                width: "300px",
                height: "200px",
                objectFit: "cover",
                marginBottom: "20px",
              }}
            />
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "24px",
                  marginBottom: "10px",
                }}
              >
                {selectedProperty.name}
              </div>
              <div style={{ fontSize: "18px", marginBottom: "10px" }}>
                ${selectedProperty.price}
              </div>
              <div style={{ fontSize: "18px", marginBottom: "10px" }}>
                {selectedProperty.Lot}
              </div>
              <div style={{ fontSize: "16px", textAlign: "center" }}>
                {selectedProperty.details}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                style={{
                  marginRight: "10px",
                  padding: "5px",
                  fontSize: "16px",
                }}
              />
              <button
                onClick={bid}
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  fontSize: "20px",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Bid
              </button>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                fontSize: "16px",
                marginTop: "20px",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div
        style={{
          backgroundColor: "#eee",
          padding: "10px",
          marginTop: "20px",
          textAlign: "center",
          fontSize: "12px",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        Marcin Letowski
      </div>
    </div>
  );
};

export default Header;
