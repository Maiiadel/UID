from databaseStructure import *


class Project:
    def __init__(
        self, user_id, project_id="", project_name="", description="", files=None
    ):
        self.project_name = project_name
        self.project_id = project_id
        self.user_id = user_id
        self.description = description
        self.files = files

    def get_multiple_projects(self):
        # needs user_id only
        collections = db.collection("users").document(self.user_id).collections()
        data = {}
        for collection in collections:
            for doc in collection.stream():
                data[doc.id] = doc.to_dict()
        return data

    def get_single_project(self):
        # needs user_id & project_id
        user = User(user_id=self.user_id)
        user_name = user.get_user_data()
        collections = db.collection("users").document(self.user_id).collections()

        data = {}
        for collection in collections:
            for doc in collection.stream():
                # print(f"doc.id inside database file = {doc.id}")

                if doc.id == self.project_id:
                    print(f"doc.to_dict() inside database file = {doc.to_dict()}")

                    data[doc.id] = doc.to_dict()
                    data[doc.id]["user_name"] = user_name[self.user_id]["first_name"]
                    data[doc.id]["project_id"] = doc.id
                    break

        return data

    def add_single_project(self):
        # needs user_id & project_id & description & project_name
        initial_project_data = self.get_initial_project_data()
        db.collection("users").document(self.user_id).collection("projects").add(
            initial_project_data
        )
        return "Project Added"

    def get_initial_project_data(self):
        project_data = {
            "user_id": self.user_id,
            "project_name": self.project_name,
            "description": self.description,
        }
        return project_data

    def delete_single_project(self):
        # needs user_id & project_id
        print("Deleting project in database file")

        print(f"user id in delete_project database file = {self.user_id}")
        print(f"project_id id in delete_project database file = {self.project_id}")

        # First delete the project from Firebase Firestore
        p_ref = (
            db.collection("users")
            .document(self.user_id)
            .collection("projects")
            .document(self.project_id)
            .delete()
        )

        return p_ref
