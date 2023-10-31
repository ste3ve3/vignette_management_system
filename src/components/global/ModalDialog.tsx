import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from 'react';
import IconX from "../Icon/IconX";

interface ModalDialogProps {
    modalVisibility: boolean;
    setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    body: React.ReactNode;
    hideSubmitButtons?: boolean;
}

const ModalDialog = ({ modalVisibility, setModalVisibility, title, body, hideSubmitButtons }: ModalDialogProps) => {
  return (
    <Transition appear show={modalVisibility} as={Fragment}>
        <Dialog as="div" open={modalVisibility} onClose={() => setModalVisibility(false)} className="relative z-[51]">
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-[black]/60" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center px-4 py-8">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                            <button
                                type="button"
                                onClick={() => setModalVisibility(false)}
                                className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                            >
                                <IconX />
                            </button>
                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                {title}
                            </div>
                            <div className="p-5">
                                <form>
                                    {body}
                                    {
                                        !hideSubmitButtons && 
                                        <div className="ltr:text-right rtl:text-left flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => setModalVisibility(false)}>
                                                Cancel
                                            </button>
                                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                Save
                                            </button>
                                        </div>
                                    }
                                </form>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
  )
}

export default ModalDialog