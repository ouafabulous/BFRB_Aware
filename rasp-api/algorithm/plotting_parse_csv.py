import re
import time
import matplotlib.pyplot as plt
import numpy as np


def fetch_data(filename, with_utc=True):
    if with_utc:
        uart_regex = r'\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3})\] ' \
                     r'\[SENSORS_SYNC\]\[sample\] x:(-?\d+).+y:(-?\d+).+z:(-?\d+)'
    else:
        uart_regex = r'\[SENSORS_SYNC\]\[sample\] x:(-?\d+).+y:(-?\d+).+z:(-?\d+)'

    t, x, y, z = [], [], [], []

    with open(filename, 'r') as f:
        datalines = f.readlines()

    for line in datalines:
        matching = re.search(uart_regex, line)
        if matching:
            if with_utc:
                struc_time = time.strptime(matching.group(1), '%Y-%m-%d %H:%M:%S.%f')
                timestamp = time.mktime(struc_time)
                t.append(int(timestamp))
                x.append(int(matching.group(2)))
                y.append(int(matching.group(3)))
                z.append(int(matching.group(4)))
            else:
                x.append(int(matching.group(1)))
                y.append(int(matching.group(2)))
                z.append(int(matching.group(3)))

    if with_utc:
        t = np.array(t)
        t = t - t[0]
    else:
        t = np.linspace(0, len(x) - 1, len(x))

    assert len(t) != 0, "parsing issues"

    x = np.array(x)
    y = np.array(y)
    z = np.array(z)
    return t,x,y,z

    
def plot_data(t,x,y,z):
    fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2)

    ax1.plot(t, x, label='x')
    ax2.plot(t, y, label='y')
    ax3.plot(t, z, label='z')
    norm = x ** 2 + y ** 2 + z ** 2
    ax4.plot(t, norm, label='norm')
    plt.legend()
    plt.show()
    
def save_data_to_csv(t,x,y,z,filename):
    column_names= 'timestamp, x, y, z'
    data = [d for d in zip(t,x,y,z)]
    np.savetxt('csv/'+filename.split('.')[0].split('/')[-1]+'.csv', data, delimiter=',', header=column_names)


if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser(prog='testplot',
                                     description='This script is for Withings frequency tests.')
    parser.add_argument('-f', '--file', type=str, help='None')

    args = parser.parse_args()
    t, x, y, z = fetch_data(args.file)
    save_data_to_csv(t,x,y,z,args.file)
    


