import json
import sys
import re

# Check if the file name is provided as an argument
if len(sys.argv) < 2:
    print("Please provide the file name to parse as an argument.")
    sys.exit(1)

input_file_path = sys.argv[1]
output_heart_rate = f"./json_outputs/heartRate_{input_file_path.split('.')[0].split('/')[-1]}.json"
output_position = f"./json_outputs/position_{input_file_path.split('.')[0].split('/')[-1]}.json"

parsed_position = []
parsed_heart_rate = []
with open(input_file_path, 'r') as file:
    for line in file:
        if '[SENSORS_SYNC][sample]' in line:
            pattern = r'x:-?(\d+)'
            match = re.search(pattern, line)
            if match:
                x = int(match.group().split(':')[1])

            pattern = r'y:-?(\d+)'
            match = re.search(pattern, line)
            if match:
                y = int(match.group().split(':')[1])

            pattern = r'z:-?(\d+)'
            match = re.search(pattern, line)
            if match:
                z = int(match.group().split(':')[1])
            parsed_position.append({'x': x, 'y': y, 'z': z})
            # TODO : need to split and get only number
        if '[HR_MEASURE][CONTINUOUS]' in line:
            pattern = r"display: (\d+)"
            match = re.search(pattern, line)
            if match:
                heart_rate = int(match.group().split(':')[1])
            parsed_heart_rate.append({'hr': heart_rate})

with open(output_position, 'w') as output_file:
    json.dump(parsed_position, output_file)

with open(output_heart_rate, 'w') as output_file:
    json.dump(parsed_heart_rate, output_file)

print("Data successfully parsed and saved in JSON format.")