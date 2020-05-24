#!/usr/bin/expect

eval spawn geth account import key.txt
set multiPrompt {[#>$] }
interact -o -nobuffer -re $multiPrompt return
send "123"
interact -o -nobuffer -re $multiPrompt return
send "123"