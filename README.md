# 🌍 Sustainable Supply Chain Verification System 🚀

## 📌 Project Overview  
🔎 This project is designed to **ensure supply chain transparency** by **verifying the authenticity of manufacturer certifications**. Many companies claim to follow **sustainability, ethical sourcing, and safety standards**, but there is often **no reliable way** for consumers or businesses to **verify these claims**.

To solve this, our system **automates certification verification** using the following technologies:

## 🔗 Key Features  

### ✅ **Automated Certification Verification (Web Scraping + AI)**  
We fetch real-time certification data from official sources using **Selenium**:
- [FSSC 22000](https://www.fssc22000.com) – Food Safety Management Certification
- [Rainforest Alliance](https://www.rainforest-alliance.org) – Sustainable & Ethical Sourcing
- [ISCC](https://www.iscc-system.org) – Renewable & Sustainable Certification
- [ECOCERT](https://www.ecocert.com) – Organic & Fair Trade Certification
- [Non-GMO Project](https://www.nongmoproject.org) – GMO-free Product Verification
- [SA8000](https://www.sa-intl.org/programs/sa8000) – Social Accountability for Ethical Labor

### ✅ **🔗 Blockchain-Powered Certification Storage**  
- **Web3.js, Solidity, IPFS, Infura API** securely store certification data on **Ethereum blockchain**, preventing fraud.
- Certification documents are uploaded to **IPFS (InterPlanetary File System)** for **decentralized storage**.
- Smart contracts deployed on **Sepolia Testnet** link records immutably.

### ✅ **🤖 AI-Powered Chatbot**  
- 💬 **NLP Chatbot (FastAPI + Firebase)** assists users in **real-time verification** of product certifications.
- Fine Tuned and Powered by *Gemini-Api*

### ✅ **🔐 Firebase Authentication & Storage**  
- **Google Authentication** secures access for producers.
- **Firebase Firestore** stores certification hashes for fast lookup.

### ✅ **📜 QR Code Authentication & Trust Score**  
- 🌍 **QR Code for every verified product** (scan to retrieve certification details)
- 🏆 **Trust Score assigned based on**:
  - Number of certifications 
  - Authenticity of blockchain records
  - Sustainability & ethical sourcing compliance

---

## 🏗️ Tech Stack  

### 🎨 **Frontend**  
- ⚛️ **React.js** (Dynamic UI)
- 🎨 **Tailwind CSS** (Modern styling)
- 🌐 **HTML5 & JavaScript** (Core frontend technologies)

### ⚡ **Backend & APIs**  
- 🚀 **FastAPI** (High-performance Python backend)
- ☁️ **Google Cloud Studio** (Fetches external certification data)
- 🔥 **Firebase Firestore** (Stores certification & product data)
- 🔑 **Google Authentication** (Producer login security)

### 🤖 **AI Chatbot System**  
- 💬 **AI-powered NLP chatbot** (Real-time product verification)
- 📄 **Firebase chat storage** (Logs user interactions)

### 🔍 **Web Scraping & Certification Verification**  
- 🤖 **Selenium** (Automated certification lookup on official websites)
- ✅ **Automated Verification** (Cross-checks certification details)

### 🔗 **Blockchain & Web3**  
- 🛠️ **Web3.js** (Smart contract interaction)
- 🏦 **Solidity** (Smart contracts for certification storage)
- 🌍 **IPFS (Decentralized storage)**
- 📡 **Infura API** (Ethereum node connection)
- 🦊 **MetaMask** (Wallet integration for tracking blockchain transactions)

---

## 🛠️ Installation Guide  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
