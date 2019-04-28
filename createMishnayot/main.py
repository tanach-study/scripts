import os
import pandas as pd
from dotenv import load_dotenv
from pymongo import MongoClient, UpdateOne

load_dotenv('.env')
DB_STRING = os.getenv("DB_STRING")

client = MongoClient(DB_STRING)
db = client.ts
coll = db.newPerakim

zeraim = pd.read_csv("./zeraim.csv", na_filter=False)
# moed = pd.read_csv("./moed.csv", na_filter=False)
# nashim = pd.read_csv("./nashim.csv", na_filter=False)
# nezikin = pd.read_csv("./nezikin.csv", na_filter=False)
# kadashim = pd.read_csv("./kadashim.csv", na_filter=False)
# taharot = pd.read_csv("./taharot.csv", na_filter=False)

updates = []

for i, row in zeraim.iterrows():
    s = row['Seder'].lower()
    m = row['Masechet'].lower().replace(' ', '-')
    per = int(row['Perek'].lower())
    mish = int(row['Mishna'].lower())
    title = row['Title']
    if title != "":
        updates.append(UpdateOne({ 
            "division": "mishna",
            "segment": s,
            "section": m,
            "unit": per,
            "part": mish,
        }, { "$set": { "part_title": title }} ))

result = coll.bulk_write(updates)
print result
