
const web3 = new Web3('HTTP://127.0.0.1:7545');
const contractABI = [  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "doctorMapping",
    "outputs": [
      {
        "internalType": "string",
        "name": "designation",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isRegistered",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "patientCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "patientMapping",
    "outputs": [
      {
        "internalType": "bool",
        "name": "isUIDGenerated",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "age",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "dob",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "cholesterol",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "restECG",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "bloodPressure",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "pid",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_designation",
        "type": "string"
      }
    ],
    "name": "registerDoctor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "generateUniqueID",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "uniqueID",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_age",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_dob",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_cholesterol",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_restECG",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_bloodPressure",
        "type": "uint256"
      }
    ],
    "name": "registerPatient",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_uniqueID",
        "type": "bytes32"
      }
    ],
    "name": "getPatientDetails",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "getDoctorDetails",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }  ];
const contractAddress = "0x62Bf4F53D64E7b8e35D3010F4572721026fF748f";
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function registerPatient() {
  const patientID = document.getElementById("patientID").value; // User inputs some ID
  const uniqueID = await contract.methods.generateUniqueID(patientID).call(); // Generate the same bytes32 ID
  console.log("Generated Unique ID:", uniqueID);

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const dob = document.getElementById("dob").value;
  const cholesterol = document.getElementById("cholesterol").value;
  const restECG = document.getElementById("restECG").value;
  const bloodPressure = document.getElementById("bloodPressure").value;

  try {
      await contract.methods.registerPatient(
          uniqueID, name, age, dob, cholesterol, restECG, bloodPressure
      ).send({ from: ethereum.selectedAddress });

      console.log("Patient registered successfully!");
      alert(`Patient registered! Unique ID: ${uniqueID}`);
  } catch (error) {
      console.error("Error registering patient:", error);
  }
}

async function getPatientDetails() {
  const uniqueID = document.getElementById("patientUniqueID").value.trim();
  if (!uniqueID) return alert("Enter a valid Unique ID.");

  try {
      document.getElementById("patientDetails").style.display = "none";
      document.getElementById("patientDetails").innerHTML = "Loading...";

      const contract = new web3.eth.Contract(abi, contractAddress);

      // ✅ Convert Unique ID to bytes32 format
      const uniqueIDBytes32 = web3.utils.keccak256(uniqueID);

      console.log("Fetching details for ID:", uniqueIDBytes32);

      // ✅ Call Solidity function using the correct bytes32 ID
      const patientData = await contract.methods.getPatientDetails(uniqueIDBytes32).call();

      if (!patientData || patientData.length === 0) {
          throw new Error("Invalid Unique ID or patient not found.");
      }

      document.getElementById("patientDetails").innerHTML = `
          <p>Name: ${patientData[0]}</p>
          <p>Age: ${patientData[1]}</p>
          <p>Date of Birth: ${patientData[2]}</p>
          <p>Cholesterol: ${patientData[3]}</p>
          <p>Rest ECG: ${patientData[4]}</p>
          <p>Blood Pressure: ${patientData[5]}</p>
      `;
      document.getElementById("patientDetails").style.display = "block";
  } catch (error) {
      console.error("Error fetching patient details:", error);
      alert(error.message || "Failed to fetch patient details.");
  }
}


async function registerDoctor() {
    const accounts = await web3.eth.getAccounts();
    const name = document.getElementById("doctorName").value;
    const designation = document.getElementById("doctorDesignation").value;
    await contract.methods.registerDoctor(name, designation).send({ from: accounts[0] });
    alert("Doctor Registered Successfully");
}


async function getPatientDetails() {
  const patientUniqueID = document.getElementById("patientUniqueID").value.trim();
  if (!patientUniqueID) return alert("Enter a valid Unique ID.");

  try {
      // Connect to Ganache RPC (Assuming it runs on port 7545)
      const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

      // Load contract instance
      const contract = new web3.eth.Contract(abi, contractAddress);

      // Fetch patient details
      const patientData = await contract.methods.getPatientDetails(patientUniqueID).call();

      if (!patientData || patientData.length === 0) {
          throw new Error("No patient data found.");
      }

      // Display patient details
      document.getElementById("patientDetails").innerHTML = `
          <p><strong>Name:</strong> ${patientData[0]}</p>
          <p><strong>Age:</strong> ${patientData[1]}</p>
          <p><strong>Date of Birth:</strong> ${patientData[2]}</p>
          <p><strong>Cholesterol:</strong> ${patientData[3]}</p>
          <p><strong>Rest ECG:</strong> ${patientData[4]}</p>
          <p><strong>Blood Pressure:</strong> ${patientData[5]}</p>
      `;
      document.getElementById("patientDetails").style.display = "block";
  } catch (error) {
      console.error("Error fetching patient details:", error);
      alert(error.message || "Failed to fetch patient details.");
      const patientData = await contract.methods.getPatientDetails(patientUniqueID).call({
        gas: 5000000 // Increase gas limit
    });
    
  }
}

async function predictRisk() {
  // Get input values from the form
  const age = parseInt(document.getElementById("age").value);
  const bloodPressure = parseInt(document.getElementById("bloodPressure").value);
  const cholesterol = parseInt(document.getElementById("cholesterol").value);
  const restECG = document.getElementById("restECG").value.toLowerCase();

  // Validate input fields
  if (isNaN(age) || isNaN(bloodPressure) || isNaN(cholesterol) || !restECG) {
      alert("Please enter all required details correctly.");
      return;
  }

  const predictionPayload = {
      age: age,
      bloodPressure: bloodPressure,
      cholesterol: cholesterol,
      restECG: restECG
  };

  try {
      // Call FastAPI ML model for prediction
      const response = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(predictionPayload)
      });

      const result = await response.json();

      if (result.error) {
          alert(result.error);
          return;
      }

      // Display the prediction results
      document.getElementById("riskScore").textContent = `Predicted Risk: ${result.prediction}`;
      document.getElementById("riskPercentage").textContent = `Risk Percentage: ${result.riskPercentage}%`;
      document.getElementById("predictionResult").style.display = "block";

  } catch (error) {
      console.error("Error predicting disease risk:", error);
      alert("Prediction failed.");
  }
}

// Add event listener to the button
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("predictRisk").addEventListener("click", predictRisk);
});

// ✅ Attach Event Listeners
document.addEventListener("DOMContentLoaded", function () {
   
    document.getElementById("generateUID").addEventListener("click", generateUniqueID);
    document.getElementById("registerPatient").addEventListener("click", registerPatient);
    document.getElementById("viewPatient").addEventListener("click", getPatientDetails);
    document.getElementById("registerDoctor").addEventListener("click", registerDoctor);
    document.getElementById("viewDoctor").addEventListener("click", getDoctorDetails);
});
async function viewPatients() {
  try {
      const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
      const contractABI = YOUR_CONTRACT_ABI_HERE;
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      const accounts = await web3.eth.getAccounts();
      const patientDetails = await contract.methods.getPatientDetails().call({ from: accounts[0] });

      document.getElementById("patientDetails").innerHTML = `
          <h3>Registered Patient Details</h3>
          <p><strong>Gen 1 - Age:</strong> ${patientDetails[0][0]}, BP: ${patientDetails[0][1]}, Cholesterol: ${patientDetails[0][2]}, RestECG: ${patientDetails[0][3]}</p>
          <p><strong>Gen 2 - Age:</strong> ${patientDetails[1][0]}, BP: ${patientDetails[1][1]}, Cholesterol: ${patientDetails[1][2]}, RestECG: ${patientDetails[1][3]}</p>
          <p><strong>Gen 3 - Age:</strong> ${patientDetails[2][0]}, BP: ${patientDetails[2][1]}, Cholesterol: ${patientDetails[2][2]}, RestECG: ${patientDetails[2][3]}</p>
      `;
  } catch (error) {
      console.error("Error retrieving patient details:", error);
      alert("Failed to retrieve patient details. Check console for details.");
  }
}

// Attach event listener to "View" button
document.getElementById("viewPatients").addEventListener("click", viewPatients);



