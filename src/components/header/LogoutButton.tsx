import * as m from 'paraglide/messages.js'
import Button from 'components/Button'
import { signOut } from 'utils/auth-client'

export default function LogoutBtn() {
  return (
    <Button className='rounded-t-none' onClick={() => signOut()}>
      {m.logout()}
    </Button>
  )
}
