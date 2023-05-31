/*
  Warnings:

  - Added the required column `views` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `user_kakao_id_key` ON `user`;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `views` INTEGER NOT NULL;
