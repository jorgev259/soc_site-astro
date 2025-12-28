import * as z from 'zod'
import { zfd } from 'zod-form-data'

export const signUpSchema = zfd.formData({
  username: zfd.text(),
  name: zfd.text(),
  email: z.email(),
  password: zfd.text(),
  profilePic: zfd.file().optional()
})

export const editProfileSchema = zfd.formData({
  userId: zfd.text(),
  username: zfd.text().optional(),
  name: zfd.text().optional(),
  email: z.email().optional(),
  profilePic: zfd.file(z.instanceof(File).optional())
})
