import { GraphQLError } from 'graphql'
import { ApolloServerErrorCode } from '@apollo/server/errors'

export const AuthenticationError = (message: string = '') =>
  new GraphQLError(message, { extensions: { code: 'UNAUTHENTICATED' } })

export const ForbiddenError = (message: string = '') =>
  new GraphQLError(message, { extensions: { code: 'FORBIDDEN' } })

export const UserInputError = (message: string = '') =>
  new GraphQLError(message, {
    extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT }
  })
