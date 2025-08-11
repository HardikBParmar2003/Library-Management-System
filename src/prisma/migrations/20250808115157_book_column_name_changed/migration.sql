/*
  Warnings:

  - You are about to drop the column `availabale_quantity` on the `Book` table. All the data in the column will be lost.
  - Added the required column `available_quantity` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Book" DROP COLUMN "availabale_quantity",
ADD COLUMN     "available_quantity" INTEGER NOT NULL;
