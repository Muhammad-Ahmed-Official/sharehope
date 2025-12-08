

export default async function PaymentSuccess({searchParams}: {searchParams: Promise <{ amount: string }> }) {
  const { amount }= await searchParams;
  return (
<main className="min-h-screen flex items-center justify-center bg-hero-gradient p-6">
      <div className="bg-glass shadow-glow-secondary rounded-2xl max-w-md w-full p-10 text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 mx-auto flex items-center justify-center rounded-full bg-secondary/20 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-secondary-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-extrabold text-gradient-secondary mb-2">
          Thank You!
        </h1>
        <h2 className="text-lg text-muted-foreground mb-6">
          Your donation was successful
        </h2>

        <div className="bg-secondary/10 text-gradient-secondary rounded-xl font-bold text-3xl py-4 px-8 mb-4 shadow-glow-secondary inline-block">
          Rs {amount}
        </div>

        <p className="text-muted-foreground mt-2">
          Your contribution makes a real difference!
        </p>
      </div>
    </main>
  );
}