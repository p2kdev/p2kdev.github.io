#!/bin/bash

json_object=$(cat << EOF
{
    "contact": {
        "twitter": "p2kdev",
        "email": "p2kdev@gmail.com"
    },
    "information": {
        "description": "your_description",
        "source_code_link": "https://github.com/p2kdev"
    },
    "changelog": [
    ]
}
EOF
)

echo $json_object

