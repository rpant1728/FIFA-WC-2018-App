import json

with open("../teams.json","r") as f:
  data = f.read()

d = json.loads(data)

tabs = "    "

with open("../ImageMaps/CoachImageMaps.js", "w") as f:
    f.write("import React from " + """'""" + "react" + """'""" + ";" + "\n")
    f.write("import App from " """'""" + "./App.js" + """'""" + ";" + "\n\n") 
    f.write("export const CoachImageMaps = {" + "\n")
    for i in range(len(d)):
        if "Iran" in d[i]['country']:
            country = "Iran"
            f.write(tabs + """'""" + d[i]['coach']['name'] + """'""" + " : require(" + """'""" + "../static/img/teams/" + country + "/coach/" + d[i]['coach']['name'].lower().replace(" ", "") + ".jpg" + """'""" + ")," + "\n")
        else:
            f.write(tabs + """'""" + d[i]['coach']['name'] + """'""" + " : require(" + """'""" + "../static/img/teams/" + d[i]['country'].replace(" ", "") + "/coach/" + d[i]['coach']['name'].lower().replace(" ", "") + ".jpg" + """'""" + ")," + "\n")
    f.write("}")