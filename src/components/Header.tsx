import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { navLinks, site } from "@/data/site"
import { Button } from "@/components/Button"
import { cn } from "@/lib/utils"

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-border/80 bg-background/95 backdrop-blur shadow-sm"
          : "border-transparent bg-background/80 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <Link to="/" className="flex items-center gap-3 min-w-0">
          <img
            src={site.logo}
            alt="Durga's Dry Cleaning & Laundry Logo"
            className="h-11 w-11 rounded-full object-cover ring-2 ring-secondary/60 sm:h-12 sm:w-12"
          />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-bold text-primary sm:text-base">
              Durga's
            </p>
            <p className="truncate text-[10px] font-medium uppercase tracking-wide text-accent/80 sm:text-xs">
              Dry Cleaning & Laundry
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary/30 text-accent"
                    : "text-foreground hover:bg-secondary/20 hover:text-accent",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button to="/enquiry" size="sm">
            Book Now
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-3 py-3 text-sm font-medium",
                    isActive
                      ? "bg-secondary/30 text-accent"
                      : "text-foreground hover:bg-secondary/20",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-2 border-t border-border pt-3">
              <Button to="/enquiry" className="w-full">
                Book Now
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
