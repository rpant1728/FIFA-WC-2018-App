import json

with open("../teams.json","r") as f:
  data = f.read()

d = json.loads(data)

tabs = "    "

with open("../Screens/PlayerImageMaps.js", "w") as f:
    f.write("import React from " + """'""" + "react" + """'""" + ";" + "\n")
    f.write("import App from " """'""" + "../App.js" + """'""" + ";" + "\n\n") 
    f.write("export const PlayerImageMaps = {" + "\n")
    for i in range(len(d)):
        if "Iran" in d[i]['country']:
            country = "Iran"
            for player in d[i]['players']:
                f.write(tabs + """'""" + player['name'] + """'""" + " : require(" + """'""" + "./static/img/teams/" + country + "/players/" + player['name'].lower().replace(" ", "") + ".jpg" + """'""" + ")," + "\n")
        else:
            for player in d[i]['players']:
                f.write(tabs + """'""" + player['name'] + """'""" + " : require(" + """'""" + "./static/img/teams/" + d[i]['country'].replace(" ", "") + "/players/" + player['name'].lower().replace(" ", "") + ".jpg" + """'""" + ")," + "\n")
    f.write("}")