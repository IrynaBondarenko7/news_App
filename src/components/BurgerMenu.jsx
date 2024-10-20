import { Fragment } from "react";
import { Button, Dialog, DialogPanel, Transition } from "@headlessui/react";
import { MdClose } from "react-icons/md";

export const BurgerMenu = ({ isOpen, close, children }) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10  overflow-y-auto w-screen backdrop-blur-sm bg-white/5">
        <div className="flex min-h-full items-center justify-end ">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-x-full"
            enterTo="-translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="-translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel
              transition
              className="w-[70%] h-dvh max-w-md  p-6 bg-white duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <Button
                aria-label="close menu"
                className="block ml-auto mb-20 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                onClick={close}
              >
                <MdClose />
              </Button>
              <div className="flex flex-col justify-center items-center gap-5">
                {children}
              </div>
            </DialogPanel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  );
};
