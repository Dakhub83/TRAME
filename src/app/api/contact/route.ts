import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

/**
 * Burkina Faso local mobile numbers are 8 digits, optionally written with
 * the +226 country code and separated by spaces, dots, or dashes, e.g.
 * "70123456", "70 12 34 56", "+226 70-12-34-56".
 */
const XOF_PHONE_PATTERN = /^(\+?226[\s.-]?)?[0-9]{2}([\s.-]?[0-9]{2}){3}$/;

const contactSubmissionSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "fullName must be at least 2 characters")
    .max(120, "fullName must be at most 120 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("email must be a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(XOF_PHONE_PATTERN, "phone must be a valid Burkina Faso (XOF) phone number"),
  message: z
    .string()
    .trim()
    .min(10, "message must be at least 10 characters")
    .max(2000, "message must be at most 2000 characters"),
});

type ContactSubmissionPayload = z.infer<typeof contactSubmissionSchema>;

type SuccessResponseBody = {
  success: true;
  data: {
    id: string;
    createdAt: string;
  };
};

type ErrorResponseBody = {
  success: false;
  error: {
    message: string;
    issues?: Array<{ path: string; message: string }>;
  };
};

function jsonError(
  message: string,
  status: number,
  issues?: Array<{ path: string; message: string }>
): NextResponse<ErrorResponseBody> {
  return NextResponse.json(
    { success: false, error: { message, ...(issues ? { issues } : {}) } },
    { status }
  );
}

export async function POST(
  request: Request
): Promise<NextResponse<SuccessResponseBody | ErrorResponseBody>> {
  let rawBody: unknown;

  try {
    rawBody = await request.json();
  } catch {
    return jsonError("Request body must be valid JSON", 400);
  }

  const parsed = contactSubmissionSchema.safeParse(rawBody);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
    return jsonError("Validation failed", 400, issues);
  }

  const payload: ContactSubmissionPayload = parsed.data;

  try {
    // A single `create` call is one atomic INSERT — there is no
    // multi-step write here that would need an explicit `$transaction`
    // wrapper for atomicity.
    const submission = await prisma.contactSubmission.create({
      data: {
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        message: payload.message,
      },
      select: {
        id: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: submission.id,
          createdAt: submission.createdAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return jsonError("Could not save contact submission", 500);
    }

    console.error("Unexpected error creating contact submission", error);
    return jsonError("Internal server error", 500);
  }
}
