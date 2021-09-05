import request from './request';
// import appConfig from '../config/app.js';
import sbjs from 'sourcebuster';

const dlp = (...params) => {
    console.log(params);
    window.dataLayer.push(...params);
};

const googleEvent = (eventCategory, eventAction, eventLabel) => {
    dlp({
        event: 'GAEvent',
        eventCategory,
        eventAction,
        eventLabel,
    });
};

const google4Event = (name, params) => {
    dlp({
        ...params,
        event: 'ga4Event',
        ga4EventName: name,
    });
};

const productEventTracking = async (productId, event) => {
    await request({
        url: '/tracking/product-event',
        method: 'POST',
        data: {
            productId,
            event,
        },
    });
};

const categoryEventTracking = async (categoryId, event) => {
    await request({
        url: '/tracking/category-event',
        method: 'POST',
        data: {
            categoryId,
            event,
        },
    });
};

const articleEventTracking = async (articleId, event) => {
    await request({
        url: '/tracking/article-events',
        method: 'POST',
        data: {
            articleId,
            event,
        },
    });
};

export default {
    event: googleEvent,
    google4Event,
    productEvent: productEventTracking,
    categoryEvent: categoryEventTracking,
    articleEvent: articleEventTracking,
    startSession: () => {
        sbjs.init();
        const data = {
            source: sbjs.get.current.src,
            medium: sbjs.get.current.mdm,
            campaign: sbjs.get.current.cmp,
            content: sbjs.get.current.cnt,
            term: sbjs.get.current.trm,
        };

        request({
            url: '/tracking',
            method: 'POST',
            data,
        }).catch(() => {});
    },
};
