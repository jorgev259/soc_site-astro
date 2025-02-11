import { useState, type FormEvent } from 'react'
import toast from 'react-hot-toast'

import * as m from 'paraglide/messages.js'
import Button from './Button'
import Modal from './Modal'
import { resetPassword } from 'utils/auth-client'

export default function ForgorForm(props: { token: string }) {
  const { token } = props
  const [loading, setLoading] = useState(false)

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget)
    const password = formData.get('password')

    if (!password) return

    setLoading(true)
    const { data, error } = await resetPassword({ newPassword: password as string, token })
    setLoading(false)

    if (error) {
      console.error(error)
      toast.error(error.message || 'Unknown Error')
      return
    }

    toast.success(m.passwordResetSuccesful())
    window.location.replace('/')
  }

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <div className='w-[500px]'>
          <div className='flex flex-col'>
            <label htmlFor='password' className='font-medium text-black'>
              {m.newPassword()}:
            </label>
            <input type='password' name='password' className='bg-zinc-200 rounded p-2 mt-2 mb-3 text-black' required />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password2' className='font-medium text-black'>
              {m.newPasswordRetype()}:
            </label>
            <input type='password' name='password2' className='bg-zinc-200 rounded p-2 mt-2 mb-3 text-black' required />
          </div>
          <div className='mx-auto'>
            <Button type='submit' loading={loading} disabled={loading}>
              {m.savePassword()}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
