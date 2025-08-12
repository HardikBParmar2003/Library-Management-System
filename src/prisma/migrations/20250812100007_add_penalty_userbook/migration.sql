-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('PAID', 'UNPAID');

-- AlterTable
ALTER TABLE "public"."User_Book" ADD COLUMN     "penalty_amount" INTEGER DEFAULT 0,
ADD COLUMN     "penalty_status" "public"."Status";
