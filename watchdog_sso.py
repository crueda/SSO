import glob
import os
import re
import logging, logging.handlers
import time
import sys
import subprocess

########################################################################
LOG = "/var/log/watchdog/sso.log"
LOG_FOR_ROTATE = 10

PROCESS="netstat -nap|grep 3000"

########################################################################


########################################################################
# definicion y configuracion de logs
try:
    logger = logging.getLogger('watchdog')
    loggerHandler = logging.handlers.TimedRotatingFileHandler(LOG , 'midnight', 1, backupCount=LOG_FOR_ROTATE)
    formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
    loggerHandler.setFormatter(formatter)
    logger.addHandler(loggerHandler)
    logger.setLevel(logging.DEBUG)
except Exception, error:
    print '------------------------------------------------------------------'
    print '[ERROR] Error writing log at %s' % error
    print '------------------------------------------------------------------'
    exit()
########################################################################

def findProcess(proc):
        ps = subprocess.Popen(proc, shell=True, stdout=subprocess.PIPE)
        output = ps.stdout.read()
        ps.stdout.close()
        ps.wait()
        return output

def start_sso():
    os.system("node /opt/SSO/bin/www &")

while True:
    api = findProcess(PROCESS)
    if api != '':
        logger.info('')
        logger.info('**********************************************************')
        logger.error('SSO is UP')
        logger.info('**********************************************************')
        logger.info('')
    else:
        logger.info('')
        logger.info('**********************************************************')
        logger.error('SSO is DOWN')
        start_sso()
        logger.info('**********************************************************')
        logger.info('')
    time.sleep(10)
