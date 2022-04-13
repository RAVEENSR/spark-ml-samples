import random
import pandas as pd
import numpy as np

from lyricsgenius import Genius

token = 'your_token'

genius = Genius(token, timeout=30, retries=3)

page = 1
songs = []
while page < 6:
    res = genius.tag('rap', page=page)
    for hit in res['hits']:
        songDetails = [hit['artists'][0], hit['title'], random.randrange(1995, 2020), 'rap',
                       genius.lyrics(song_url=hit['url'])]
        songs.append(songDetails)
    page = res['next_page']

print(len(songs))

arr = np.asarray(songs)
pd.DataFrame(arr).to_csv('Student_dataset.csv', header=['artist_name', 'track_name', 'release_date', 'genre', 'lyrics'])

# filtered_df = pd.read_csv("Mendeley_dataset.csv", usecols=['artist_name', 'track_name', 'release_date', 'genre', 'lyrics'])
# filtered_df.to_csv('Filtered_Mendeley_dataset.csv')

# filtered_df = pd.read_csv("Filtered_Mendeley_dataset.csv")
# student_df = pd.read_csv("Student_dataset.csv")
# merged_df = pd.concat([filtered_df, student_df], ignore_index=True)
# merged_df.to_csv('Merged_dataset.csv')
