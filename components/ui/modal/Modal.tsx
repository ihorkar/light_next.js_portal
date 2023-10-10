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
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed z-50 inset-0 outline-none focus:outline-none">
            <div className="relative w-auto">
              <div className="flex-col items-end px-6 py-8 bg-white mx-auto z-50">
                {type === "secondary" ? 
                  <>
                    <div className="mb-[13px]"><p className="briggs-headingLg">{title}</p></div>
                    <div className="briggs-bodyMd">{children}</div>
                    <div className="flex justify-end gap-x-3 mt-8">
                      <DefaultButton
                        //@ts-ignore
                        label={cancel_text}
                        onClick={onCancelClick}
                        type="secondary"
                      />
                      <DefaultButton
                        label={ok_text}
                        onClick={onOkClick}
                        type="primary"
                      />
                    </div>
                  </> : <div className="w-[332px] mx-4">
                    <div className="flex justify-center">
                      {type === "critical" ? 
                        <span className="text-actioncriticaldefault opacity-100 h-[60px] w-[60px] p-2 block"><InformationCircleIcon /></span> :
                        <span className="text-actionprimarydefault opacity-100 h-[60px] w-[60px] p-2 block"><CheckCircleIcon /></span>
                      }
                    </div>
                    <div className="flex justify-center pb-[13px]"><p className="briggs-headingLg">{title}</p></div>
                    <div className="mb-8 briggs-bodyMd">{children}</div>
                    <div className="flex justify-around">
                      {cancel_text && <DefaultButton
                        type="secondary"
                        size="big"
                        onClick={onCancelClick}
                        label={cancel_text}
                      />}
                      <DefaultButton
                        type={type}
                        size="big"
                        onClick={onOkClick}
                        label={ok_text}
                      />
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 bg-black" onClick={onCancelClick}></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;