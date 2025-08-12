/*
  Warnings:

  - Made the column `penalty_amount` on table `User_Book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."User_Book" ALTER COLUMN "penalty_amount" SET NOT NULL;
