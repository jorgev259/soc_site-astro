import { gql } from '@/graphql/__generated__/client'
import { useMutation } from '@apollo/client/react/hooks'

import Button from 'components/Button'
import * as m from 'paraglide/messages.js'
import apolloClient from '@/graphql/apolloClient'
import toast from 'react-hot-toast'

const loginMutation = gql(`
  mutation Logout {
    logout
  }
`)

export default function LogoutBtn() {
  const [mutate, { loading }] = useMutation(loginMutation, { client: apolloClient })

  const handleSubmit = (ev) => {
    ev.preventDefault()

    mutate()
      .then(() => {
        window.refresh()
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  return (
    <Button className='rounded-t-none' loading={loading} onClick={handleSubmit}>
      {m.logout()}
    </Button>
  )
}
