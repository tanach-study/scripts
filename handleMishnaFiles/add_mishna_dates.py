import os
import pandas as pd
import datetime
from pytz import timezone
from dotenv import load_dotenv
from pymongo import MongoClient, UpdateOne

def create_update_array(files=[]):
    updates = []
    # eastern = timezone('US/Eastern')

    for file in files:
        if os.path.isfile(file):
            rows = pd.read_csv(file, na_filter=False)
            date = datetime.datetime(year=2019, month=9, day=3, hour=4, minute=0, second=0)
            for i, row in rows.iterrows():
                s = row['Seder'].lower()
                m = row['Masechet'].lower().replace(' ', '-')
                per = str(row['Perek'])
                mish = str(row['Mishna'])
                day = row['Day']
                if day != "":
                    date += datetime.timedelta(days=1)
                    print(date)
                updates.append(UpdateOne({ 
                    "division": "mishna",
                    "segment": s,
                    "section": m,
                    "unit": per,
                    "part": mish,
                }, { "$set": { "date": date }} ))
    return updates

def perform_updates(updates=[]):
    load_dotenv('.env')
    DB_STRING = os.getenv('DB_STRING')
    DB_NAME = os.getenv('DB_NAME')

    client = MongoClient(DB_STRING)
    db = client[DB_NAME]
    coll = db.newPerakim
    result = coll.bulk_write(updates)
    return result

# def run(files):
#     updates = create_update_array(files)
#     result = perform_updates(updates)
#     str_result = result.bulk_api_result
#     return str_result

# if __name__ == '__main__':
#     files = [
#         "./zeraim.csv",
#         "./moed.csv",
#         "./nashim.csv",
#         "./nezikin.csv",
#         "./kadashim.csv",
#         "./taharot.csv",
#     ]
#     result = run(files)
#     print(result)
