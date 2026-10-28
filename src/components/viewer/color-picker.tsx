"use client";

import { PaletteIcon } from "lucide-react";
import { RadioGroup } from "radix-ui";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Dictionary } from "@/content/en";
import { LIGHT_COLOR_IDS, LIGHT_COLORS, type LightColor } from "./light-colors";

// Jeden przycisk, który rozwija panel z kolorami światła. Klik lub dotknięcie koloru zamyka panel.
// Strzałki na klawiaturze zmieniają kolor od razu (Radix klika wtedy pole sam, z detail 0),
// a panel zostaje otwarty do Escape.
export function ColorPicker({
  t,
  value,
  onChange,
  className,
}: {
  t: Dictionary["viewer"];
  value: LightColor;
  onChange: (color: LightColor) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={className}
          aria-label={t.color}
          title={t.color}
        >
          <PaletteIcon className="size-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        sideOffset={10}
        className="w-auto rounded-lg p-2"
      >
        <RadioGroup.Root
          aria-label={t.color}
          value={value}
          onValueChange={(color) => onChange(color as LightColor)}
          className="flex gap-2"
        >
          {LIGHT_COLOR_IDS.map((id) => (
            <RadioGroup.Item
              key={id}
              value={id}
              aria-label={t.colors[id]}
              title={t.colors[id]}
              onClick={(event) => event.detail > 0 && setOpen(false)}
              style={{ backgroundColor: LIGHT_COLORS[id].glow }}
              className="press size-9 rounded-md border border-foreground/20 outline-offset-4 data-[state=checked]:ring-2 data-[state=checked]:ring-foreground data-[state=checked]:ring-offset-2 data-[state=checked]:ring-offset-popover"
            />
          ))}
        </RadioGroup.Root>
      </PopoverContent>
    </Popover>
  );
}
