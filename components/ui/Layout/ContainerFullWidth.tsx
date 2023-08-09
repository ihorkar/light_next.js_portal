export default function ContainerFullWidth({ children }: { children: React.ReactNode }) {
  return <div className="
                  py-10 
                  lg:pl-72
                  mx-auto 
                  max-w-7xl 
                  flex-grow 
                  sm:px-6 
                  lg:px-8 
                  bg-white
                  xl:px-20
                  md:px-10
                  sm:px-2
                  px-4
                  ">{children}</div>
}