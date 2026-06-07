import * as React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  badge?: string;
}

export function PageHeader({
  title,
  description,
  badge,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "relative pt-12 pb-6 md:pt-16 md:pb-8 overflow-hidden border-b bg-background",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[80px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-primary/5 blur-[80px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-3xl">
          {badge && (
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-bold tracking-widest uppercase mb-3">
              {badge}
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3">
            {title}
          </h1>
          {description && (
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
