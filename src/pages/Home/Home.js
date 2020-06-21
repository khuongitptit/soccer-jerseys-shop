import React, { useState } from 'react'
import { Layout } from 'antd'
import SearchProductsContainer from '../../containers/SearchProductsContainer'
import ProductsListContainer from '../../containers/ProductsListContainer'
import useMediaQuery from '../../utils/useMediaQuery'
import './Home.scss'
import { Button } from 'antd'
const { Header, Sider, Content, Footer } = Layout
const Home = () => {
    const [collapsed, setCollapsed] = useState(true)
    const mq1440 = useMediaQuery('(max-width:1440px)')
    const mq1024 = useMediaQuery('(max-width:1024px)')
    const mq768 = useMediaQuery('(max-width:768px)')
    const mq425 = useMediaQuery('(max-width:426px)')
    const mq375 = useMediaQuery('(max-width:375px)')
    const mq320 = useMediaQuery('(max-width:320px)')
    const getW = () => {
        if (mq1440 && !mq1024 && !mq768 && !mq425 && !mq375 && !mq320)
            return 300
        else if (mq1440 && mq1024 && !mq768 && !mq425 && !mq375 && !mq320)
            return 300
        else if (mq1440 && mq1024 && mq768 && !mq425 && !mq375 && !mq320)
            return 300
        else if (mq1440 && mq1024 && mq768 && mq425 && !mq375 && !mq320)
            return 260
        else if (mq1440 && mq1024 && mq768 && mq425 && mq375 && !mq320)
            return 200
        else if (mq1440 && mq1024 && mq768 && mq425 && mq375 && mq320)
            return 200
        return 300
    }
    const toggle = () => {
        setCollapsed(!collapsed)
    }
    return (
        <Layout
            style={{ marginTop: '20px', borderTop: '1px solid lightblue' }}
            className="layout"
        >
            <Sider
                width={getW()}
                theme="light"
                className="sider"
                trigger={null}
                collapsedWidth="0"
                collapsible
                collapsed={collapsed}
            >
                <p className="filter-title">Bộ lọc tìm kiếm</p>
                <SearchProductsContainer />
            </Sider>
            <Layout className="child-layout">
                <Header className="header">
                    <Button
                        onClick={toggle}
                        className={`sider-toggle-btn ${
                            collapsed ? 'closed' : ' opened'
                        }`}
                    >
                        {collapsed ? (
                            <i className="fas fa-search-plus"></i>
                        ) : (
                            <i className="fas fa-search-minus"></i>
                        )}
                    </Button>
                </Header>
                <Content
                    className="content"
                    style={{ backgroundColor: 'transparent' }}
                >
                    <ProductsListContainer />
                </Content>
            </Layout>
            <Footer className="footer">
                <span>
                    gnouhK{' '}
                    <a href="https://github.com/khuongitptit">
                        <i className="fab fa-github fa-2x"></i>
                    </a>
                </span>
            </Footer>
        </Layout>
    )
}

export default Home
