#!/usr/bin/env python

from schema import RateLimitType
import config
import logging
from util import setup_logging
from db import Database
from apscheduler.schedulers.blocking import BlockingScheduler

db = Database(config.REDIS_HOST, config.REDIS_PORT)
sched = BlockingScheduler()


@sched.scheduled_job("interval", minutes=1)
def decrease_quotas():
    logging.info("Decreasing quotas...")
    for mode in [RateLimitType.file_download, RateLimitType.yara_match]:
        logging.info("Decreasing quotas for %s...", mode)
        mode_max = db.get_quota_max(mode)
        increase_by = 1 + mode_max // (24 * 60)
        for user in db.get_users_with_quota(mode):
            db.decrease_quota(user, mode, increase_by)


setup_logging()
sched.start()
