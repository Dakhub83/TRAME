-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('NEW', 'IN_REVIEW', 'RESOLVED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED');

-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('en', 'fr');

-- CreateTable
CREATE TABLE "contact_submissions" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "ContactStatus" NOT NULL DEFAULT 'NEW',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" TEXT NOT NULL,
    "passenger_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "seat_number" TEXT NOT NULL,
    "travel_date" DATE NOT NULL,
    "corridor_id" TEXT NOT NULL,
    "payment_status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "selected_language" "Locale" NOT NULL DEFAULT 'fr',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "corridors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "base_price_cfa" INTEGER NOT NULL,
    "travel_duration_hours" DOUBLE PRECISION NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "corridors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "contact_submissions_status_idx" ON "contact_submissions"("status");

-- CreateIndex
CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions"("created_at");

-- CreateIndex
CREATE INDEX "reservations_travel_date_idx" ON "reservations"("travel_date");

-- CreateIndex
CREATE INDEX "reservations_payment_status_idx" ON "reservations"("payment_status");

-- CreateIndex
CREATE UNIQUE INDEX "reservations_corridor_id_travel_date_seat_number_key" ON "reservations"("corridor_id", "travel_date", "seat_number");

-- CreateIndex
CREATE UNIQUE INDEX "corridors_name_key" ON "corridors"("name");

-- CreateIndex
CREATE INDEX "corridors_is_active_idx" ON "corridors"("is_active");

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_corridor_id_fkey" FOREIGN KEY ("corridor_id") REFERENCES "corridors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
