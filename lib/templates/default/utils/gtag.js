import React from 'react';

const GA_TRACKING_ID = '1111';
const AD_TRACKING_ID = '2222';

const gtagHtml = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}');
        gtag('config', '{${AD_TRACKING_ID}');
      `;

export const GtagScript = () => (
    <React.Fragment>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}/>
        <script dangerouslySetInnerHTML={{__html: gtagHtml}}/>
    </React.Fragment>
);

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = url => {
    window.gtag('config', GA_TRACKING_ID, {
        page_location: url
    })
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({action, category, label, value}) => {
    gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
    });
};

export const exception = ({description = '', fatal = false, message = ''}) => {
    gtag('event', 'exception', {
        description: description,
        fatal: fatal,
        message: message
    });
};

export const adEvent = (type) => {
    if (type == 'MR') {
        gtag('event', 'conversion', {
            'send_to': `${AD_TRACKING_ID}/-6NjCPn05ZEBEJbS4PAC`,
            'event_callback': ''
        });
    } else {
        gtag('event', 'conversion', {
            'send_to': `${AD_TRACKING_ID}/ugARCK7X0pEBEJbS4PAC`,
            'event_callback': ''
        });
    }
};