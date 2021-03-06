import {
  Form,
  Label,
  TextField,
  FieldError,
  Submit,
  useMutation,
} from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import { useState } from 'react'

const SINGUP_USER = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`
const SignupPage = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [signup] = useMutation(SINGUP_USER, {
    onCompleted: (createUser) => {
      localStorage.setItem('authToken', createUser.token)

      setState({ name: '', email: '', password: '' })

      setTimeout(() => {
        navigate(routes.home())
      }, 2000)
    },
  })

  const onSubmit = () => {
    console.log('on submit', state)

    signup({
      variables: {
        input: {
          name: state.name,
          email: state.email,
          password: state.password,
        },
      },
    })
  }

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Sign Up
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form onSubmit={onSubmit}>
            <div>
              <Label
                htmlFor="name"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Name
              </Label>
              <div className="mt-1 rounded-md shadow-sm">
                <TextField
                  id="name"
                  type="text"
                  name="name"
                  value={state.name}
                  onChange={onChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  validation={{
                    required: true,
                  }}
                />
              </div>

              <FieldError name="email" className="text-red-500 text-xs" />
            </div>
            <div className="mt-6">
              <Label
                htmlFor="email"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Email address
              </Label>
              <div className="mt-1 rounded-md shadow-sm">
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={onChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  validation={{
                    required: true,
                    pattern: {
                      value: /[^@]+@[^\.]+\..+/,
                    },
                  }}
                />
              </div>

              <FieldError name="email" className="text-red-500 text-xs" />
            </div>

            <div className="mt-6">
              <Label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Password
              </Label>
              <div className="mt-1 rounded-md shadow-sm">
                <TextField
                  id="password"
                  type="password"
                  name="password"
                  value={state.password}
                  onChange={onChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  validation={{ required: true }}
                />
              </div>
              <FieldError name="password" className="text-red-500 text-xs" />
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <Submit className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                  Sign Up
                </Submit>
              </span>
            </div>
          </Form>
        </div>
      </div>
      <div className="mx-auto mt-5">
        Already Have an Account?{' '}
        <a
          className="cursor-pointer text-purple-600"
          onClick={() => {
            navigate(routes.login())
          }}
        >
          Login
        </a>
      </div>
    </div>
  )
}

export default SignupPage
