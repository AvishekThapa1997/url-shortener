import * as mainService from "../services/main-services.js";
export const shortURL = async (req, res, next) => {
  const originalURL = req.body.data;
  try {
    let shortenedUrl;
    shortenedUrl = await mainService.checkIfURLAlreadyExists(originalURL);
    if (!shortenedUrl) {
      shortenedUrl = await mainService.shortURL(originalURL);
    }
    res.status(200).send({
      message: "success",
      shortUrl: `${req.protocol}://${req.get("host")}/${shortenedUrl.shortUrl}`,
    });
  } catch (err) {
    if (!err.statusCode) {
      statusCode = 500;
    }
    next(err);
  }
};

export const redirectURL = async (req, res, next) => {
  const shortUrl = req.params.shortUrl;
  try {
    const shortUrlData = await mainService.findShortUrl(shortUrl);
    if (shortUrlData) {
      return res.redirect(shortUrlData.fullUrl);
    }
    const error = new Error("Not Found.");
    error.statusCode = 404;
    throw error;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
