import * as m from 'paraglide/messages.js'
import Button from 'components/Button'
import { signOut } from 'utils/auth-client'

export default function LogoutBtn() {
  async function handleClick() {
    await signOut()
    location.reload()
  }

  return (
    <Button className='rounded-t-none' onClick={handleClick}>
      {m.logout()}
    </Button>
  )
}
