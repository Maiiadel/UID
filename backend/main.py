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
    allow_origins=origins,
    # allow_origins=["*"],
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


class Project(BaseModel):
    user_id: str
    name: str
    description: str


class UploadedFiles(BaseModel):
    user_id: str
    project_: str
    files: dict


class DeletedProject(BaseModel):
    user_id: str
    project_id: str


class DeletedFile(BaseModel):
    user_id: str
    project_id: str
    file_name: str


# Get from MyProfile Page to display all projects of a single user
@app.post("/user/{uid}")
async def get_user(uid: str):
    print("get_user is activated!")
    data = getUser(uid)
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


# # Get from MyProfile Page to display all projects of a single user
# @app.post("/user/{uid}")
# async def get_user_type(uid: str):
#     print("get_users is activated!")
#     data = getUserType()
#     print(data)
#     return data


# Delete specific project of a single user
@app.delete("/single_file/")
async def delete_file(deleted_file: DeletedFile):
    deletedFile_data = {
        "user_id": deleted_file.user_id,
        "project_id": deleted_file.project_id,
        "file_name": deleted_file.file_name,
    }
    print("delete_file is activated!")
    user_id = deletedFile_data["user_id"]
    project_id = deletedFile_data["project_id"]
    file_name = deletedFile_data["file_name"]
    print(f"user id in delete_file backend = {user_id}")
    print(f"project_id id in delete_file backend = {project_id}")
    print(f"file_name in delete_file backend = {file_name}")
    data = delete_file(deleted_file)
    print(data)
    return {"data": data}


# Add project for specific user with his/her user_id
# @app.post("/generate_use_case_with_file")
# async def generate_use_case_with_file(user_id: str, user_name: str, project_id: str, project_name: str, file_url_reference: str, file_name: str):
#     print("generate_use_case_with_file is activated!")
#     print(f"user id in generate_use_case_with_file backend = {user_id}")
#     print(f"project_id id in generate_use_case_with_file backend = {project_id}")
#     file_data = {
#         "user_id": user_id,
#         "user_name": user_name,
#         "project_id": project_id,
#         "project_name": project_name,
#         "file_url_reference": file_url_reference,
#         "file_name": file_name,
#     }
#     data = generate_use_case(file_data)
#     print(f"data inside main file = {data}")
#     return {"data": data}


# Get from MyProfile Page to display all projects of a single user
@app.get("/items")
async def get_items():
    print("get_items is activated!")
    data = getItems()
    print(data)
    return {"data": data}


@app.post("/signup")
def signup(user: User):
    try:
        user_data = {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "password": user.password,
            "role": user.role,
        }
        # print(user_data)
        response = add_user(user_data)
        if response == "UserAlreadyExists":
            print("User already exists")
            return "UserAlreadyExists"
        else:
            print(response)
            return response
    except HTTPException:
        print("Format is not right!")
    return True
