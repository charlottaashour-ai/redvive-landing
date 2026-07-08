/*
 * REDVIVE — ScarcityBar
 * Fixed below navbar on all pages.
 * Design: near-black bg, blush-white copy, pulsing #D53E0F dot.
 * Mobile: shortened copy. Desktop: full copy.
 */

export default function ScarcityBar() {
  return (
    <>
      <style>{`
        @keyframes scarcityPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.35); }
        }
      `}</style>
      <div
        className="fixed left-0 right-0 z-[49] top-16 lg:top-20 flex items-center justify-center"
        style={{
          height: "34px",
          backgroundColor: "#0A0303",
          borderBottom: "1px solid rgba(245,237,235,0.07)",
        }}
      >
        {/* Desktop copy */}
        <span
          className="hidden md:flex items-center gap-2 text-[0.62rem] font-semibold tracking-[0.18em] uppercase select-none"
          style={{ color: "#F5EDEB", fontFamily: "'DM Sans', sans-serif", opacity: 0.88 }}
        >
          <span
            style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#D53E0F",
              flexShrink: 0,
              animation: "scarcityPulse 1.8s ease-in-out infinite",
            }}
          />
          99 founding member spots &nbsp;·&nbsp; €29/month &nbsp;·&nbsp; locked in for life
        </span>

        {/* Mobile copy */}
        <span
          className="flex md:hidden items-center gap-2 text-[0.58rem] font-semibold tracking-[0.16em] uppercase select-none"
          style={{ color: "#F5EDEB", fontFamily: "'DM Sans', sans-serif", opacity: 0.88 }}
        >
          <span
            style={{
              display: "inline-block",
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              backgroundColor: "#D53E0F",
              flexShrink: 0,
              animation: "scarcityPulse 1.8s ease-in-out infinite",
            }}
          />
          99 founding spots &nbsp;·&nbsp; €29/month
        </span>
      </div>

      {/* Spacer so page content clears both navbar (64px/80px) + bar (34px) */}
      <div className="h-[34px] md:hidden" />
    </>
  );
}
