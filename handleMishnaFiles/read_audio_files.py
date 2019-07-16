import os
import csv
import operator
from dotenv import load_dotenv
from mishna_utils import get_seder_from_masechet

def get_mishnayot_from_files_at_path(path):
    onlyfiles = [f for f in os.listdir(path) if os.path.isfile(os.path.join(path, f))]

    mishnayot = []
    for file in onlyfiles:
        name, extension = file.split('.')
        replaced = name.replace('-', '_')
        parts = replaced.split('_')
        masechet = str(parts[0])
        seder = get_seder_from_masechet(masechet, True)
        perek = str(parts[1])
        mishna = str(parts[2])
        title = ' '.join(parts[3:])
        pretty_title = title.replace('_', ' ')
        mishnayot.append([seder, masechet, perek, mishna, pretty_title])

    mishnayot.sort(key = operator.itemgetter(1, 2))
    return mishnayot

def write_mishnayot_to_csv_file(mishnayot=[], file_name='titles.csv'):
    with open(file_name, 'w') as outfile:
        writer = csv.writer(outfile, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        writer.writerow(['Seder', 'Masechet', 'Perek', 'Mishna', 'Title'])
        for row in mishnayot:
            writer.writerow(row)
    return file_name

if __name__ == '__main__':
    load_dotenv('.env')
    FILE_PATH = os.getenv('FILE_PATH')

    mishnayot = get_mishnayot_from_files_at_path(FILE_PATH)
    file_name = 'titles.csv'
    write_mishnayot_to_csv_file(mishnayot, file_name)
    print(file_name)
