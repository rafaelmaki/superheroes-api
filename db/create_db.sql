CREATE TABLE `superhero` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `alias` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=244 DEFAULT CHARSET=utf8;
CREATE TABLE `superpower` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(256) NOT NULL,
  `password` varchar(1024) NOT NULL,
  `salt` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
CREATE TABLE `superhero_superpower` (
  `superhero_name` varchar(256) NOT NULL,
  `superpower_name` varchar(256) NOT NULL,
  KEY `fk_superpower_name_idx` (`superpower_name`),
  KEY `fk_superhero_name` (`superhero_name`),
  CONSTRAINT `fk_superhero_name` FOREIGN KEY (`superhero_name`) REFERENCES `superhero` (`name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_superpower_name` FOREIGN KEY (`superpower_name`) REFERENCES `superpower` (`name`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `user_role` (
  `username` varchar(256) NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`username`,`role`),
  KEY `fk_role_user_role_idx` (`role`),
  CONSTRAINT `fk_role_user_role` FOREIGN KEY (`role`) REFERENCES `role` (`name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_username_user_role` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `audit_event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entity` varchar(256) NOT NULL,
  `entityId` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `username` varchar(256) NOT NULL,
  `action` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `protection_area` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `lat` float NOT NULL,
  `long` float NOT NULL,
  `radius` float NOT NULL,
  `superhero_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_superhero_id_idx` (`superhero_id`),
  CONSTRAINT `fk_superhero_id` FOREIGN KEY (`superhero_id`) REFERENCES `superhero` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
