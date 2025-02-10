// import toast from 'react-hot-toast'

import Button from 'components/Button'
import * as m from 'paraglide/messages.js'

export default function LogoutBtn() {
  const handleClick = (ev) => {
    ev.preventDefault()

    /* mutate()
      .then(() => {
        window.refresh()
      })
      .catch((err) => {
        toast.error(err.message)
      }) */
  }

  return (
    <Button className='rounded-t-none' onClick={handleClick}>
      {m.logout()}
    </Button>
  )
}
