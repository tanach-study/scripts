import os
import pandas as pd
from dotenv import load_dotenv
from pymongo import MongoClient, UpdateOne

load_dotenv('.env')
DB_STRING = os.getenv("DB_STRING")

client = MongoClient(DB_STRING)
db = client["ts-prod"]
perakim_collection = db["newPerakim"]

perakim = pd.read_csv("./perakim.csv", na_filter=False)

update_perakim_list = []

for i, row in perakim.iterrows():
    s = row['Sefer'].lower()
    p = row['Perek'].lower()
    title = row['Title']
    if p.isdigit():
        if title != "":
            update_perakim_list.append(UpdateOne({ "section": s, "unit": p }, { "$set": { "unit_title": title }} ))
    else:
        print s, p, title, "FALSE"

perakim_result = perakim_collection.bulk_write(update_perakim_list)
print perakim_result.bulk_api_result
