/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project` ADD COLUMN `user_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `project_user_id_key` ON `project`(`user_id`);

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
