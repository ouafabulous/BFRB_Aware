from datetime import datetime

timestamp_str = '2023-07-10 16:09:10.274'
timestamp_format = '%Y-%m-%d %H:%M:%S.%f'

timestamp = datetime.strptime(timestamp_str, timestamp_format)
epoch = int(timestamp.timestamp())

print(epoch)
