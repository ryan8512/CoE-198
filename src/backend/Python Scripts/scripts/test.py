#!/usr/bin/env python3
import json
import codecs
import sha3
from web3 import Web3
from eth_keys import keys


ganache_url = "http://127.0.0.1:7545"
web3 = Web3(Web3.HTTPProvider(ganache_url))
web3.eth.defaultAccount = web3.eth.accounts[1]

with open('src/abis/Registration.json') as f:
    info_json = json.load(f)
abi = info_json["abi"]

address = web3.toChecksumAddress('0x7977921f6A5134aB68407845bCc34d89B497619D')

private_key_str = input()
private_key_bytes = Web3.toBytes(hexstr=private_key_str) 
#print (type(private_key_bytes))

pk = keys.PrivateKey(private_key_bytes)
publicacc = pk.public_key.to_hex()
print (publicacc[2:])
contract = web3.eth.contract(address=address, abi=abi)
tx_hash = contract.functions.registerVoter(publicacc[2:]).transact()
web3.eth.waitForTransactionReceipt(tx_hash)

# Web3.toBytes(hexstr=private_key_str[2:-1])
# keccak_hash = keccak.new(digest_bits=256)
# keccak_hash.update(public_key_bytes)
# keccak_digest = keccak_hash.hexdigest()
# Take the last 20 bytes
# wallet_len = 40
# wallet = '0x' + keccak_digest[-wallet_len:]
# print (wallet)
# contract = web3.eth.contract(address=address, abi=abi)
# tx_hash = contract.functions.registerVoter('jojoj').transact()
# web3.eth.waitForTransactionReceipt(tx_hash)
# # print (tx_hash)
# print(contract.functions.votingStatus('loler').call())