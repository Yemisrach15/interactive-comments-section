export function extractUserName(text: string) {
  if (text.trim()[0] === '@') {
    const splittedText = text.split(' ');
    return {
      userName: splittedText[0],
      text: splittedText.splice(1).join(' '),
    };
  }
  return { text };
}
