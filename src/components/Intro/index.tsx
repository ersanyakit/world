
const Intro = (props:{onClose:Function}) => {


    return (
        <div className="w-full flex flex-col gap-2 text-center justify-center text-white">
            <section>

                <header className="rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white p-8 text-center">
                    <h1 className="text-5xl font-extrabold mb-4">
                        Your Map to Financial Freedom
                    </h1>
                    <p className="text-xl">
                        Join <strong>MillionarMap</strong> today and start building your wealth—one token at a time.
                    </p>
                </header>


                <main className="max-w-4xl mx-auto p-6">
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-yellow-600 mb-6 text-center">
                            Turn Exploration into Wealth
                        </h2>
                        <p className="text-lg mb-6 text-center">
                            Imagine a world where every pin on a map represents an opportunity to grow your
                            fortune. With <strong>MillionarMap</strong>, this dream becomes your reality.
                        </p>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="p-6 bg-black/50 rounded-lg shadow">
                                <h3 className="text-xl font-bold text-yellow-600 mb-2">
                                    Pin Tokens
                                </h3>
                                <p>
                                    Create your wealth blueprint by pinning tokens anywhere on the map.
                                    Each token is a treasure that others can claim.
                                </p>
                            </div>
                            <div className="p-6 bg-black/50 rounded-lg shadow">
                                <h3 className="text-xl font-bold text-yellow-600 mb-2">
                                    Claim Rewards
                                </h3>
                                <p>
                                    Explore the map, find hidden tokens, and claim them as your own.
                                    Every claim is a step closer to financial success.
                                </p>
                            </div>
                            <div className="p-6 bg-black/50 rounded-lg shadow">
                                <h3 className="text-xl font-bold text-yellow-600 mb-2">
                                    Earn with Referrals
                                </h3>
                                <p>
                                    Share your journey with others. For every user who joins through
                                    your referral, you earn a commission on their contributions and claims.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12 bg-yellow-50 text-black p-6 rounded-lg shadow">
                        <h2 className="text-3xl font-bold text-yellow-600 mb-4 text-center">
                            Why MillionarMap Works
                        </h2>
                        <ul className="list-disc list-inside text-lg space-y-4">
                            <li>
                                <strong>Unlimited Potential:</strong> A global map with endless
                                opportunities for growth and rewards.
                            </li>
                            <li>
                                <strong>Low Risk, High Reward:</strong> Start small and watch your
                                contributions turn into massive returns.
                            </li>
                            <li>
                                <strong>Community-Driven Success:</strong> Join a thriving community
                                of explorers and contributors.
                            </li>
                            <li>
                                <strong>Proven System:</strong> A referral-based reward model designed
                                to multiply your earnings effortlessly.
                            </li>
                        </ul>
                    </section>

                    <section className="text-center">
                        <h2 className="text-3xl font-bold text-yellow-600 mb-4">
                            Are You Ready to Build Your Wealth?
                        </h2>
                        <p className="text-lg mb-6">
                            The map is waiting. Start pinning, start exploring, and start claiming
                            the financial freedom you deserve.
                        </p>
                        <button onClick={()=>{
                            props.onClose();
                        }} className="bg-yellow-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-700">
                            Get Started Now
                        </button>
                    </section>
                </main>

                <footer className="bg-gray-800 text-white text-center py-6 mt-12">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} MillionarMap. Your journey to wealth starts here.
                    </p>
                </footer>


            </section>
        </div>

    )
}

export default Intro;
