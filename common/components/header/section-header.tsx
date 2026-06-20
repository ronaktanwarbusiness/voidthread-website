import React from "react";

export function SectionHeader({ title, description }: ISectionHeaderProps) {
  return (
    <div>
      <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-center lg:text-left">
        {title}
      </h2>
      <p className="text-muted-foreground text-base max-w-xl text-center lg:text-left">
        {description}
      </p>
    </div>
  );
}

interface ISectionHeaderProps {
  title: string;
  description: string;
}
