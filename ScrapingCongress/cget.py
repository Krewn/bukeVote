#                                     $$$$$$$\   $$\               
#                                     $$  __$$\       |$$| |$$|          
#                                     $$ |  $$ | |$$\  $$|  $$|  $$$$$$$\ 
#                                     $$$$$$$\ |  $$|  $$|  $$| $$  _____|
#                                     $$  __$$\   $$|  $$|  $$| \$$$$$$\  
#                                     $$ |  $$ |  $$|  $$|  $$|  \____$$\ 
#                                     $$$$$$$  |  $$|  $$|  $$| $$$$$$$  |
#                                     \_______/   __|  __|  __| \_______/ 

from cssselect import GenericTranslator, SelectorError
def selector():
	try:
		expression = GenericTranslator().css_to_xpath('div.content')
	except SelectorError:
		print('Invalid selector.')

# Sample Bill		

import urllib
from lxml import html

def versionTree(_root):
	page = html.fromstring(urllib.urlopen(_root).read())
	for link in page.xpath("//a"):
		print "Name", link.text, "URL", link.get("href")

print(versionTree())
	
#data = {n : f.read() for n in }
#pickle.dump(data,"theBills.json")