## Project-2

The aim of this project was to create a makeup dashboard that incorporates both back-end data access and front-end visualization that allows clients to be able to view and compare products from Ulta based on price and rating as well as filter the data by category of makeup. An important part of this project was incorporating asynchronous live loading between the database and the dashboard.

In order to create this, the following was done:

# Back-End
  - In Jupyter Notebook, web scrapper was created with beautifulsoup and splinter to scrape bestselling producct urls from Ulta.com within 4 categories: foundation, eyeshadow,         lipstick, and blush
    - These urls were then scrapped for the following product information: brand name, product name, price, rating, and image URL
    - Scrapped information was appended to a list then transformed into a dictionary
  - Using the dictionary, a Mongo database was created
  - A Flask app was created with routes that returned jsonified data
    - Home route returned all data within the database
    - Four other routes were created that filtered the data by category
  
 # Front-End
  - HTML page was created with CSS style to hold our visualization
    - Buttons with Javascript on-click function coded in the navbar that allows for filtering data by category
    - Empty graph and product panel div coded to be filled
  - Jinja2 was utilized in the HTML to link the variable created from our Flask app
  - A Javascript app was created that connected the Flask app routes to our html
    - Using D3 library, function created to create scatterplot based on data accessed
    - Using jQuery, function created to pull JSON data from different routes depending on button pressed and replace the data variable used in the D3 function
  - Within the D3 function, circlegroup onclick function created to rewrite panel product HTML depending on which product circle is clicked
  
  Homepage
  ![Alt text](static/img/homepage.PNG?raw=true "Homepage")
  
  Filtered by eyeshadow
  ![Alt text](static/img/filteredpage.PNG?raw=true "Homepage")
  
  Product panel
  ![Alt text](static/img/productpanel.PNG?raw=true "Homepage")
   
