import { StringDictionary } from './constants';
import Data from '../data.json';
import { IComment, IUser } from '../types';

export function extractUserName(text: string) {
  if (text.trim()[0] === '@') {
    const splittedText = text.trim().split(' ');
    return {
      userName: splittedText[0],
      text: splittedText.splice(1).join(' '),
    };
  }
  return { text };
}

// Taken from https://www.joshwcomeau.com/react/dark-mode
export function getInitialColorMode() {
  const persistedTheme = window.localStorage.getItem('theme');
  const hasPersistedTheme = typeof persistedTheme === 'string';
  // If the user has explicitly chosen light or dark,
  // let's use it. Otherwise, this value will be null.
  if (hasPersistedTheme) {
    return persistedTheme;
  }
  // If they haven't been explicit, let's check the media
  // query
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const hasMediaQueryPreference = typeof mql.matches === 'boolean';
  if (hasMediaQueryPreference) {
    return mql.matches ? 'dark' : 'light';
  }
  // If they are using a browser/OS that doesn't support
  // color themes, let's default to 'light'.
  return 'light';
}

export function getComments(): IComment[] {
  const persistedComments = window.localStorage.getItem(StringDictionary.COMMENTS);
  if (persistedComments) {
    return JSON.parse(persistedComments);
  }
  window.localStorage.setItem(StringDictionary.COMMENTS, JSON.stringify(Data.comments));
  return Data.comments;
}

export function getCurrentUser(): IUser {
  const persistedCurrentUser = window.localStorage.getItem(StringDictionary.CURRENTUSER);
  if (persistedCurrentUser) {
    return JSON.parse(persistedCurrentUser);
  }
  window.localStorage.setItem(StringDictionary.CURRENTUSER, JSON.stringify(Data.currentUser));
  return Data.currentUser;
}

// Selects textarea node in article of data-id=commentId
export const selectTextAreaNode = (textAreaId: number | string) => {
  return document.querySelector(`textarea#${textAreaId}`) as HTMLTextAreaElement;
};
