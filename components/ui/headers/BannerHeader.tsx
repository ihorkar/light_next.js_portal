import Head from "next/head";


const profile = {
  name: 'Form header',
  email: 'form description',
  avatar:
    '/charitypic.jpg?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  backgroundImage:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
}

interface HeaderProps {
    Headline: string;
    Description: string;
    Avatar: string;
    BackgroundImage: string;
    ButtonText: string;
    onClick: () => void;

}

export const BannerHeader: React.FC<HeaderProps> = ({
    Headline, Description, Avatar, BackgroundImage, ButtonText, onClick}
        ) => {

  return (
    <div className= "bg-white rounded-lg pb-2">
      <div>
        <img className="h-32 w-full object-cover lg:h-48 rounded-t-lg" src={BackgroundImage} alt="" />
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <img className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32" src={Avatar} alt="" />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="pt-4 mt-6 min-w-0 flex-1 sm:hidden md:block">
                <div>
                    <h1 className="truncate text-2xl font-bold text-gray-900">{Headline}</h1>
                    <h5 className="mb-2 text-l font-normal tracking-tight text-gray-400">{Description}</h5>
                </div>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <button
                type="button"
                onClick={onClick}
                className="inline-flex justify-center rounded-md bg-actionprimarydefault px-6 py-3 text-sm font-semibold text-descriptivesecondary shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <span>{ButtonText}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold text-gray-900">{Headline}</h1>
        </div>
      </div>
    </div>
  )
}