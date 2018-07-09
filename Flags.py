import sys, re, os, selenium
from time import sleep
from urllib.request import urlopen, urlretrieve
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
from selenium import webdriver

baseURL = "https://www.fifa.com/worldcup/teams/"
flag_dir = "WC-App/img/"
options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(firefox_options=options)
driver.get(baseURL)

flags = driver.find_elements(By.CSS_SELECTOR, ".fi-flag--5")
names = driver.find_elements(By.CSS_SELECTOR, ".fi-team-card__name")

for flag, name in zip(flags, names):
    urlretrieve(flag.get_attribute("src"), flag_dir+name.text.title()+".png")

