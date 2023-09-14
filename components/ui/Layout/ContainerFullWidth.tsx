export default function ContainerFullWidth({ children }: { children: React.ReactNode }) {
  return <div className="
                  h-screen
                  overflow-y-auto
                  py-10 
                  lg:pl-10
                  flex-grow 
                  sm:px-6 
                  lg:px-8 
                  bg-white
                  xl:px-20
                  md:px-10
                  px-4
                  w-full
                  ">{children}</div>
}