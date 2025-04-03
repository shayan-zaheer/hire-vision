import Link from "next/link";

interface Children {
  children: React.ReactNode;
}

function Modal({ children }: Children) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-[80%] h-[80%] p-4 rounded-md relative">
                {children}
                <Link href="/resumes" className="absolute top-2 right-2 text-black">
                    Close
                </Link>
            </div>
        </div>
    );
}

export default Modal;