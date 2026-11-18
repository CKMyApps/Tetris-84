from pathlib import Path
from html.parser import HTMLParser
import json,re
from PIL import Image
root=Path(__file__).resolve().parent.parent
class Tags(HTMLParser):
 def __init__(self):super().__init__();self.ids=set();self.refs=[]
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  if 'id' in d:
   assert d['id'] not in self.ids, 'duplicate element ID: '+d['id'];self.ids.add(d['id'])
  if tag in ('script','link','img'):
   uri=d.get('src') or d.get('href')
   if uri and not uri.startswith(('http:','https:')):self.refs.append(uri)
parser=Tags();parser.feed((root/'index.html').read_text());print('Unique element IDs:',len(parser.ids))
for ref in parser.refs:
 assert (root/ref).is_file(),ref
print('Resolved static asset paths:',parser.refs)
m=json.loads((root/'manifest.webmanifest').read_text());assert m['start_url']=='./index.html'
for icon in m['icons']:
 p=root/icon['src'];assert p.exists();assert Image.open(p).size==tuple(map(int,icon['sizes'].split('x')))
print('Manifest and icon dimensions OK')
for p in ('app.js','engine.js'):
 s=(root/p).read_text();assert '\x00' not in s
print('Static checks PASS')
