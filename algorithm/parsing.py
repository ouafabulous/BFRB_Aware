import json

input_file_path = "raw_data.log"
output_file_path = "parsed_raw_data.json"

parsed_data = []
with open(input_file_path, 'r') as file:
    for line in file:
        if '[SENSORS_SYNC][sample]' in line:
            values = line.split()
            x = int(values[1][2:])
            y = int(values[2][2:])
            z = int(values[3][2:])
            parsed_data.append({'x': x, 'y': y, 'z': z})

with open(output_file_path, 'w') as output_file:
    json.dump(parsed_data, output_file)

print("Data successfully parsed and saved in JSON format.")