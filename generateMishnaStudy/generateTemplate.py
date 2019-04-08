import os
import csv

counts = []

with open('./mishna_count.csv', 'r') as datafile:
    csv_data = csv.reader(datafile)
    for row in csv_data:
        counts.append(row)

counts.pop(0)

with open('template.csv', 'w') as outfile:
    writer = csv.writer(outfile, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    writer.writerow(['Seder', 'Masechet', 'Perek', 'Mishna', 'Title', 'Teacher', 'Duration'])
    for row in counts:
        seder = row[0]
        masechet = row[1]
        chapter_counts = row[2:]
        for i, count in enumerate(chapter_counts):
            chapter = i + 1
            if count:
                for j in range(int(count)):
                    mishna = j + 1
                    writer.writerow([seder, masechet, chapter, mishna, '', '', ''])
