export const detectLocale = (req, res, next) => {
    if (req.query.lang && process.env.SUPPORTED_LANGUAGES.includes(req.query.lang)) {
        req.locale = req.query.lang;
    }
    else if (req.headers['accept-language']) {
        const preferredLang = req.headers['accept-language'].split(',')[0].split('-')[0];
        if (process.env.SUPPORTED_LANGUAGES.includes(preferredLang)) {
        req.locale = preferredLang;
        }
    }
    else if (req.cookies && req.cookies.lang && process.env.SUPPORTED_LANGUAGES.includes(req.cookies.lang)) {
        req.locale = req.cookies.lang;
    }
    else {
        req.locale = process.env.DEFAULT_LANGUAGE || 'en';
    }
    
    next();
};

export const setLocaleCookie = (req, res, next) => {
    if (req.query.lang && process.env.SUPPORTED_LANGUAGES.includes(req.query.lang)) {
        res.cookie('lang', req.query.lang, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true
        });
    }
    next();
};