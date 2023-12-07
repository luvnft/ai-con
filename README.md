# 🌃 AI Constellation

## Introduction

This repo contains the code for the [Chainlink Constellation Hackathon](https://constellation-hackathon.devpost.com/).

The project is about creating a _constellation_ of AI functions that people can interact with from a simple UI. The interface allows users to easily deploy their own `FunctionConsumer` contract, register it in their [Chainlink Subscription](https://functions.chain.link/mumbai) and then receive data to it by interacting with the UI.

The project is deployed on the Mumbai testnet and can be accessed [here](https://ai-constellation.vercel.app).

## How it works

The project is composed of 3 main folders:

- **contracts**: contains the Solidity Smart Contracts for the ENS `OffChainResolver` and for the Chainlink `FunctionConsumer`;
- **next-app**: contains the code for the Frontend and Backend of the project, built using NextJS;
- **offchain-gateway**: contains the code for the Offchain Gateway, built using NodeJS, that leverages the Chainlink CCIP reads for domains and subdomains.
