export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b0f14]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
            <span className="text-xs font-semibold text-slate-100">OS</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight text-slate-100">
              OpScale
            </span>
            <span className="text-xs text-slate-500">Wholesale OS</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 sm:text-sm">
          &copy; {new Date().getFullYear()} OpScale. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
