import React,{Fragment} from 'react';
const adHtml = `
(adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-6913905804988400",
    enable_page_level_ads: true
  });
`;

export const AdScript = () => {
    
    return (
        <Fragment>
            <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            <script dangerouslySetInnerHTML={{__html: adHtml}}/>
        </Fragment>
    )
};