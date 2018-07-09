import sys, re, os, selenium, time, json
from time import sleep
from urllib.request import urlopen, urlretrieve
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By

options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(firefox_options=options)

matches = list()
team_urls = list()
player_urls = list()

baseURL = "https://www.fifa.com/worldcup/teams/"
baseDir = "teams/"

driver.get(baseURL)

teams = driver.find_elements_by_css_selector(".fi-o-media-object__link")
sleep(2)
for team in teams:
    if team.get_attribute('href') not in team_urls:
        team_urls.append(team.get_attribute('href'))   

for team_url in team_urls:
    driver.get(team_url)
    team_name = driver.find_element_by_css_selector(".fi-th__team__name > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)").text.title()
    players = driver.find_elements_by_css_selector("div.fi-p__info > a.fi-p--link")
    sleep(2)

    d = {}
    d['country'] = team_name
    player_urls = list()
    player_list = list()

    directory = baseDir + team_name
    if not os.path.exists(directory):
        os.makedirs(directory)
    else:
        directory = baseDir + team_name
    coach_dir = os.path.dirname(directory + "/coach/")
    if not os.path.exists(coach_dir):
        os.makedirs(coach_dir)
    else:
        coach_dir = directory + "/coach/"
    player_dir = os.path.dirname(directory + "/players/")
    if not os.path.exists(player_dir):
        os.makedirs(player_dir)  
    else:
        player_dir = directory + "/players/"          

    for player in players:
        if player.get_attribute('href') not in player_urls:
            player_urls.append(player.get_attribute('href')) 
  
    for player_url in player_urls:
        description = dict()
        if "coach" in player_url:
            driver.get(player_url+"/profile")
            coach_name = driver.find_element_by_css_selector(".fi-p__name").text
            count = coach_name.count(" ")
            temp_coach_name = ""
            for i in range(count+1):
                temp_coach_name = temp_coach_name + coach_name.split(" ")[i].title() + " "
            coach_name = temp_coach_name  
            coach_country = driver.find_element_by_css_selector(".fi-p__country").text.title()
            coach_dob = driver.find_element_by_css_selector("div.col-sm-6:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)").text.title()
            paragraphs = driver.find_elements_by_css_selector(".col-sm-10 > p")
            for index, paragraph in enumerate(paragraphs):
                if paragraph.text not in description:
                    description[index] = paragraph.text  
            d['coach'] = {
                'name' : coach_name,
                'country' : coach_country,
                'dob' : coach_dob,
                'age' : 2018 - int(coach_dob.split(" ")[2]),
                'description' : description,
            } 
            coach_image = driver.find_element_by_css_selector(".image-r").get_attribute("xlink:href")
            urlretrieve(coach_image.split("?")[0], directory + "/coach/" + coach_name.lower().replace(" ", "") + ".jpg")

        elif "player" in player_url:
            driver.get(player_url+"/profile")
            player_name = driver.find_element_by_css_selector(".fi-p__name").text
            count = player_name.count(" ")
            temp_player_name = ""
            for i in range(count+1):
                temp_player_name = temp_player_name + player_name.split(" ")[i].title() + " "
            player_name = temp_player_name  
            player_country = driver.find_element_by_css_selector(".fi-p__country").text.title()
            player_role = driver.find_element_by_css_selector(".fi-p__role").text
            player_dob = driver.find_element_by_css_selector(".fi-p__profile-text > span:nth-child(1)").text.title()
            player_height = driver.find_element_by_css_selector("div.col-sm-6:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)").text.lower()
            player_int_caps = driver.find_element_by_css_selector("div.row:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)").text
            player_int_goals = driver.find_element_by_css_selector("div.row:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)").text
            player_age = driver.find_element_by_css_selector("div.col-sm-6:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)").text
            paragraphs = driver.find_elements_by_css_selector(".col-sm-10 > p")
            for index, paragraph in enumerate(paragraphs):
                if paragraph.text not in description:
                    description[index] = paragraph.text  
            player = {
                'name' : player_name,
                'country' : player_country,
                'role' : player_role,
                'dob' : player_dob,
                'height' : player_height,
                'int_caps' : player_int_caps,
                'int_goals' : player_int_goals,
                'age' : player_age,
                'description' : description,
            }
            player_list.append(player)  
            player_image = driver.find_element_by_css_selector(".image-r").get_attribute("xlink:href")
            urlretrieve(player_image.split("?")[0], directory + "/players/" + player_name.lower().replace(" ", "") + ".jpg")
    d['players'] = player_list
    matches.append(d)    

data = json.dumps(matches)
with open("teams.json", "w") as f:
    f.write(data)        




