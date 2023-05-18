"""
pip install -r requirements.txt

cd .\backend\
python -m uvicorn main:app --reload

"""

from typing import Optional
from fastapi import FastAPI, Path, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from database import *


app = FastAPI()
origins = [
    "http://localhost:4200",
    "http://localhost:4200/",
    "http://127.0.0.1/4200",
    "http://localhost:4200/",
]
app.add_middleware(
    CORSMiddleware,
    # allow_origins=origins,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class User(BaseModel):
    first_name: str
    last_name: str
    email: str
    role: str
    password: str


class Bill(BaseModel):
    user_id: str
    id: str
    type: str
    month: str
    payment_method: str
    cost: int
    usage: int
    due_date: int
    due_amount: float
    status: str


# Get from MyProfile Page to display all projects of a single user
@app.post("/user/{uid}")
async def get_user(uid: str):
    print("get_user is activated!")
    data = getUser(uid)
    print(data)
    return data


# Add new bill to a single client user
@app.post("/add_client_bill/")
async def add_client_bill(new_bill: Bill = None):
    print("add_client_bill is activated!")
    data = addClientBill(new_bill)
    print(data)
    return data


# Get unit costs of electricity and water costs
@app.get("/unit_costs")
async def get_unit_costs():
    print("get_unit_costs is activated!")
    data = getUnitCosts()
    print(data)
    return data


# Get from MyProfile Page to display all projects of a single user
@app.get("/users")
async def get_users():
    print("get_users is activated!")
    data = getUsers()
    print(data)
    return data
