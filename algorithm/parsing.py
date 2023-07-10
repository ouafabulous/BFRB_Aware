import json
import sys

# Check if the file name is provided as an argument
if len(sys.argv) < 2:
    print("Please provide the file name to parse as an argument.")
    sys.exit(1)

input_file_path = sys.argv[1]
output_heart_rate = f"./json_outputs/heartRate_{input_file_path.split('.')[0]}.json"
output_position = f"./json_outputs/position_{input_file_path.split('.')[0]}.json"

parsed_position = []
parsed_heart_rate = []
with open(input_file_path, 'r') as file:
    for line in file:
        if '[SENSORS_SYNC][sample]' in line:
            values = line.split()
            x = int(values[1][2:])
            y = int(values[2][2:])
            z = int(values[3][2:])
            parsed_position.append({'x': x, 'y': y, 'z': z})
        if '[HR_MEASURE][CONTINUOUS]' in line:
            values = line.split()
            hr = int(values[2].split('b')[0])
            parsed_heart_rate.append({'hr': hr})

with open(output_position, 'w') as output_file:
    json.dump(parsed_position, output_file)

with open(output_heart_rate, 'w') as output_file:
    json.dump(parsed_heart_rate, output_file)

print("Data successfully parsed and saved in JSON format.")