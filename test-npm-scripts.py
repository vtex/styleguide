import glob
import json

error = False

for filename in glob.iglob('react/node_modules/**/package.json', recursive=True):
  with open(filename, 'r') as f:
    json_loaded = json.load(f)
    if ('scripts' in json_loaded):
      scripts = json_loaded['scripts']
      if (('preinstall' in scripts) or ('install' in scripts) or ('postinstall' in scripts)):
        print('{} has (pre|post)?install scripts'.format(filename))
        error = True

if (error):
  print('not ok')
  exit(-1)

print('ok')
    
