import { useState, type FormEvent } from 'react'
import toast from 'react-hot-toast'

import * as m from 'paraglide/messages.js'
import Button from 'components/Button'
import Modal from 'components/Modal'
import Input from 'components/form/Input'
import { signUp } from 'utils/auth-client'

export default function RegisterBtn() {
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget)
    const variables = Object.fromEntries(formData) as {
      username: string
      name: string
      password: string
      email: string
    }

    setLoading(true)
    await signUp.email(variables, {
      onSuccess: () => {
        toast.success(m.emailSuccess(), { duration: Infinity })
        setLoading(false)
        setModalOpen(false)
      },
      onError: (ctx) => {
        console.log(ctx.error)
        toast.error(ctx.error.message)
        setLoading(false)
      }
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
            <div className='px-4 pt-5 pb-4 gap-x-4 gap-y-1 flex flex-col'>
              <div className='flex gap-x-4'>
                <Input name='username' required>
                  {m.username()}
                </Input>
                <Input name='name' required>
                  {m.displayName()}
                </Input>
              </div>
              <Input name='email' type='email' required>
                {m.email()}
              </Input>
              <Input name='password' type='password' required>
                {m.password()}
              </Input>
              <div className='mx-auto'>
                <Button type='submit' loading={loading} disabled={loading}>
                  {m.register()}
                </Button>
              </div>
            </div>
          </form>
        </Modal>
      ) : null}
    </>
  )
}
