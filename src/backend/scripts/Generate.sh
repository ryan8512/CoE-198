#!/bin/bash

input="Seeds"
rm account
while IFS= read -r line
do
  echo "$line" > indiv
  ./seed2key.py indiv | tr -d ' ' | cut --complement -d ":" -f 1 >> account
done < "$input"
input="account"
while IFS= read -r line
do
  echo "$line" | ./test.py
done < "$input"