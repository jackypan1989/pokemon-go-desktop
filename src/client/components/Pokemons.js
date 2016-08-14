import React, { PureComponent } from 'react'
import {branch} from 'baobab-react/higher-order'
import { Table, Icon, Button } from 'antd'
import { calcStat } from '../utils'
import Long from 'long'
import Actions from '../actions'

const styles = {
  container: {
    padding: '24px'
  },
  table: {
    marginTop: '8px'
  }
}

const columns = [{
  title: '',
  dataIndex: 'img',
  key: 'img',
  render: (text) =>
    <img style={{width: 40}} src={text}/>
}, {
  title: 'Name',
  dataIndex: 'name',
  key: 'name'
}, {
  title: 'CP-Tier',
  dataIndex: 'cp_tier',
  key: 'cp_tier',
  sorter: (a, b) => {
    const tier = {'S': 5, 'A':4, 'B':3, 'F':2, 'N/A':1}
    return tier[a.cp_tier] - tier[b.cp_tier]
  }
}, {
  title: 'LV',
  dataIndex: 'level',
  key: 'level',
  sorter: (a, b) => a.level - b.level
}, {
  title: 'CP',
  dataIndex: 'cp',
  key: 'cp',
  sorter: (a, b) => a.cp - b.cp
}, {
  title: 'HP',
  dataIndex: 'hp',
  key: 'hp',
  render: (text) =>
    <div>{Math.round(text)}</div>,
  sorter: (a, b) => a.hp - b.hp
}, {
  title: 'ATK',
  dataIndex: 'attack',
  key: 'attack',
  render: (text, record) =>
    <div>{`${text} (${record.individual_attack})`}</div>,
  sorter: (a, b) => a.attack - b.attack
},{
  title: 'DEF',
  dataIndex: 'defense',
  key: 'defense',
  render: (text, record) =>
    <div>{`${text} (${record.individual_defense})`}</div>,
  sorter: (a, b) => a.defense - b.defense
},{
  title: 'STA',
  dataIndex: 'stamina',
  key: 'stamina',
  render: (text, record) =>
    <div>{`${text} (${record.individual_stamina})`}</div>,
  sorter: (a, b) => a.stamina - b.stamina
},{
  title: 'IV%',
  dataIndex: 'iv_perfect',
  key: 'iv_perfect',
  render: (text) =>
    <div>{Math.round(text*100)}</div>,
  sorter: (a, b) => a.iv_perfect - b.iv_perfect
}, {
  title: 'Actions',
  key: 'action',
  render: (text, record) =>
    <div>
      <Button
        onClick={()=>Actions.releasePokemon(record.id)}
      >transfer
      </Button>
    </div>
}]

class Pokemons extends React.Component {
  state = {
    selectedRowKeys: []
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleReleasePokemonBatch = () => {
    const {
      selectedRowKeys
    } = this.state

    Actions.releasePokemonBatch(selectedRowKeys)
    this.setState({ selectedRowKeys: []})
  };

  componentDidMount = () => {
    Actions.login()
  };

  render() {
    const {
      pokemons
    } = this.props

    const {
      selectedRowKeys
    } = this.state

    const items = pokemons?calcStat(pokemons):[]
    const hasSelected = selectedRowKeys.length > 0

    return <div style={styles.container}>
      <h2>Pokemon List (count: {items.length}/250)</h2>
      <div style={styles.table}>
        <div style={{ marginBottom: 16 }}>
          <Button
            type='primary'
            disabled={!hasSelected}
            onClick={()=>this.handleReleasePokemonBatch()}
          >Batch transfer
          </Button>
          <span style={{ marginLeft: 8 }}>{hasSelected ? `choosed ${selectedRowKeys.length} pokemon` : ''}</span>
        </div>
        <Table
          columns={columns}
          dataSource={items}
          size={'middle'}
          bordered={false}
          rowKey={'id'}
          pagination={{
            total: items.length,
            showSizeChanger: true
          }}
          rowSelection={{
            selectedRowKeys,
            onChange: this.onSelectChange,
          }}
        />
        <h1>Formula:</h1>
        <h3>ECpM = CpM + ACpm</h3>
        <h3>CP = (BaseAtk + IV_Atk) * (BaseDef + IV_Def)^0.5 * (BaseSta + IV_Sta)^0.5 * (ECpM)^2 / 10</h3>
        <h3>HP = ECpM * (BaseSta + IV_Sta)</h3>
        <h3>IV% = (IV_Atk + IV_Def + IV_Sta)/45</h3>
      </div>
    </div>
  }
}

export default branch({
  pokemons: ['inventory', 'pokemon']
}, Pokemons)
