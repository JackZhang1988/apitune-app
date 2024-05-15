import './sidebar.less'

import { useNavigate } from 'react-router-dom'

import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { AppstoreOutlined, RadarChartOutlined, SettingOutlined } from '@ant-design/icons'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: 'rules',
    icon: <AppstoreOutlined style={{ fontSize: '18px' }} />,
    label: 'API Rules'
  },
  {
    key: 'network',
    icon: <RadarChartOutlined style={{ fontSize: '18px' }} />,
    label: 'Network'
  },
  {
    key: 'settings',
    icon: <SettingOutlined style={{ fontSize: '18px' }} />,
    label: 'Settings'
  }
]

function Sidebar(): JSX.Element {
  const navigate = useNavigate()
  const onClick = (e: any) => {
    navigate('/' + e.key)
  }
  return (
    <Menu
      className="sidebar-menu"
      onClick={onClick}
      style={{ width: 90 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="vertical"
      items={items}
    />
  )
}

export default Sidebar
