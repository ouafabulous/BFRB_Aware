import json
import sys
import re


def extract_data(data: str) -> int:
    if data == "heart_rate":
        pattern = r"display: (\d+)"
    else:
        pattern = fr'{data}:-?(\d+)'
    match = re.search(pattern, line)
    if match:
        x = int(match.group().split(':')[1])
    return x


# Check if the file name is provided as an argument
if len(sys.argv) < 2:
    print("Please provide the file name to parse as an argument.")
    sys.exit(1)

input_file_path = sys.argv[1]
output_heart_rate = f"./json_outputs/heart_rate_{input_file_path.split('.')[0].split('/')[-1]}.json"
output_position = f"./json_outputs/position_{input_file_path.split('.')[0].split('/')[-1]}.json"

parsed_position = []
parsed_heart_rate = []
with open(input_file_path, 'r') as file:
    for line in file:
        if '[SENSORS_SYNC][sample]' in line:
            x = extract_data('x')
            y = extract_data('y')
            z = extract_data('z')
            parsed_position.append({'x': x, 'y': y, 'z': z})
        if '[HR_MEASURE][CONTINUOUS]' in line:
            heart_rate = extract_data('heart_rate')
            parsed_heart_rate.append({'hr': heart_rate})

with open(output_position, 'w') as output_file:
    json.dump(parsed_position, output_file)

with open(output_heart_rate, 'w') as output_file:
    json.dump(parsed_heart_rate, output_file)

print(f"Data successfully parsed and saved in JSON format in files\n{output_heart_rate}\n{output_position}")
