from databaseStructure import *


class User:
    def __init__(
        self,
        user_id="",
        first_name="",
        last_name="",
        email="",
        user_type="",
        address="",
        contact_number="",
        Total_elec_bills="",
        Total_subs="",
        Total_water_bills="",
    ):
        self.user_id = user_id
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.user_type = user_type
        self.address = address
        self.contact_number = contact_number
        self.Total_elec_bills = Total_elec_bills
        self.Total_subs = Total_subs
        self.Total_water_bills = Total_water_bills

    def add_user(self):
        # needs to email & first_name & last_name & role
        data = {
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "role": self.role,
        }
        # Add the user to the AuthenticationManager
        try:
            new_user = auth.create_user(email=self.email, password=self.password)
        except ValueError:
            return "Password must be more than or equal to 6 characters"
        except firebase_admin._auth_utils.EmailAlreadyExistsError:
            return "UserAlreadyExists"

        # Add the user to Cloud firestore
        db.collection("users").document(new_user.uid).set(data)
        return "User Added"

    def get_users_data(self):
        docs = db.collection("users").get()
        users = []
        for user in docs:
            # print(user.to_dict())
            users.append(user.to_dict())
        # users = docs.to_dict()
        return users

    def get_user_data_by_email(self):
        # needs user_id only
        self.user_id = self.get_user_id_by_email()
        doc = db.collection("users").document(self.user_id).get()
        print(doc)
        if doc.exists:
            print(f"Document data: {doc.to_dict()}")
        else:
            print("No such document!")

        data = {}
        data[doc.id] = doc.to_dict()
        print(data)
        return data

    def get_user_data_by_id(self):
        # needs user_id only

        doc = db.collection("users").document(self.user_id).get()
        print(doc)
        if doc.exists:
            print(f"Document data: {doc.to_dict()}")
        else:
            print("No such document!")

        data = {}
        data[doc.id] = doc.to_dict()
        print(data)
        return data

    def get_user_id_by_email(self, email=""):
        # needs email only
        self.email = self.email.replace("%40", "@")
        docs = db.collection("users").where("email", "==", self.email).get()
        for doc in docs:
            self.user_id = doc.id
        return self.user_id

    def get_user_bills(self):
        collections = db.collection("users").document(self.user_id).collections()
        data = {}
        for collection in collections:
            print(collection)
            for doc in collection.stream():
                data[doc.id] = doc.to_dict()
        return data


# user = User(email="kirolosyassa2017@gmail.com")
# print(user.get_user_bills())
