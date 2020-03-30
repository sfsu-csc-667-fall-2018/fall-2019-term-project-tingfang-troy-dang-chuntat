DROP TABLE IF EXISTS `users`;
		
CREATE TABLE `users` (
  `uid` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(64) NULL DEFAULT NULL,
  `username` VARCHAR(64) NULL DEFAULT NULL,
  `password` VARCHAR(64) NULL DEFAULT NULL,
  `email` VARCHAR(64) NULL DEFAULT NULL,
  PRIMARY KEY (`uid`)
);

-- ---
-- Table 'participants'
-- 
-- ---

DROP TABLE IF EXISTS `participants`;
		
CREATE TABLE `participants` (
  `pid` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `uid` INTEGER NULL DEFAULT NULL,
  `gid` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`pid`)
);

-- ---
-- Table 'Score'
-- 
-- ---

DROP TABLE IF EXISTS `Score`;
		
CREATE TABLE `Score` (
  `uid` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `wins` INTEGER NULL DEFAULT NULL,
  `loss` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`uid`)
);

-- ---
-- Table 'hand_history'
-- 
-- ---

DROP TABLE IF EXISTS `hand_history`;
		
CREATE TABLE `hand_history` (
  `hid` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `pid` INTEGER NULL DEFAULT NULL,
  `current_hand` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`hid`)
);

-- ---
-- Table 'Games'
-- 
-- ---

DROP TABLE IF EXISTS `Games`;
		
CREATE TABLE `Games` (
  `gid` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `winner_id` INTEGER NULL DEFAULT NULL,
  `last_big_blind` INTEGER NULL DEFAULT NULL,
  `last_small_blind` INTEGER NULL DEFAULT NULL,
  `time_started` DATETIME NULL DEFAULT NULL,
  `time_ended` DATETIME NULL DEFAULT NULL,
  `number_of_seats` INTEGER NULL DEFAULT NULL,
  `highest_pot_size` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`gid`)
);

-- ---
-- Table 'Game_state'
-- 
-- ---

DROP TABLE IF EXISTS `Game_state`;
		
CREATE TABLE `Game_state` (
  `gid` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `hid` INTEGER NULL DEFAULT NULL,
  `cards_on_table` VARCHAR(250) NULL DEFAULT NULL,
  `big_blind` INTEGER NULL DEFAULT NULL,
  `small_blind` INTEGER NULL DEFAULT NULL,
  `pot_size` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`gid`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `users` ADD FOREIGN KEY (uid) REFERENCES `Score` (`uid`);
ALTER TABLE `participants` ADD FOREIGN KEY (uid) REFERENCES `users` (`uid`);
ALTER TABLE `participants` ADD FOREIGN KEY (gid) REFERENCES `Games` (`gid`);
ALTER TABLE `hand_history` ADD FOREIGN KEY (pid) REFERENCES `participants` (`pid`);
ALTER TABLE `Games` ADD FOREIGN KEY (gid) REFERENCES `Game_state` (`gid`);
ALTER TABLE `Games` ADD FOREIGN KEY (winner_id) REFERENCES `users` (`uid`);
ALTER TABLE `Game_state` ADD FOREIGN KEY (hid) REFERENCES `hand_history` (`hid`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `participants` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Score` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `hand_history` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Games` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Game_state` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`uid`,`name`,`username`,`password`,`email`) VALUES
-- ('','','','','');
-- INSERT INTO `participants` (`pid`,`uid`,`gid`) VALUES
-- ('','','');
-- INSERT INTO `Score` (`uid`,`wins`,`loss`) VALUES
-- ('','','');
-- INSERT INTO `hand_history` (`hid`,`pid`,`current_hand`) VALUES
-- ('','','');
-- INSERT INTO `Games` (`gid`,`winner_id`,`last_big_blind`,`last_small_blind`,`time_started`,`time_ended`,`number_of_seats`,`highest_pot_size`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `Game_state` (`gid`,`hid`,`cards_on_table`,`big_blind`,`small_blind`,`pot_size`) VALUES
-- ('','','','','','');