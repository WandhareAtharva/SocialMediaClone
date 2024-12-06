import GoogleLoginButton from "../Components/GoogleLoginButton.jsx";

export default function Landing() {
    return (
        <>
            <div className="flex bg-black h-[100vh] w-[100vw]">
                <div className="flex flex-col w-[55vw] h-[100vh] p-[11rem]">
                    <svg viewBox="0 0 24 24" aria-hidden="true" fill='white' className="">
                        <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g>
                    </svg>
                </div>
                <div className="flex flex-col w-[45vw] h-[100vh] px-2 py-[6rem]">
                    <h1 className="poppins-extrabold text-6xl mb-16">Happening now</h1>
                    <h2 className="poppins-bold text-3xl">Join today.</h2>
                    <form action="">
                        <button>Login</button>
                        <GoogleLoginButton />
                    </form>
                </div>
            </div>
        </>
    )
}