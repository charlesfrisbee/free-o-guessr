PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_panorama` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`lat` real NOT NULL,
	`lng` real NOT NULL,
	`created_at` integer DEFAULT (strftime('%s','now') * 1000) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s','now') * 1000) NOT NULL,
	`google_pano_id` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_panorama`("id", "lat", "lng", "created_at", "updated_at", "google_pano_id") SELECT "id", "lat", "lng", "created_at", "updated_at", "google_pano_id" FROM `panorama`;--> statement-breakpoint
DROP TABLE `panorama`;--> statement-breakpoint
ALTER TABLE `__new_panorama` RENAME TO `panorama`;--> statement-breakpoint
PRAGMA foreign_keys=ON;