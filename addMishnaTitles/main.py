import os
import pandas as pd
from dotenv import load_dotenv
from pymongo import MongoClient, UpdateOne

load_dotenv('.env')
DB_STRING = os.getenv("DB_STRING")

client = MongoClient(DB_STRING)
db = client.ts
coll = db.newPerakim

# zeraim = pd.read_csv("./zeraim.csv", na_filter=False)
# moed = pd.read_csv("./moed.csv", na_filter=False)
# nashim = pd.read_csv("./nashim.csv", na_filter=False)
# nezikin = pd.read_csv("./nezikin.csv", na_filter=False)
# kadashim = pd.read_csv("./kadashim.csv", na_filter=False)
# taharot = pd.read_csv("./taharot.csv", na_filter=False)

files = [
    "./zeraim.csv",
    "./moed.csv",
    "./nashim.csv",
    "./nezikin.csv",
    "./kadashim.csv",
    "./taharot.csv",
]

updates = []

for file in files:
    if os.path.isfile(file):
        rows = pd.read_csv(file, na_filter=False)
        for i, row in rows.iterrows():
            s = row['Seder'].lower()
            m = row['Masechet'].lower().replace(' ', '-')
            per = int(row['Perek'])
            mish = int(row['Mishna'])
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
