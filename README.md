# Blackbook Graffiti NFT

Experimental NFT721 representation of graffiti tags on https://000000book.com
(.gml/Graffiti Markup Language)

This repository liberally forked from https://github.com/GuillaumeCz/ERC721-implementation


## Install

Clone the repository

```
git clone https://github.com/jamiew/blackbook-graffiti-nft
cd blackbook-graffiti-nft
```

Install depedencies, including `truffle` globally if needed

```
npm install
npm install -g truffle
```

You'll need `ganache-cli` (fka `testrpc`) in order to simulate a blockchain locally

```
npm install -g ganache-cli
```

## Running

In one terminal

```
ganache-cli
```

In another

```
# Compile the contracts
truffle compile

#Test the contracts
truffle test
```

Have fun



