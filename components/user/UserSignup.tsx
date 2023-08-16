import DefaultInput from '../ui/elements/DefaultInput'

export default function UserSignUp() {
  return (
    <form className="w-full max-w-lg mx-auto bg-gray-100 p-8 rounded-lg shadow-md">
      <div className="space-y-12 sm:space-y-16 p-8">
        <div>
          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Username
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <DefaultInput 
                        name="username"
                        id="username"
                        autoComplete="username"
                        placeholder="username"
                    />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Email
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <DefaultInput 
                        name="email"
                        id="email"
                        autoComplete="email"
                        placeholder="email"
                    />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                First Name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <DefaultInput 
                        name="firstName"
                        id="firstName"
                        autoComplete="firstName"
                        placeholder="First Name"
                    />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Last Name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <DefaultInput 
                        name="lastname"
                        id="lastname"
                        autoComplete="lastname"
                        placeholder="Last Name"
                    />
              </div>
            </div>
        </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}
