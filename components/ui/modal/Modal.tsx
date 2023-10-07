'use client'

import DefaultButton from "../buttons/DefaultButton";
import { XMarkIcon, InformationCircleIcon, CheckCircleIcon } from "@heroicons/react/20/solid";

interface ModalProps {
    visible: boolean;
    onOkClick: () => void;
    onCancelClick: () => void;
    children?: React.ReactNode;
    title: string;
    ok_text: string;
    cancel_text?: string;
    type: 'primary' | 'secondary' | 'critical';
}

const Modal = ({ visible, onOkClick, onCancelClick, children, title, ok_text, cancel_text, type }: ModalProps) => {
    return (

      <>
        {visible ? (
           <>
           <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                { type === "secondary" ? <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="briggs-headingLg">
                    {title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onCancelClick}
                  >
                    <span className="bg-transparent text-black opacity-100 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <XMarkIcon />
                    </span>
                  </button>
                </div> : <div className="w-full p-5">
                  <div className="flex justify-center">
                    {type === "critical" ? 
                    <span className="bg-transparent text-actioncriticaldefault opacity-100 h-14 w-14 text-2xl block"><InformationCircleIcon /></span> :
                    <span className="bg-transparent text-actionprimarydefault opacity-100 h-14 w-14 text-2xl block"><CheckCircleIcon /></span>
                    }
                  </div>
                  <h3 className="briggs-headingLg text-center">
                    {title}
                  </h3>
                </div>
                }
                {/*body*/}
                <div className="relative p-6 flex-auto briggs-bodyMd">
                    {children}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 rounded-b briggs-bodyMd">
                {/* border-t border-solid border-slate-200 */}
                  {cancel_text && <DefaultButton
                    type="secondary"
                    onClick={onCancelClick}
                    label={cancel_text}
                  />}
                  <DefaultButton
                    type={type === "secondary" ? "primary" : type}
                    onClick={onOkClick}
                    label={ok_text}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
       </>
        ) : null}
      </>
    );
  };
  
  export default Modal;