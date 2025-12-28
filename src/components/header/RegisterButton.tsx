import { useState, type FormEvent } from 'react'
import toast from 'react-hot-toast'
import * as m from 'paraglide/messages.js'

import Button from 'components/Button'
import Modal from 'components/Modal'
import { Input } from 'components/form/Input'
import { signUpSchema } from 'schemas/user'

export default function RegisterBtn() {
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget)
    const result = signUpSchema.safeParse(formData)

    if (!result.success) return

    setLoading(true)
    fetch('/api/auth/signUp', { body: formData, method: 'POST' })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText)

        toast.success(m.emailSuccess(), { duration: Infinity })
        setModalOpen(false)
      })
      .catch((err) => {
        console.error(err)
        toast.error(err.message)
      })
      .finally(() => {
        setLoading(false)
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
                <Input name='username' required label={m.username()} />
                <Input name='name' required label={m.displayName()} />
              </div>
              <Input name='profilePic' type='file' label={m.profilePic()} accept='image/*' />
              <Input name='email' type='email' required label={m.email()} />
              <Input name='password' type='password' required label={m.password()} />
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
