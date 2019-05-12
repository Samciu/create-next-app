import Document, {Head, Main, NextScript} from 'next/document'

import {GtagScript} from '../utils/gtag'
import {RemScript} from '../utils/rem'

export default class MyDocument extends Document {
    render() {
        
        return (
            <html>
            <Head>
                <meta content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width,viewport-fit=cover" name="viewport" />
                <RemScript />
                <GtagScript />
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
            </html>
        )
    }
}