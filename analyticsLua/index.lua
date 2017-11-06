requests = require('requests')
response = requests.get('http://httpbin.org/get')
print(response.status_code)

response = requests.post{url = 'http://httpbin.org/post', data='random data'}
json_data = response.json()
print(json_data.data)
