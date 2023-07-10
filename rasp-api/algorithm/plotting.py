# Below algorithm plots lines
import sys
import json
import matplotlib.pyplot as plt
import matplotlib
import numpy as np

matplotlib.use('TkAgg')

# Check if the file name is provided as an argument
if len(sys.argv) < 2:
    print("Please provide the JSON file name as an argument.")
    sys.exit(1)

input_file_path = sys.argv[1]

parsed_data = []
with open(input_file_path, 'r') as file:
    parsed_data = json.load(file)

x = [data['x'] for data in parsed_data]
y = [data['y'] for data in parsed_data]
z = [data['z'] for data in parsed_data]

estep = 15
i = np.arange(len(x))
zuplims = (i % estep == 0) & (i // estep % 3 == 0)
zlolims = (i % estep == 0) & (i // estep % 3 == 2)

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.errorbar(x, y, z, 0.2, zuplims=zuplims, zlolims=zlolims, errorevery=estep)

ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')

plt.show()

# ==================================
# Below algorithm only plots dots

# import sys
# import json
# import matplotlib
# import matplotlib.pyplot as plt
# from mpl_toolkits.mplot3d import Axes3D

# matplotlib.use('TkAgg')

# # Check if the file name is provided as an argument
# if len(sys.argv) < 2:
#     print("Please provide the file name to parse as an argument.")
#     sys.exit(1)

# input_file_path = sys.argv[1]

# parsed_data = []
# with open(input_file_path, 'r') as file:
#     parsed_data = json.load(file)

# x = [data['x'] for data in parsed_data]
# y = [data['y'] for data in parsed_data]
# z = [data['z'] for data in parsed_data]

# fig = plt.figure()
# ax = fig.add_subplot(111, projection='3d')
# ax.scatter(x, y, z)

# ax.set_xlabel('X')
# ax.set_ylabel('Y')
# ax.set_zlabel('Z')

# plt.show()
