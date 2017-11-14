# 18-MongoDB
(finished 90% Completed) Using Request/cheerio npm to grab data from FiveThirtyEight Website and save or delete the data and save comments to an article

2 Known issue (medium concern):
  - The initial onclick for scrap articles does not wait for promise function to complete before sending data via ajax to be displayed.
      If there is data already saved, it does only require 1 onpress.
  - Comments would not populate to the requested array in articles collections, this code does not have the latest attempt to correct the         issue, however I may attempt it again at a later date.      

![untitled](https://user-images.githubusercontent.com/12276056/32536332-0d07c33a-c42c-11e7-8126-9b4955f8679f.png)
