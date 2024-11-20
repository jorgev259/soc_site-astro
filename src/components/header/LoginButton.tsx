import { useState } from 'react'
import { gql } from '@/graphql/__generated__/client'
import { useMutation } from '@apollo/client/react/hooks'

import Button from 'components/Button'
import * as m from 'paraglide/messages.js'
import Modal from 'components/Modal'
import apolloClient from '@/graphql/apolloClient'
import toast from 'react-hot-toast'

const loginMutation = gql(`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`)

export default function LoginBtn() {
  const [modalOpen, setModalOpen] = useState(false)
  const [mutate, { loading }] = useMutation(loginMutation, { client: apolloClient })

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const formData = new FormData(ev.target)
    const variables = Object.fromEntries(formData)

    mutate({ variables })
      .then((res) => {
        // toast.success(m.emailSuccess())
        setModalOpen(false)
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  return (
    <>
      <Button className='rounded-t-none' onClick={() => setModalOpen(true)}>
        {m.login()}
      </Button>
      {modalOpen ? (
        <Modal setOpen={setModalOpen}>
          <form onSubmit={handleSubmit}>
            <div className='bg-white px-4 pt-5 pb-4 gap-x-4 flex flex-col'>
              <div className='flex gap-x-4'>
                <div className='flex flex-col'>
                  <label htmlFor='username' className='font-medium text-black'>
                    {m.username()}:
                  </label>
                  <input type='text' name='username' className='bg-zinc-200 rounded p-2 mt-2 mb-3 text-black' />
                </div>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='password' className='font-medium text-black'>
                  {m.password()}:
                </label>
                <input type='password' name='password' className='bg-zinc-200 rounded p-2 mt-2 mb-3 text-black' />
              </div>
            </div>
            <div className='bg-zinc-200 px-4 py-3 text-right gap-x-2 flex justify-end'>
              <Button className='bg-zinc-500 hover:bg-zinc-600'>{m.close()}</Button>
              <Button loading={loading} disabled={loading}>
                {m.login()}
              </Button>
            </div>
          </form>
        </Modal>
      ) : null}
    </>
  )
}
