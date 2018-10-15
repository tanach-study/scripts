import pandas as pd
import pymongo

perakim = pd.read_csv("./perakim.csv")

for i, row in perakim.iterrows():
    s = row['Sefer'].lower()
    p = int(row['Perek'])
    title = row['Title']
    print s, p, title
