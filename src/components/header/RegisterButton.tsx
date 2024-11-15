import type { Session } from '@auth/core/types'
import { useState } from 'react'
import { gql } from '@/graphql/__generated__/client'
import { useMutation } from '@apollo/client/react/hooks'

import Button from 'components/Button'
import * as m from 'paraglide/messages.js'
import Modal from 'components/Modal'
import apolloClient from '@/graphql/apolloClient'
import toast from 'react-hot-toast'

const registerMutation = gql(`
  mutation Register($username: String!, $email: String!, $pfp: File) {
    registerUser(username: $username, email: $email, pfp: $pfp)
  }
`)

export default function RegisterBtn(props: { session: Session }) {
  const { session } = props
  const [modalOpen, setModalOpen] = useState(false)
  const [mutate, { loading }] = useMutation(registerMutation, { client: apolloClient, ignoreResults: true })

  if (session) return null

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const formData = new FormData(ev.target)
    const variables = Object.fromEntries(formData)

    mutate({ variables })
      .then(() => {
        toast.success(m.emailSuccess())
        setModalOpen(false)
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  return (
    <>
      <Button className='rounded-t-none' onClick={() => setModalOpen(true)}>
        {m.register()}
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
                <div className='flex flex-col'>
                  <label htmlFor='email' className='font-medium text-black'>
                    {m.email()}:
                  </label>
                  <input type='text' name='email' className='bg-zinc-200 rounded p-2 mt-2 mb-3 text-black' />
                </div>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='pfp' className='font-medium text-black'>
                  {m.profilePic()}:
                </label>
                <input
                  type='file'
                  name='pfp'
                  className='bg-zinc-200 rounded p-2 mt-2 mb-3 text-black'
                  accept='image/*'
                />
              </div>
            </div>
            <div className='bg-zinc-200 px-4 py-3 text-right gap-x-2 flex justify-end'>
              <Button className='bg-zinc-500 hover:bg-zinc-600'>{m.close()}</Button>
              <Button loading={loading} disabled={loading}>
                {m.register()}
              </Button>
            </div>
          </form>
        </Modal>
      ) : null}
    </>
  )
}
