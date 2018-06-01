import { airdropInfo } from './actionTypes';

export function setAirdropInfo(email, facebookProfile, telegramProfile, twitterProfile, redditProfile, refLink, participates, isVerifyEmail,referralCount,isCampaignSuccessfullyCompleted) {
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
    referralCount,
    isCampaignSuccessfullyCompleted
  };
}
