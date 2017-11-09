# 18-MongoDB
(finish) Using Request/cheerio npm to grab data from FiveThirtyEight Website and save or delete the data and save comments to an article

1 Known issue (medium concern):
  - The initial onclick for scrap articles does not wait for promise function to complete before sending data via ajax to be displayed.
  - If there is data already saved, it does only require 1 onpress.

![untitled](https://user-images.githubusercontent.com/12276056/32536332-0d07c33a-c42c-11e7-8126-9b4955f8679f.png)
