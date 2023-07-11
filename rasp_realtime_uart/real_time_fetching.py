import argparse
import os
import time
from datetime import datetime
from windy.tools.device.dut import DUT


def save_to_file(data):
    if not data:
        return
    utc = int(time.time())
    filename = 'log/{}.log.wip'.format(utc)

    with open(filename, 'w') as f:
        read_utc = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S.')
        line_data = data.split('\r\n')
        timestamp_width = int(1000 / len(line_data))
        for i, line in enumerate(line_data):
            timestamp = read_utc + '{:0>3}'.format(timestamp_width * i)
            f.write('[{}] '.format(timestamp) + line + '\r\n')
    new_file, ext = os.path.splitext(filename)
    os.renames(filename, new_file)


if __name__ == '__main__':

    parser = argparse.ArgumentParser(prog='readrealtime')
    parser.add_argument('-p', '--port', type=str, help='None')

    args = parser.parse_args()
    dut = DUT('hwa09', port=args.port)

    while True:
        r, t = dut.get_result(1000)
        save_to_file(t)
