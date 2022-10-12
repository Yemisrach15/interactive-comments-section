import { atom } from 'recoil';
import { getComments, getCurrentUser, getInitialColorMode } from '../utils';
import { StringDictionary } from '../utils/constants';

export const commentsState = atom({
  key: StringDictionary.COMMENTS,
  default: getComments(),
});

export const currentUserState = atom({
  key: StringDictionary.CURRENTUSER,
  default: getCurrentUser(),
});

export const themeState = atom({
  key: StringDictionary.THEME,
  default: getInitialColorMode(),
});

// TODO: id to use for new comment, maybe selector
