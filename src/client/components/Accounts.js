import React from 'react'
import {branch} from 'baobab-react/higher-order'
import Actions from '../actions'

import {
  Row, Col,
  Table, Icon, Button,
  Form, Input, InputNumber
} from 'antd'
const FormItem = Form.Item;

const styles = {
  container: {
    padding: '24px'
  },
  table: {
    marginTop: '8px'
  }
}

class Accounts extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    Actions.addAccount(this.props.form.getFieldsValue())
  }

  render = () => {
    const {
      items,
      form
    } = this.props

    const { getFieldProps } = this.props.form;
    const columns = [{
      title: 'Username',
      dataIndex: 'username',
      key: 'username'
    }, {
      title: 'Provider',
      dataIndex: 'provider',
      key: 'provider'
    }, {
      title: 'Actions',
      key: 'actions',
      render: (text, record) =>
        <div>
          <Button type='primary'
            style={{marginRight: 8}}
            onClick={()=>Actions.login(record)}
          >login</Button>
          <Button onClick={()=>Actions.removeAccount(record)}>
            remove
          </Button>
        </div>
    }]

    return <Row>
      <Col span={16} style={styles.container}>
        <h2>Account management</h2>
        <div style={styles.table}>
          <Table
            columns={columns}
            dataSource={items}
            size={'middle'}
            bordered={false}>
          </Table>
        </div>
      </Col>
      <Col span={8} style={styles.container}>
        <h2>Add account</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label='username'>
            <Input
              {...getFieldProps('username')}/>
          </FormItem>
          <FormItem label='password'>
            <Input type='password'
              {...getFieldProps('password')}/>
          </FormItem>
          <FormItem label='provider (google or ptc)'>
            <Input
              {...getFieldProps('provider')}/>
          </FormItem>
          <FormItem type='number' label='lat'>
            <Input {...getFieldProps('lat')}/>
          </FormItem>
          <FormItem type='number' label='lng'>
            <Input {...getFieldProps('lng')}/>
          </FormItem>
          <Button type='primary' htmlType='submit'>add</Button>
        </Form>
      </Col>
    </Row>
  }
}

Accounts = Form.create()(Accounts)

export default branch({
  items: ['accounts']
}, Accounts)
