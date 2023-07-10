import json
import sys
import re


def extract_position(c: str) -> int:
    pattern = fr'{c}:-?(\d+)'
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
            x = extract_position('x')
            y = extract_position('y')
            z = extract_position('z')
            parsed_position.append({'x': x, 'y': y, 'z': z})
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

print(f"Data successfully parsed and saved in JSON format in files\n{output_heart_rate}\n{output_position}")
