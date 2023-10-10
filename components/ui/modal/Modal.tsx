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
                    <div className="briggs-headingLg mb-[13px]">{title}</div>
                    <div>{children}</div>
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
                    <div className="flex justify-center briggs-headingLg pb-[13px]">{title}</div>
                    <div className="mb-8">{children}</div>
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
  
//   <>
//   <div
//     className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed z-50 inset-0 outline-none focus:outline-none"
//   >
//     <div className="relative w-auto my-6 mx-auto max-w-3xl">
//       {/*content*/}
//       <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//         {/*header*/}
//         { type === "secondary" ? <div className="flex items-start justify-between p-5 rounded-t">
//           <h3 className="briggs-headingLg">
//             {title}
//           </h3>
//           <button
//             className="p-1 ml-auto bg-transparent text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//             onClick={onCancelClick}
//           >
//             <span className="bg-transparent text-black opacity-100 h-6 w-6 text-2xl block outline-none focus:outline-none">
//               <XMarkIcon />
//             </span>
//           </button>
//         </div> : <div className="w-full p-5">
//           <div className="flex justify-center pb-[22px]">
//             {type === "critical" ? 
//             <span className="bg-transparent text-actioncriticaldefault opacity-100 h-[60px] w-[60px] text-2xl block"><InformationCircleIcon /></span> :
//             <span className="bg-transparent text-actionprimarydefault opacity-100 h-[60px] w-[60px] text-2xl block"><CheckCircleIcon /></span>
//             }
//           </div>
//           <h3 className="briggs-headingLg text-center">
//             {title}
//           </h3>
//         </div>
//         }
//         {/*body*/}
//         <div className="relative p-6 flex-auto briggs-bodyMd">
//             {children}
//         </div>
//         {/*footer*/}
//         <div className="flex items-center justify-end p-6 rounded-b briggs-bodyMd">
//           {cancel_text && <DefaultButton
//             type="secondary"
//             onClick={onCancelClick}
//             label={cancel_text}
//           />}
//           <DefaultButton
//             type={type === "secondary" ? "primary" : type}
//             onClick={onOkClick}
//             label={ok_text}
//           />
//         </div>
//       </div>
//     </div>
//  </div>
//  <div className="opacity-25 fixed inset-0 bg-black" onClick={onCancelClick}></div>
// </>