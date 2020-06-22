#!/bin/bash
input="account"

#Register to the Ethereum Network
while IFS= read -r line
do
  echo "$line" > key.txt
  ./import.exp
done < "$input"

#Get Account Addresses
ls ~/.ethereum/keystore -tr | cut -d "-" -f 9 > addresses.txt

#fund the addresses
