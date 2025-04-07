import os
import torch
from dotenv import load_dotenv
from transformers import AutoTokenizer, AutoModelForCausalLM

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import asyncio
from concurrent.futures import ThreadPoolExecutor

# Load Hugging Face token from .env
load_dotenv()
access_token = os.getenv("HF_TOKEN")

model_name = 'meta-llama/Llama-3.2-3B'

tokenizer = AutoTokenizer.from_pretrained(model_name, token=access_token)
tokenizer.pad_token = tokenizer.eos_token
model = AutoModelForCausalLM.from_pretrained(model_name, token=access_token)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    prompt: str
    max_length: int = 50

def generate_response(prompt, max_length=50):
    inputs = tokenizer(prompt, return_tensors="pt", padding=True)
    input_ids = inputs.input_ids.to(device)
    attention_mask = inputs.attention_mask.to(device)
    output_ids = model.generate(input_ids, attention_mask=attention_mask, max_length=max_length)
    generated_ids = output_ids[0][inputs.input_ids.shape[-1]:]
    response = tokenizer.decode(generated_ids, skip_special_tokens=True)
    return response

executor = ThreadPoolExecutor(max_workers=4)

@app.post("/generate")
async def generate_response_api(query: Query):
    loop = asyncio.get_event_loop()
    response = await loop.run_in_executor(executor, generate_response, query.prompt, query.max_length)
    return {"response": response}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
