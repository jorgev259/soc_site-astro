import * as m from 'paraglide/messages.js'
import { useState, type FormEvent } from 'react'
import toast from 'react-hot-toast'

import Button from 'components/Button'
import { Input } from 'components/form/Input'
import Modal from 'components/Modal'
import type { User } from 'auth/auth-server'
import { editProfileSchema } from 'schemas/user'

import ProfileIcon from 'img/icons/profile.svg?react'

interface Props {
  user: User
}

export default function EditProfileButton(props: Props) {
  const { user } = props
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!user) return

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget)
    const result = editProfileSchema.safeParse(formData)

    if (!result.success) return

    setLoading(true)
    fetch('/api/user/profile', { body: formData, method: 'PATCH' })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText)

        toast.success(m.profileUpdated())
        setShowModal(false)
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
      <button
        className='hover:underline flex items-center gap-x-1'
        onClick={() => {
          setShowModal(true)
        }}
      >
        <ProfileIcon className='h-[18px] w-auto' stroke='white' />
        Edit profile
      </button>
      {showModal ? (
        <Modal setOpen={setShowModal}>
          <form onSubmit={handleSubmit}>
            <input hidden name='userId' value={user.id} readOnly />
            <div className='px-4 pt-5 pb-4 gap-x-4 gap-y-1 flex flex-col'>
              <div className='flex gap-x-4'>
                <Input name='username' label={m.username()} defaultValue={user.username} />
                <Input name='name' label={m.displayName()} defaultValue={user.name} />
              </div>
              <Input name='profilePic' type='file' label={m.profilePic()} accept='image/*' />
              <Input name='email' type='email' label={m.email()} defaultValue={user.email} />
              <div className='mx-auto'>
                <Button type='submit' loading={loading} disabled={loading}>
                  {m.saveChanges()}
                </Button>
              </div>
            </div>
          </form>
        </Modal>
      ) : null}
    </>
  )
}
