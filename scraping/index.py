# importing the requests library 
import requests
import csv
  
# api-endpoint 
URL = "https://api.tanachstudy.com/sefarim"
  
# sending get request and saving the response as response object 
r = requests.get(url = URL) 

# extracting data in json format 
data = r.json() 

# get a csv output file
with open("nach_perakim.csv", mode="w") as nachfile:
    # get a writer for the file
    nach_writer = csv.writer(nachfile, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL)
    # write a header row
    nach_writer.writerow(["Sefer", "Perek", "Title", "Teacher"])

    # loop through all our books, writing to the file
    for book in data:
        # get the name of the current sefer
        sefer = book["seferMeta"]["book_name_pretty_eng"]
        # loop through all the perakim in the sefer
        for perek in book["allPerakim"]:
            if perek["perek_id"] == 0:
                perek_num = "Introduction"
            else:
                perek_num = perek["perek_id"]

            if perek["mname"] is not None:
                teacher = perek["title"] + " " + perek["fname"] + " " + perek["mname"] + " " + perek["lname"]
            else:
                teacher = perek["title"] + " " + perek["fname"] + " " + perek["lname"]

            if perek["is_many_parts"] is True:
                print True
            nach_writer.writerow([sefer, perek_num, "", teacher])
