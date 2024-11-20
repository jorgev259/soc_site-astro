import { GraphQLError } from 'graphql'
import { ApolloServerErrorCode } from '@apollo/server/errors'

export const AuthenticationError = (message: string = 'Authentication Error') =>
  new GraphQLError(message, { extensions: { code: 'UNAUTHENTICATED' } })

export const ForbiddenError = (message: string = 'Forbidden') =>
  new GraphQLError(message, { extensions: { code: 'FORBIDDEN' } })

export const UserInputError = (message: string = 'Bad input') =>
  new GraphQLError(message, {
    extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT }
  })
