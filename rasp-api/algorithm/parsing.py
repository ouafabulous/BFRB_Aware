import json
import sys
import re
from datetime import datetime


def extract_data(data: str, line: str) -> int:
    if data == "heart_rate":
        pattern = r"display: (\d+)"
    elif data == "timestamp":
        pattern = r'\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d+'
    else:
        pattern = fr'{data}:-?(\d+)'
    match = re.search(pattern, line)
    if match:
        if data == "timestamp":
            timestamp = datetime.strptime(match.group(), '%Y-%m-%d %H:%M:%S.%f')
            return int(timestamp.timestamp())
        else:
            return int(match.group().split(':')[1])
    else:
        return None


def parse_data(input_file_path: str):
    parsed_position = []
    parsed_heart_rate = []
    with open(input_file_path, 'r') as file:
        for line in file:
            if '[SENSORS_SYNC][sample]' in line:
                t = extract_data('timestamp', line)
                x = extract_data('x', line)
                y = extract_data('y', line)
                z = extract_data('z', line)
                if x is None or y is None or z is None or t is None:
                    continue
                parsed_position.append({'timestamp': t, 'x': x, 'y': y, 'z': z})
            elif '[HR_MEASURE][CONTINUOUS]' in line:
                t = extract_data('timestamp', line)
                heart_rate = extract_data('heart_rate', line)
                if t is None or heart_rate is None:
                    continue
                parsed_heart_rate.append({'timestamp': t, 'hr': heart_rate})

    return {
        "positions": parsed_position,
        "hrs": parsed_heart_rate
    }


if __name__ == "__main__":
    input_file_path = sys.argv[1]

    # Check if the file name is provided as an argument
    if len(sys.argv) < 2:
        print("Please provide the file name to parse as an argument.")
        sys.exit(1)

    data = parse_data(input_file_path)
    hrs, positions = data.values()

    output_heart_rate = f"./json_outputs/heart_rate_{input_file_path.split('.')[0].split('/')[-1]}.json"
    output_position = f"./json_outputs/position_{input_file_path.split('.')[0].split('/')[-1]}.json"

    with open(output_position, 'w') as output_file:
        json.dump(positions, output_file)

    with open(output_heart_rate, 'w') as output_file:
        json.dump(hrs, output_file)
    print(f"Data successfully parsed and saved in JSON format in files\n{output_heart_rate}\n{output_position}")
