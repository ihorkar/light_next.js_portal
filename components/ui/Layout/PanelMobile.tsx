export default function PanelMobile({ children }: { children: React.ReactNode }) {
    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                {children}
            </div>
        </div>
    )
  }
