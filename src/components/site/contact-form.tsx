"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { type ContactState, sendContact } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const errors = state.status === "error" ? state.errors : {};

  useEffect(() => {
    if (state.status === "success") toast.success(state.message);
  }, [state]);

  return (
    <form action={action} className="grid gap-4" noValidate>
      <div className="grid gap-2">
        <Label htmlFor="name">Imię</Label>
        <Input id="name" name="name" autoComplete="name" />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name[0]}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" autoComplete="email" />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email[0]}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">Wiadomość</Label>
        <Textarea id="message" name="message" rows={4} />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message[0]}</p>
        )}
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Wysyłanie…" : "Wyślij"}
      </Button>
    </form>
  );
}
