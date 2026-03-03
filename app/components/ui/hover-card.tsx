"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

// basic styling copied from typical shadcn setup; adjust colors as needed
const contentBaseClasses = 
  "z-50 w-64 rounded-md border border-gray-200 bg-white p-4 text-sm text-gray-900 shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-100";

export const HoverCard = HoverCardPrimitive.Root;
export const HoverCardTrigger = HoverCardPrimitive.Trigger;

export const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={`${contentBaseClasses} ${className ?? ""}`}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;
