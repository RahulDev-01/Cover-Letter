import { AppLogo } from "./icons";

export function Header() {
  return (
    <header className="px-4 md:px-8 py-4 border-b border-border/50">
      <div className="flex items-center gap-3 max-w-screen-2xl mx-auto">
        <AppLogo className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold font-headline text-primary">
          Cover Letter Pro
        </h1>
      </div>
    </header>
  );
}
