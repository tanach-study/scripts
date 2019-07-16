import os
from dotenv import load_dotenv
from read_audio_files import get_mishnayot_from_files_at_path, write_mishnayot_to_csv_file
from add_mishna_titles import run as add_mishna_titles

def run():
    load_dotenv('.env')
    FILE_PATH = os.getenv('FILE_PATH')

    mishnayot = get_mishnayot_from_files_at_path(FILE_PATH)
    file_name = './titles.csv'
    write_mishnayot_to_csv_file(mishnayot, file_name)
    
    files = [file_name]
    result = add_mishna_titles(files)

    return result

if __name__ == '__main__':
    result = run()
    print(result)
