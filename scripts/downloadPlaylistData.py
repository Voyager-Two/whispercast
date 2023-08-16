from youtubesearchpython import *
import json
import os

playlist = Playlist('https://www.youtube.com/playlist?list=PLrAXtmErZgOdP_8GztsuKi9nrraNbKKp4')

playlistData = json.dumps(playlist.videos)

currentDir = os.getcwd()

with open(currentDir + "/" + "playlistData1.json", "w") as outfile:
  outfile.write(playlistData)

i = 1
while playlist.hasMoreVideos:
  i = i + 1
  playlist.getNextVideos()
  with open(currentDir + "/" + str(i) + "playlistDatax.json", "w") as outfile:
    outfile.write(json.dumps(playlist.videos))
