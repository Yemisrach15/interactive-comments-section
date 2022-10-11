import { atom } from 'recoil';
import { getComments, getCurrentUser } from '../utils';
import { StringDictionary } from '../utils/constants';

export const commentsState = atom({
  key: StringDictionary.COMMENTS,
  default: getComments(),
});

export const currentUserState = atom({
  key: StringDictionary.CURRENTUSER,
  default: getCurrentUser(),
});

// TODO: id to use for new comment, maybe selector

// TODO: theme state
