import React from 'react';

const remHtml = `
(function () {
    window.CHANGE_REM_TIME = 300;

    var docEl = document.documentElement;
    var designWidth = docEl.getAttribute('data-design-width') || 750;
    var rem, width, preWidth, timer;
    function setRem() {
        
        width = docEl.getBoundingClientRect().width;
        if (width === preWidth) return;
        preWidth = width;
        
        rem = width / designWidth;

        rem *= 100;
        rem = Math.min(rem, 100);

        docEl.style.fontSize = rem + 'px';
    }

    function changeRem() {
        setRem();
    }

    window.addEventListener('resize', function () {
        clearTimeout(timer);
        timer = setTimeout(changeRem, window.CHANGE_REM_TIME);
    });
    window.addEventListener('orientationchange', function () {
        clearTimeout(timer);
        timer = setTimeout(changeRem, window.CHANGE_REM_TIME);
    });

    setRem();
})();
      `;

export const RemScript = () => (
    <script dangerouslySetInnerHTML={{ __html: remHtml }} />
);