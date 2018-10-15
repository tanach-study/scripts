import os
import pandas as pd
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv('.env')
DB_STRING = os.getenv("DB_STRING")

client = MongoClient(DB_STRING)
db = client.ts
perakim_collection = db.perakim

perakim = pd.read_csv("./perakim.csv")

for i, row in perakim.iterrows():
    s = row['Sefer'].lower()
    p = int(row['Perek'])
    title = row['Title']
    print s, p, title
