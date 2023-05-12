import os
import firebase_admin
from firebase_admin import credentials, storage, firestore, auth
from google.cloud import storage
from google.oauth2 import service_account


credential_path = os.path.dirname(__file__) + "/serviceAccountKey.json"
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = credential_path


cred = credentials.Certificate(credential_path)
firebase_admin.initialize_app(
    cred, {"storageBucket": "invoice-system-45199.appspot.com"}
)
firestore_client = firestore.client()

# Initialize a client
db = firestore.client()
