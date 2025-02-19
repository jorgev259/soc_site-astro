import { useEffect, useState, type FormEvent } from 'react'
import toast from 'react-hot-toast'

import * as m from 'paraglide/messages.js'
import Button from 'components/Button'
import Modal from 'components/Modal'
import { forgetPassword, signIn } from 'utils/auth-client'
import type { SetState } from 'types'

type FormOptions = 'login' | 'forgor'

export default function LoginBtn() {
  const [currentForm, setForm] = useState<FormOptions>('login')
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Button className='rounded-t-none' onClick={() => setModalOpen(true)}>
        {m.login()}
      </Button>
      {modalOpen ? (
        <Modal setOpen={setModalOpen}>
          {currentForm === 'login' ? <LoginForm setForm={setForm} setModalOpen={setModalOpen} /> : null}
          {currentForm === 'forgor' ? <CreateForgorForm setForm={setForm} setModalOpen={setModalOpen} /> : null}
        </Modal>
      ) : null}
    </>
  )
}

function LoginForm(props: { setForm: SetState<FormOptions>; setModalOpen: SetState<boolean> }) {
  const { setForm, setModalOpen } = props
  const [loading, setLoading] = useState(false)

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget)
    const variables = Object.fromEntries(formData)

    setLoading(true)
    const { error } = await signIn.username(
      {
        username: variables.username as string,
        password: variables.password as string
      },
      {}
    )
    setLoading(false)

    if (error) {
      console.error(error)
      toast.error(error.message || 'Unknown Error')
      return
    }

    setModalOpen(false)
    location.reload()
  }

  return (
    <div className='flex gap-y-2 justify-center flex-col'>
      <form method='post' onSubmit={handleSubmit}>
        <div className='flex gap-x-4'>
          <div className='flex flex-col'>
            <label htmlFor='username' className='font-medium text-black'>
              {m.username()}:
            </label>
            <input type='text' name='username' className='bg-zinc-200 rounded-md p-2 mt-2 mb-3 text-black' required />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password' className='font-medium text-black'>
              {m.password()}:
            </label>
            <input
              type='password'
              name='password'
              className='bg-zinc-200 rounded-md p-2 mt-2 mb-3 text-black'
              required
            />
          </div>
        </div>
        <div className='flex'>
          <Button loading={loading} disabled={loading} className='mx-auto px-6'>
            {m.login()}
          </Button>
        </div>
      </form>

      <div className='mx-auto'>
        <Button
          onClick={() => {
            setForm('forgor')
          }}
        >
          {m.recoverPassword()}
        </Button>
      </div>
    </div>
  )
}

function CreateForgorForm(props: { setForm: SetState<FormOptions>; setModalOpen: SetState<boolean> }) {
  const { setForm, setModalOpen } = props
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    return () => {
      setForm('login')
    }
  }, [])

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget)
    const email = formData.get('email')

    if (!email) return

    setLoading(true)
    const { error } = await forgetPassword({ email: email as string, redirectTo: '/forgor' })
    setLoading(false)

    if (error) {
      console.error(error)
      toast.error(error.message || 'Unknown Error')
      return
    }

    toast.success(m.emailSuccess())
    setModalOpen(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='w-[500px]'>
        <div className='flex flex-col'>
          <label htmlFor='email' className='font-medium text-black'>
            {m.email()}:
          </label>
          <input type='email' name='email' className='bg-zinc-200 rounded-md p-2 mt-2 mb-3 text-black' required />
        </div>
        <div className='mx-auto'>
          <Button loading={loading} disabled={loading}>
            {m.recoverPassword()}
          </Button>
        </div>
      </div>
    </form>
  )
}
