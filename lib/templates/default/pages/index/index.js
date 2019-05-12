import Layout from '../../components/layout';
import Index from '../../components/pages/index';

const props = {
    title: 'Hello,next!',
    description: 'Hello,next!'
};

export default () => (
    <Layout {...props} className="page-index">
        <div className="main">
            <Index />
        </div>
    </Layout>
)