from dotenv import load_dotenv
import glob
import gzip
import os
from cloudfront_log_parser import parse

load_dotenv('.env')
LOGS_PATH = os.getenv("LOGS_PATH")

files = glob.glob(f'{LOGS_PATH}/*.gz')

requests = 0
print(len(files))
for i, file in enumerate(files):
    print(f'Opening file {i}...')
    with gzip.open(file, 'rb') as f:
        file_content = f.read()
        lines = file_content.decode('utf-8').split('\n')
        # print(len(lines))
        for j, line in enumerate(lines):
            # print(f'Reading line {j}')
            # print(line)
            if '/archives' in line:
                requests += 1
    # print(f'Number of requests: {requests}')
print(f'Number of requests: {requests}')
