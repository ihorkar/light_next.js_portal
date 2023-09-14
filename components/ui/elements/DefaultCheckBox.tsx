interface defaultCheckBoxProps {
    name: string,
    id: string,
    title: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    content?: string,
    checked?: boolean
}

export default function DefaultCheckBox({name, id, checked, title, content, onChange} : defaultCheckBoxProps) {
    return (
        <fieldset>
            <div className="space-y-5">
                <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                        <input
                        id="comments"
                        aria-describedby="comments-description"
                        name="comments"
                        type="checkbox"
                        onChange={onChange}
                        checked={checked}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                        <label htmlFor="comments" className="font-medium text-gray-900">
                        {title}
                        </label>
                        <p id="comments-description" className="text-gray-500">
                        {content}
                        </p>
                    </div>
                </div>
            </div>
        </fieldset>
    )
}