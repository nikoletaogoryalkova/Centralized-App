import { airdropInfo } from '../actions/actionTypes';

const initialState = {
  email: null,
  facebookProfile: null,
  telegramProfile: null,
  twitterProfile: null,
  redditProfile: null,
  participates: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case airdropInfo.SET_AIRDROP_INFO:
      return {
        ...state,
        email: action.email,
        facebookProfile: action.facebookProfile,
        telegramProfile: action.telegramProfile,
        twitterProfile: action.twitterProfile,
        redditProfile: action.redditProfile,
        refLink: action.refLink,
        participates: action.participates,
        isVerifyEmail: action.isVerifyEmail
      };
    default:
      return state;
  }
}