import base64
import os

fs_dir = os.getenv('TEST_NETWORK_DIR','./basic-network')
config_file_loc = fs_dir + '/config/channel.tx'
config_file = open(config_file_loc, 'rb')
configInb64 = base64.b64encode(config_file.read())
print(configInb64)