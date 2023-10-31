export default function Home() {
    return (
        <section className="md-flex items-center w-full max-w-7xl px-8 py-12 mx-auto box-border">
            <div className="md-w-1/2 text-left md-mt-6 text-center box-border px-8">
                <h2 className="text-primary text-4xl">Lorem Ipsum</h2>
                <p className="text-sm text-gray-600 font-light leading-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
            <div className="md-w-1/2 px-8 text-center box-border">
                <img className="md-mt-6 w-full rounded-lg drop-shadow-lg"
                     src="/img/hero-01.jpeg" alt="Städfint"/>
            </div>
        </section>
    );
}
