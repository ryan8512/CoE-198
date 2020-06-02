#!/bin/bash

input="Seeds"
rm account
while IFS= read -r line
do
  echo "$line" > indiv
  ./seed2key.py indiv | tr -d ' ' | cut --complement -d ":" -f 1 >> account
done < "$input"

input="account"

#Register to the Ethereum Network
while IFS= read -r line
do
  echo "$line" > key.txt
  ./script.exp
done < "$input"

#Get Account Addresses
ls ~/.ethereum/keystore -tr | cut -d "-" -f 9 > addresses.txt

#fund the addresses