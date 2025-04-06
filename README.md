<h1>GeneticDiseasePrediction</h1>


<p style="text-align: right;">Genetic disorders occur due to changes in DNA, either inherited from parents or developed over time, leading to serious health problems. Early detection is crucial, as it allows individuals to take preventive measures, make lifestyle changes, and reduce the risk of severe diseases. This article presents a secure and intelligent system for storing genetic data of three generations using blockchain technology, ensuring data safety, integrity, and protection from unauthorized access. Since genetic data is highly sensitive, blockchain prevents tampering and ensures transparency while maintaining strict security standards. Along with secure storage, the system integrates a machine learning model using the Random Forest algorithm to predict the risk of heart diseases such as heart attacks and cardiac arrest. By analyzing genetic and health data, the model helps identify high-risk individuals, allowing for early medical intervention. The combination of blockchain and predictive analytics enhances data security, improves accessibility, and strengthens early disease detection. Experimental results confirm the effectiveness of this approach in protecting genetic information and accurately predicting heart disease risks. This system provides a scalable and intelligent framework for genetic data storage while offering valuable health insights, empowering individuals to take proactive steps in managing their health and reducing the chances of life-threatening conditions.<p>

## Table of Contents  
1. [Introduction](#introduction)  
2. [Architecture Diagram](#architecture-diagram)  
3. [Ganache Installation](#ganache-installation)  
4. [Autopsy Installation](#autopsy-installation)  
5. [Digital Forensics Tools, Libraries, and Frameworks](#digital-forensics-tools-libraries-and-frameworks)  
6. [Features](#features)  
7. [Directory Structure](#directory-structure)
   

## 1. Introduction  
<p>Genetic disorders result from DNA mutations, either inherited or acquired, leading to serious health risks. Early detection and prevention are crucial, allowing individuals to adopt healthier lifestyles and reduce complications. Secure genetic data storage is essential for maintaining accuracy, accessibility, and preventing misuse. 
Advancements in healthcare technology have enabled the integration of machine learning (ML) and blockchain to enhance disease prediction and secure medical data management. This study presents an integrated framework that utilizes genetic data, routine health checkup results, and modern computational techniques to assess genetic diseases and cardiovascular risks. By leveraging these technologies, the system aims to improve the accuracy and security of health predictions.
Machine learning has been extensively explored to enhance disease prediction and improve healthcare outcomes. Selvi et al. [1] proposed the EPERM model for heart disease prediction, which demonstrated potential in enabling early diagnosis; however, its effectiveness in real-world applications remains unverified due to a lack of validation beyond controlled environments. Mahajan and Mahajan [4] introduced a KNN-based genetic disorder prediction model that showed promise in identifying hereditary conditions but raised concerns about data privacy and security, limiting its practical application. While ML models significantly enhance predictive accuracy by identifying complex patterns in medical data, they still face several challenges, including scalability, data inefficiencies, and implementation complexities. The need for large, high-quality datasets, computational efficiency, and privacy-preserving mechanisms remains a critical consideration for improving the effectiveness and reliability of machine learning in healthcare.
The proposed system predicts the likelihood of hereditary diseases and cardiovascular conditions, such as heart attacks and cardiac arrest, using intelligent data processing. To achieve this, a machine learning model, specifically the Random Forest algorithm, is employed due to its ability to handle high-dimensional medical data and capture complex relationships between genetic markers and risk factors. Random Forest, an ensemble learning method, enhances predictive accuracy by combining multiple decision trees, thereby reducing overfitting and improving robustness.
This study highlights the use of advanced machine learning, specifically the Random Forest algorithm, to predict cardiovascular disease risks by analysing genetic markers and health records. Integrating blockchain ensures secure, transparent, and tamper-proof storage across three generations, enhancing early diagnosis and proactive healthcare decisions. This smart and scalable approach improves disease prediction and overall healthcare outcomes.
By leveraging blockchain technology, the proposed system ensures secure, transparent, and tamper-proof genetic data storage across three generations. Additionally, an advanced Random Forest machine learning model predicts cardiovascular disease risks, enhancing early diagnosis and proactive healthcare decisions. This integrated approach provides a scalable, intelligent, and secure framework for genetic data management and disease risk prediction. 
Blockchain ensures secure, tamper-proof storage of medical records, preventing unauthorized access and enhancing transparency. Encrypted data allows patients and providers to access reliable information securely, eliminating risks of centralized databases. The system continuously updates predictive models with new health data, ensuring accurate disease risk assessments. By integrating blockchain for secure data management and machine learning for intelligent analysis, it enables early detection, prevention, and proactive healthcare decisions, improving patient outcomes with personalized insights.
<p>

<h2 id="architecture-diagram"> 2. Architecture Diagram</h2>
<img src="https://github.com/bharani33/GeneticDiseasePrediction/blob/main/images/architecture.jpg?raw=true" alt="Architecture Diagram" width="300">
<p>This diagram illustrates blockchain-based heart disease risk prediction system integrates machine learning for secure and accurate assessments. Users, including doctors and patients, register their details, which are securely stored using smart contracts to ensure data integrity and security. Doctors can access patient records, while patients can view their health data and predictions. The system employs a Random Forest classifier to analyse stored health data and predict heart disease risk, outputting "0" for no risk and "1" for potential risk. Smart contracts handle patient and doctor registration, data storage, and risk predictions, ensuring transparency and preventing unauthorized modifications. Doctor retrieve risk assessments to recommend medical interventions, while patients access reports for preventive measures. By combining blockchain’s security with machine learning’s predictive accuracy, this system offers a reliable, transparent, and efficient approach to heart disease risk management.</p>

 
## 3. Ganache Installation  
<h5>Step 1: Install Ganache</h5>

<p><strong>I. Download Ganache from the official Truffle Suite website:</strong>  
👉 <a href="https://trufflesuite.com/ganache/" target="_blank">Ganache Download</a></p>

<p><strong>II. Install it</strong> by following the on-screen instructions for your OS (Windows, macOS, or Linux).</p>

<p><strong>III. Open Ganache</strong> and create a new workspace or use the quickstart option to start a blockchain instance.</p>


## 4. Blockchain Data Storage

<p>The Blockchain Data Storage Module is responsible for securely storing the health records of patients across three generations. This module uses blockchain technology to ensure that all medical data—including cholesterol levels, resting blood pressure (trestbps), and ECG results (restecg)—is stored in a tamper-proof, immutable, and transparent manner. Each patient is assigned a unique ID, which links their health data to their respective family history on the blockchain.
Smart contracts are used to manage data insertion and retrieval, ensuring only authorized interactions with the ledger. By decentralizing data storage, this module eliminates the risk of unauthorized data modification and enhances the trust and reliability of the healthcare information used in the prediction process. The data stored here is later retrieved by the machine learning module to accurately assess the risk of heart disease in the third-generation patient.
</p>


## 5. Machine Learning Model Training

<p>In The Intelligent Risk Prediction for Cardiovascular Diseases Module, there are two sub modules Machine Learning Model Training and Heart Disease Risk Prediction. Machine Learning Model Training utilizes a machine learning algorithm to analyze patient data across three generations and predict the risk of heart disease in the third-generation patient. The algorithm processes key health parameters such as cholesterol level, trestbps (resting blood pressure), and restecg (resting electrocardiogram results) from previous generations to identify patterns and risk factors. Heart Disease Risk Prediction utilizes historical genetic and health data, the model determines whether the third-generation patient is at risk of developing heart disease. This predictive approach enhances early detection and preventive healthcare, ensuring more accurate and data-driven medical insights.</p>


## 6. Features 
<p><strong>1. Blockchain-Based Storage:</strong>The platform uses blockchain technology to store all case details and forensic actions in a secure, immutable ledger. This provides tamper-proof evidence management, ensuring that the integrity of the evidence is maintained, and creating a transparent, auditable record for legal use.</p>

<p><strong>2. Early Detection & Preventive Care:</strong> By identifying at-risk individuals early based on family history and clinical factors, the system facilitates timely medical interventions and promotes better long-term health outcomes.</p>

<p><strong>3. Data Integrity:</strong> The system ensures data integrity by leveraging blockchain’s immutable ledger. Once patient data is stored, it cannot be altered or deleted, providing a reliable and tamper-proof record of health information. This guarantees that the multi-generational medical history used for heart disease prediction remains authentic, traceable, and verifiable, which is critical for accurate diagnosis and legal compliance.</p>

<p><strong>4.Real-Time Data Retrieval & Prediction:</strong> The system retrieves stored patient data from the blockchain and instantly generates heart disease risk predictions, streamlining the process for healthcare providers.</p>


## 7. Directory Structure
<p><strong>Steps to Deploy Smart Contracts to Ganache Using Truffle:</strong></p>

<p><strong>1. Download Node.js:</strong> Visit the official site: <a href="https://nodejs.org/" target="_blank">https://nodejs.org/</a></p>

<p><strong>2. Install Node.js:</strong> Follow the setup wizard and ensure the "Add to PATH" option is checked.</p>

<p><strong>3. Verify Installation:</strong> Open Command Prompt (cmd) or PowerShell and run:</p>

<pre>
node -v  # Check Node.js version
npm -v   # Check npm version
</pre>

<img src="https://github.com/bharani33/GeneticDiseasePrediction/blob/main/images/nodeinstall.png?raw=true" alt="Image Alt Text" width="500">
<p><strong>1. Install Truffle Globally:</strong></p>
<pre>npm install -g truffle</pre>

<p><strong>2. Verify Truffle Installation:</strong></p>
<pre>truffle version</pre>

<img src="https://github.com/bharani33/GeneticDiseasePrediction/blob/main/images/truffle.png?raw=true" alt="Image Description" width="500">
<p><strong>1. Steps to Create a Truffle Project:</strong></p>

<p><strong>2. Navigate to the D: drive:</strong></p>
<pre>cd /d D:</pre>

<p><strong>3. Change directory to truffle:</strong></p>
<pre>cd truffle</pre>

<p><strong>4. Create a new project folder named SimpleStorageProject:</strong></p>
<pre>mkdir SimpleStorageProject</pre>

<img src="https://github.com/bharani33/GeneticDiseasePrediction/blob/main/images/truffle1.png?raw=true" 
     alt="Screenshot" width="500">
<p><strong>5. Initialize a new Truffle project:</strong></p>
<pre>truffle init</pre>

<img src="https://github.com/bharani33/GeneticDiseasePrediction/blob/main/images/truffle2.png?raw=true" 
     alt="Screenshot" width="500">
     
<img src="https://github.com/bharani33/GeneticDiseasePrediction/blob/main/images/folders.jpg?raw=true" 
     alt="Screenshot" width="500">
<p><strong>6. Compile the Contract:</strong></p>
<pre>truffle compile</pre>

<img src="https://github.com/bharani33/GeneticDiseasePrediction/blob/main/images/truffle3.png?raw=true" 
     alt="Screenshot" width="500">
<p><strong>Deploy to Ganache:</strong></p>
<pre>truffle migrate --network development</pre>

<img src="https://github.com/bharani33/GeneticDiseasePrediction/blob/main/images/truffle4.png?raw=true" 
     alt="Screenshot" width="500">
