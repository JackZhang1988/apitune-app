import { Button, Result } from 'antd'
import { NavLink, useRouteError } from 'react-router-dom'

import { strings } from '@renderer/services/localization'

function ErrorPage(): JSX.Element {
  // const error = useRouteError()
  // console.log('error', error)
  return (
    <Result
      status="error"
      title={strings.somethingWrong}
      extra={
        <NavLink to={'/'}>
          <Button type="primary">{strings.backHome}</Button>
        </NavLink>
      }
    />
  )
}

export default ErrorPage
