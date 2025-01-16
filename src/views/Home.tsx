import React from 'react';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Feature from '../components/home/Feature';
import AppHeader from '../components/common/Header';
import AppFooter from '../components/common/Footer';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

const Home = () => {

    return (
        <Layout className='mainLayout'>
            <Header>
                <AppHeader />
            </Header>
            <Content>
                <div className='main'>
                    <Hero />
                    <About />
                    <Feature />
                </div>
            </Content>
            <Footer>
                <AppFooter />
            </Footer>
        </Layout>
    );
}

export default Home;
