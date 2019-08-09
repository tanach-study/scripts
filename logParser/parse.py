from dotenv import load_dotenv
import glob
import gzip
import os
import csv

load_dotenv('.env')
LOGS_PATH = os.getenv("LOGS_PATH")

files = glob.glob('{}/*.gz'.format(LOGS_PATH))

lines = []

for i, file in enumerate(files):
    print('Opening file {}...'.format(i))
    with gzip.open(file, 'rb') as f:
        for j, line in enumerate(lines):
            lines.append(line)

with open('out.csv', 'w') as outfile:
    writer = csv.writer(outfile, delimiter=',')
    for row in lines:
        writer.writerow(row)
