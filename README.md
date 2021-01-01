# Blackbook Graffiti NFT

Experimental NFT721 representation of graffiti tags on https://000000book.com
(.gml/Graffiti Markup Language)

This repository liberally forked from https://github.com/GuillaumeCz/ERC721-implementation

Node versions + truffle/ganache can be a pain. See `engines` section of package.lock for targets,
if it isn't handled automatically by your preferred package or nodejs version manager.


## Install

Clone the repository

```
git clone https://github.com/jamiew/blackbook-graffiti-nft
cd blackbook-graffiti-nft
```

Install dependencies:

```
npm install
```


## Running

In one terminal, run `ganache-cli` (fka `testrpc`) to simulate a blockchain:

```
npx ganache-cli --deterministic
```

In another:

```
# Compile the contracts
npx truffle compile

# Test the contracts
npx truffle test
```

Later, try out `truffle deploy` and others

Have fun
