import sys

name = sys.argv[1]

import os

os.mkdir(name)
os.chdir(name)

a = open(name+".html","w")
a.write('<template name = "'+name+'" >\n\t\n</template>')
a.close()
a = open(name+".css","w")
a.close()
a = open(name+".js","w")
a.write("""
//"""+name+"""
Template."""+name+""".onCreated(function _OnCreated() {

});
Template."""+name+""".events({
	
});
Template."""+name+""".helpers({
	
});

""")

a.close()