import Web3 from 'web3';
import { Config } from './../../../config';

let web3 = new Web3(new Web3.providers.HttpProvider(Config('WEB3_HTTP_PROVIDER')));

export { web3 };
