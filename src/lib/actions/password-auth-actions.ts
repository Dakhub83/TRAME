"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/password";
import { CLIENT_SESSION_COOKIE } from "@/lib/client-auth";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

const signupSchema = z.object({
  fullName: z.string().trim().min(2, "Nom complet requis (2 caractères minimum)."),
  email: z.string().trim().toLowerCase().email("Email invalide."),
  phone: z.string().trim().min(8, "Numéro de téléphone invalide.").optional().or(z.literal("")),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Email invalide."),
  password: z.string().min(1, "Mot de passe requis."),
});

type ActionResult = { ok: true } | { ok: false; error: string };

async function setClientSession(email: string) {
  const cookieStore = await cookies();
  cookieStore.set(CLIENT_SESSION_COOKIE, email, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function signupAction(input: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}): Promise<ActionResult> {
  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const { fullName, email, phone, password } = parsed.data;
  const passwordHash = await hashPassword(password);

  try {
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        phoneNumber: phone || null,
        passwordHash,
        loyaltyAccount: { create: {} },
      },
    });

    await setClientSession(user.email);
    return { ok: true };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { ok: false, error: "Un compte existe déjà avec cet email." };
    }

    console.error("Unexpected error creating account", error);
    return { ok: false, error: "Impossible de créer le compte pour le moment. Réessayez plus tard." };
  }
}

export async function passwordLoginAction(input: {
  email: string;
  password: string;
}): Promise<ActionResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const { email, password } = parsed.data;

  let user;
  try {
    user = await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    console.error("Unexpected error looking up account", error);
    return { ok: false, error: "Impossible de contacter le serveur. Réessayez plus tard." };
  }

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { ok: false, error: "Email ou mot de passe incorrect." };
  }

  await setClientSession(user.email);
  return { ok: true };
}
