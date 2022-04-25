import { useContract } from './useContract';
import MintzNFTAbi from '../contracts/MintzNFT.json';
import MintzNFTContractAddress from '../contracts/MintzNFT-address.json';

export const useMintContract = () =>
  useContract(MintzNFTAbi.abi, MintzNFTContractAddress.MintzNFT);