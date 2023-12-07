import {
  ResponseListener,
  SubscriptionManager,
} from "@chainlink/functions-toolkit";
import { ethers } from "ethers";
import { FUNCTION_CONSUMER_BYTECODE } from "./bytecode";

const routerAddress = "0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C";
const linkTokenAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
const rpcUrl = process.env.POLYGON_MUMBAI_RPC_URL;

const privateKey = process.env.PRIVATE_KEY as string;

const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(privateKey);

const signer = wallet.connect(provider);

export const deployConsumer = async (deployer: ethers.Signer) => {
  const functionsConsumerFactory = new ethers.ContractFactory(
    FUNCTIONS_CONSUMER_ABI,
    FUNCTION_CONSUMER_BYTECODE,
    deployer
  );

  const functionsConsumer = await functionsConsumerFactory.deploy(
    routerAddress
  );

  await functionsConsumer.deployed();

  return functionsConsumer;
};

export const makeRequest = async (
  consumerAddress: string,
  prompt: string,
  source: string
) => {
  const donId = "fun-polygon-mumbai-1";
  const subscriptionManager = new SubscriptionManager({
    signer,
    linkTokenAddress,
    functionsRouterAddress: routerAddress,
  });
  await subscriptionManager.initialize();

  const gasLimit = 300000;

  const subscriptionId = parseInt(process.env.SUBSCRIPTION_ID as string);

  const functionsConsumer = new ethers.Contract(
    consumerAddress,
    FUNCTIONS_CONSUMER_ABI,
    signer
  );

  const transaction = await functionsConsumer.sendRequest(
    source,
    "0x",
    0,
    0,
    [prompt],
    [],
    subscriptionId,
    gasLimit,
    ethers.utils.formatBytes32String(donId)
  );

  const responseListener = new ResponseListener({
    provider,
    functionsRouterAddress: routerAddress,
  });

  return {
    responseListener,
    transaction,
  };
};
