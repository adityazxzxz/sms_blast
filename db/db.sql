# Host: localhost  (Version 5.5.5-10.1.38-MariaDB)
# Date: 2019-07-11 14:59:09
# Generator: MySQL-Front 6.1  (Build 1.26)


#
# Structure for table "p_group"
#

DROP TABLE IF EXISTS `p_group`;
CREATE TABLE `p_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `source` varchar(255) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

#
# Data for table "p_group"
#


#
# Structure for table "p_logs"
#

DROP TABLE IF EXISTS `p_logs`;
CREATE TABLE `p_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content_id` int(11) DEFAULT NULL,
  `msisdn` varchar(16) DEFAULT NULL,
  `status` enum('process','success','fail') DEFAULT 'process',
  `response` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `p_logs_id_IDX` (`id`,`content_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

#
# Data for table "p_logs"
#


#
# Structure for table "p_msisdn"
#

DROP TABLE IF EXISTS `p_msisdn`;
CREATE TABLE `p_msisdn` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) DEFAULT NULL,
  `msisdn` varchar(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `msisdn` (`msisdn`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

#
# Data for table "p_msisdn"
#


#
# Structure for table "p_sms_content"
#

DROP TABLE IF EXISTS `p_sms_content`;
CREATE TABLE `p_sms_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

#
# Data for table "p_sms_content"
#


#
# Structure for table "p_users"
#

DROP TABLE IF EXISTS `p_users`;
CREATE TABLE `p_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

#
# Data for table "p_users"
#

INSERT INTO `p_users` VALUES (1,'admin','10ef93052bde905d9c84490434829933');
