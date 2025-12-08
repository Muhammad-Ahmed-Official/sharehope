
export function RecentDonationSkelton() {
  return (
    <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
            <div
            key={i}
            className="flex items-start justify-between pb-4 border-b border-border last:border-0 last:pb-0"
            >
            {/* Left side */}
            <div className="w-full">
                <div className="h-4 w-32 bg-muted rounded-md"></div>

                <div className="h-3 w-48 bg-muted rounded-md mt-2"></div>

                <div className="h-3 w-20 bg-muted rounded-md mt-2"></div>
            </div>

            {/* Right side */}
            <div className="text-right">
                <div className="h-4 w-16 bg-muted rounded-md"></div>
            </div>
            </div>
        ))}
    </div>
  )
};


export function NgosCardSkelton() {
    return(
    <div className="space-y-4 animate-pulse">
    {[1, 2, 3].map((i) => (
        <div
        key={i}
        className="bg-card border border-border rounded-2xl p-5 shadow-soft"
        >
        <div className="flex gap-4">
            {/* Image */}
            <div className="w-20 h-20 bg-muted rounded-xl shrink-0" />

            {/* Content */}
            <div className="flex-1 min-w-0">
            {/* Title & Location */}
            <div className="flex items-start justify-between gap-2">
                <div>
                {/* NGO Name */}
                <div className="h-5 w-40 bg-muted rounded-md mb-2"></div>

                {/* Location */}
                <div className="flex items-center gap-3 mt-1">
                    <div className="h-3 w-24 bg-muted rounded-md"></div>
                </div>
                </div>

                {/* Match Score or Badge */}
                <div className="h-5 w-12 bg-muted rounded-full shrink-0"></div>
            </div>

            {/* Description */}
            <div className="mt-2 space-y-1">
                <div className="h-3 w-full bg-muted rounded-md"></div>
                <div className="h-3 w-5/6 bg-muted rounded-md"></div>
            </div>

            {/* Raised Amount & Button */}
            <div className="flex items-center justify-between mt-4">
                <div className="h-3 w-32 bg-muted rounded-md"></div>
                <div className="h-8 w-24 bg-muted rounded-md"></div>
            </div>
            </div>
        </div>
        </div>
    ))}
    </div>
    )
}
