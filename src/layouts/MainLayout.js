import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd'
const { Header, Content } = Layout;

function MainLayout() {
  return (
    <Layout>
      <Header>header</Header>
      <Layout>
        <Content>
          <Outlet /> 
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;