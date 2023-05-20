#!/bin/bash

# Read the input control file
input_file=$1

# Check if the input file exists
if [ ! -f $input_file ]; then
  echo "Input file does not exist!"
  exit 1
fi

# Parse the fields from the control file
version=$(grep -i "^Version:" $input_file | cut -d " " -f 2)
name=$(grep -i "^Name:" $input_file | cut -d " " -f 2-)
description=$(grep -i "^Description:" $input_file | cut -d " " -f 2-)

# Create a JSON object from the parsed fields
json_object=$(cat << EOF
{
    "contact": {
        "twitter": "p2kdev",
        "email": "p2kdev@gmail.com"
    },
    "information": {
        "description": "$description",
        "source_code_link": "https://github.com/p2kdev/$name"
    },
    "changelog": [
        {
            "date": "$(date +%Y-%m-%d)",
            "version_number": "$version",
            "changes": "- Initial release on the repo"
        }
    ]
}
EOF
)

# Print the JSON object to the console
echo $json_object