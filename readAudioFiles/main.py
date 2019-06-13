import os
import csv
import operator
from dotenv import load_dotenv

load_dotenv('.env')
FILE_PATH = os.getenv('FILE_PATH')

onlyfiles = [f for f in os.listdir(FILE_PATH) if os.path.isfile(os.path.join(FILE_PATH, f))]

mishnayot = []
for file in onlyfiles:
    name, extension = file.split('.')
    replaced = name.replace('-', '_')
    parts = name.split('_')
    masechet = str(parts[0])
    perek = str(parts[1])
    mishna = str(parts[2])
    title = ' '.join(parts[3:])
    pretty_title = title.replace('_', ' ')
    mishnayot.append([masechet, perek, mishna, pretty_title])

mishnayot.sort(key = operator.itemgetter(1, 2))

with open('titles.csv', 'w') as outfile:
    writer = csv.writer(outfile, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    writer.writerow(['Masechet', 'Perek', 'Mishna', 'Title'])
    for row in mishnayot:
        writer.writerow(row)
