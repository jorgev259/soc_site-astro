import toast from 'react-hot-toast'

document.getElementById('editAlbum')?.addEventListener('submit', async (e: SubmitEvent) => {
  e.preventDefault()
  const formData = new FormData(e.target as HTMLFormElement)

  document.getElementById('editAlbumSubmit')?.classList.add('loading')
  const response = await fetch('/api/album/edit', { method: 'POST', body: formData })
  document.getElementById('editAlbumSubmit')?.classList.remove('loading')

  if (response.ok) {
    toast.success('Album updated successfully')
  } else {
    toast.error(response.statusText)
  }
})
