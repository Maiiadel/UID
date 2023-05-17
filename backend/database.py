from databaseClasses.Project import Project
from databaseClasses.User import User
from databaseClasses.UnitCost import UnitCost


def getUser(uid):
    user = User(user_id=uid)
    return user.get_user_data_by_id()


def getUnitCosts():
    costs = UnitCost()
    return costs.get_unit_costs()


def getUsers():
    user = User()
    return user.get_users_data()


def delete_specific_project(deleted_project):
    project = Project(
        user_id=deleted_project["user_id"], project_id=deleted_project["project_id"]
    )
    time_deletion_of_project = project.delete_single_project()
    return time_deletion_of_project


def add_file_to_project(file_data):
    project = Project(user_id=file_data["user_id"], project_id=file_data["project_id"])
    file_reference = project.add_file_to_project(file_data)
    return file_reference


def add_user(user_data):
    new_user = User(
        email=user_data["email"],
        first_name=user_data["first_name"],
        last_name=user_data["last_name"],
        role=user_data["role"],
    )
    response_on_creating_user = new_user.add_user()
    return response_on_creating_user


def get_subcollection_projects(user_id):
    projects_of_user = Project(user_id=user_id)
    data = projects_of_user.get_multiple_projects()
    return data


def get_specific_project(user_id, project_id):
    project = Project(user_id=user_id, project_id=project_id)
    data = project.get_single_project()
    return data


def add_single_project(user_id, project_name, description):
    new_project = Project(
        user_id=user_id, project_name=project_name, description=description
    )
    response = new_project.add_single_project()
    return response


# user = User(email="kirolosyassa2017@gmail.com")
# print(user.get_user_data())
