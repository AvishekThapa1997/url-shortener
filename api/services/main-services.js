import ShortUrl from "../model/ShortUrl.js";
export const shortURL = async (url) => {
  const shortURL = {
    fullUrl: url,
  };
  return ShortUrl.save(shortURL);
};

export const checkIfURLAlreadyExists = (url) => {
  return ShortUrl.findByOriginalURL(url);
};

export const findShortUrl = (shorturl) => {
  return ShortUrl.findByShortURL(shorturl);
};
