import os
import pandas as pd
from dotenv import load_dotenv
from pymongo import MongoClient, UpdateOne

load_dotenv('.env')
DB_STRING = os.getenv("DB_STRING")

client = MongoClient(DB_STRING)
db = client.ts
perakim_collection = db.perakim
sefarim_collection = db.books

perakim = pd.read_csv("./perakim.csv", na_filter=False)

update_perakim_list = []
update_sefarim_list = []

for i, row in perakim.iterrows():
    s = row['Sefer'].lower()
    p = row['Perek'].lower()
    title = row['Title']
    if p.isdigit():
        if title != "":
            update_perakim_list.append(UpdateOne({ "book_name": s, "perek_id": int(p) }, { "$set": { "perek_title": title }} ))
            update_sefarim_list.append(UpdateOne({ "seferMeta.book_name": s, "allPerakim.perek_id": int(p) }, { "$set": { "allPerakim.$.perek_title": title }} ))
    else:
        print s, p, title, "FALSE"

perakim_result = perakim_collection.bulk_write(update_perakim_list)
sefarim_result = sefarim_collection.bulk_write(update_sefarim_list)
print perakim_result.bulk_api_result
print sefarim_result.bulk_api_result
