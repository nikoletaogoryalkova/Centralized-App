import { airdropInfo } from './actionTypes';

export function setAirdropInfo(email, facebookProfile, telegramProfile, twitterProfile, redditProfile, refLink, participates, isVerifyEmail) {
  return {
    type: airdropInfo.SET_AIRDROP_INFO,
    email,
    facebookProfile,
    telegramProfile,
    twitterProfile,
    redditProfile,
    participates,
    refLink,
    isVerifyEmail,
  };
}