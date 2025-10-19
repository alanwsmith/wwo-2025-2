#!/usr/bin/env python3

import string
import json

states = [
    { "id": "AL", "name": "Alabama", "capital": "Montgomery" },
    { "id": "AK", "name": "Alaska", "capital": "Juneau"  },
    { "id": "AZ", "name": "Arizona", "capital": "Phoenix"  },
    { "id": "AR", "name": "Arkansas", "capital": "Little Rock"  },
    { "id": "CA", "name": "California", "capital": "Sacramento" },
    { "id": "CO", "name": "Colorado", "capital": "Denver" },
    { "id": "CT", "name": "Connecticut", "capital": "Hartford" },
    { "id": "DE", "name": "Delaware", "capital": "Dover" },
    { "id": "FL", "name": "Florida", "capital": "Tallahassee" },
    { "id": "GA", "name": "Georgia", "capital": "Atlanta" },
    { "id": "HI", "name": "Hawaii", "capital": "Honolulu" },
    { "id": "ID", "name": "Idaho", "capital": "Boise" },
    { "id": "IL", "name": "Illinois", "capital": "Springfield" },
    { "id": "IN", "name": "Indiana", "capital": "Indianapolis" },
    { "id": "IA", "name": "Iowa", "capital": "Des Moines" },
    { "id": "KS", "name": "Kansas", "capital": "Topeka" },
    { "id": "KY", "name": "Kentucky", "capital": "Frankfort" },
    { "id": "LA", "name": "Louisiana", "capital": "Baton Rouge" },
    { "id": "ME", "name": "Maine", "capital": "Augusta" },
    { "id": "MD", "name": "Maryland", "capital": "Annapolis" },
    { "id": "MA", "name": "Massachusetts", "capital": "Boston" },
    { "id": "MI", "name": "Michigan", "capital": "Lansing" },
    { "id": "MN", "name": "Minnesota", "capital": "Saint Paul" },
    { "id": "MS", "name": "Mississippi", "capital": "Jackson" },
    { "id": "MO", "name": "Missouri", "capital": "Jefferson City" },
    { "id": "MT", "name": "Montana", "capital": "Helena" },
    { "id": "NE", "name": "Nebraska", "capital": "Lincoln" },
    { "id": "NV", "name": "Nevada", "capital": "Carson City" },
    { "id": "NH", "name": "New Hampshire", "capital": "Concord" },
    { "id": "NJ", "name": "New Jersey", "capital": "Trenton" },
    { "id": "NM", "name": "New Mexico", "capital": "Santa Fe" },
    { "id": "NY", "name": "New York", "capital": "Albany" },
    { "id": "NC", "name": "North Carolina", "capital": "Raleigh" },
    { "id": "ND", "name": "North Dakota", "capital": "Bismarck" },
    { "id": "OH", "name": "Ohio", "capital": "Columbus" },
    { "id": "OK", "name": "Oklahoma", "capital": "Oklahoma City" },
    { "id": "OR", "name": "Oregon", "capital": "Salem" },
    { "id": "PA", "name": "Pennsylvania", "capital": "Harrisburg" },
    { "id": "RI", "name": "Rhode Island", "capital": "Providence" },
    { "id": "SC", "name": "South Carolina", "capital": "Columbia" },
    { "id": "SD", "name": "South Dakota", "capital": "Pierre" },
    { "id": "TN", "name": "Tennessee", "capital": "Nashville" },
    { "id": "TX", "name": "Texas", "capital": "Austin" },
    { "id": "UT", "name": "Utah", "capital": "Salt Lake City" },
    { "id": "VT", "name": "Vermont", "capital": "Montpelier" },
    { "id": "VA", "name": "Virginia", "capital": "Richmond" },
    { "id": "WA", "name": "Washington", "capital": "Olympia" },
    { "id": "WV", "name": "West Virginia", "capital": "Charleston" },
    { "id": "WI", "name": "Wisconsin", "capital": "Madison" },
    { "id": "WY", "name": "Wyoming", "capital": "Cheyenne" }
  ]

# letters = list(string.ascii_lowercase)
# for l in string.ascii_uppercase:
#     letters.append(l)

class NameMaker():
    def gen_names(self):
        # counter = 0
        data = {}
        for state in states:
            data[state["name"]] = state["name"].ljust(14, "0")
            # data[state["name"]] = state["name"].ljust(14, letters[counter])
            # counter += 1
        return data

    def as_json(self):
        d = self.gen_names()
        write_json_to_file(d, "state-keys.json")


def write_json_to_file(data, file):
    with open(file, 'w', encoding='utf-8') as _out:
        json.dump(data, _out, sort_keys=True, indent=4)





if __name__ == "__main__":
    nm = NameMaker()
    # print(nm.gen_names())
    print(nm.as_json())


