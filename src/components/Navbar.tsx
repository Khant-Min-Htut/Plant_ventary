import { HomeIcon, LogIn, LogOut, Sprout } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import ModeToggle from "./ModeToggle";
import { stackServerApp } from "@/stack";
import { getUserDetails } from "@/actions/user.action";
import { UserButton } from "@stackframe/stack";

async function Navbar() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
  const userProfile = await getUserDetails(user?.id);

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop:blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/* ✅ Logo Section (responsive) */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-primary font-mono tracking-wider flex flex-col items-center leading-tight"
            >
              <span className="text-2xl">🌱</span>
              <span className="text-sm sm:hidden">Plantventary</span>
              <span className="hidden sm:inline">Plantventary</span>
            </Link>
          </div>

          {/* 👋 Greeting (desktop only) */}
          {userProfile?.name && (
            <span className="hidden md:inline text-[24px] font-bold text-gray-600 dark:text-gray-300">
              {`Hello, ${userProfile?.name.split(" ")[0]}`}
            </span>
          )}

          {/* 💻 Desktop Navbar */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/plants">
                <Sprout className="w-4 h-4" />
                <span className="hidden lg:inline">Plants</span>
              </Link>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                <span className="hidden lg:inline">Home</span>
              </Link>
            </Button>
            <ModeToggle />
            {user ? (
              <>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link href={app.signOut}>
                    <LogOut className="w-4 h-4" />
                    <span className="hidden lg:inline">Sign Out</span>
                  </Link>
                </Button>
                <UserButton />
              </>
            ) : (
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                asChild
              >
                <Link href={app.signIn}>
                  <LogIn className="w-4 h-4" />
                  <span className="hidden lg:inline">Sign In</span>
                </Link>
              </Button>
            )}
          </div>

          {/* 📱 Mobile Navbar (icons + account icon) */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Home */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <HomeIcon className="w-5 h-5" />
              </Link>
            </Button>

            {/* Plants */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/plants">
                <Sprout className="w-5 h-5" />
              </Link>
            </Button>

            {/* Theme toggle */}
            <ModeToggle />

            {/* Sign In / Out + Account Icon */}
            {user ? (
              <>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={app.signOut}>
                    <LogOut className="w-5 h-5" />
                  </Link>
                </Button>
                {/* 👤 Account avatar */}
                <div className="flex items-center">
                  <UserButton />
                </div>
              </>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link href={app.signIn}>
                  <LogIn className="w-5 h-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
