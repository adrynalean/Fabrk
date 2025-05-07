# Thred 🧵

Thred is a sleek, full-stack chatbot interface built on top of Meta's LLaMA 3.2-3B model. It offers a smooth user experience with animated UI transitions and a clean API integration powered by FastAPI.

![Thred Preview]
![image](https://github.com/user-attachments/assets/1987462c-9371-4f34-b26f-ffa17fdac0c2)


## ✨ Features

- 🎨 Animated React frontend with typing indicator and timestamp reveal  
- 🧠 Backend API powered by LLaMA 3.2-3B via HuggingFace Transformers  
- 🔐 Secrets handled securely using `.env`  
- ⚡ Fast message streaming and async request handling  
- 🎯 Prompt-response flow tested for both factual and conversational prompts  
- 🧼 Clean repo history with GitHub push protection compliance  

## 🧰 Tech Stack

- **Frontend**: React, CSS, Axios  
- **Backend**: FastAPI, Transformers (HuggingFace), Torch  
- **Model**: Meta LLaMA 3.2-3B  
- **Deployment**: Localhost or remote server with SSH tunneling  

## 🚀 Getting Started

### Backend
1. Create a virtual environment  
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Add your HuggingFace token in a `.env` file:
   ```
   HF_TOKEN=your_token_here
   ```
4. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd llama-chat
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm start
   ```

## 🧪 Evaluation

Thred was evaluated using manually crafted prompts spanning factual, arithmetic, and conversational domains. Outputs were analyzed for correctness, fluency, and response latency. API stability and UI responsiveness were tested across multiple runs to ensure smooth user interaction.

## 👥 Team Contributions

| Name            | Contributions |
|-----------------|----------------|
| **Sashit Vijay** | Designed frontend, integrated backend API, handled repo cleanup and deployment, led rebranding from Fabrk to Thred. |
| **Nathan Komenkul** | Developed API server, established SSH tunneling for remote calls, managed asynchronous backend communication. |
| **Aprajita Gupta** | Fine-tuned the LLM using Alpaca-cleaned dataset and LoRA, handled training configuration, prompt formatting, and result validation. |

## 📄 License

This project is for academic/research use only.

---

Made with 💬 by Team Thred
