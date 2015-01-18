# -*- coding: utf-8 -*-

from time import sleep
from datetime import timedelta
import threading
import importlib
from fractions import gcd
from utils import lcm


class Scheduler(object):
    """
    Homemade local scheduler to run tasks at regular interval
    !!!Not based on any absolute time !!!
    Uses a separate thread
    """

    def __init__(self):
        self._tasks = []
        self._seconds = 0  # Total seconds since start mod max delta
        self._sleep_time = None  # Cycle duration
        self._reset_delta = 0  # To reset _seconds regurarly
        self._thread = None

    def add_task(self, task_name, **kwargs):

        # TODO ensure in path
        try:
            delta = timedelta(**kwargs)
        except TypeError:
            raise Exception('Bad arguments for timedelta')
        self._tasks.append((task_name, delta))
        print('task %s scheduled.' % task_name)

        deltas = [d.total_seconds() for _, d in self._tasks]
        self._reset_delta = lcm(deltas)
        print('setting reset_delta to %s' % self._reset_delta)

    def start(self, async=True, daemon=False):
        """
        Set daemon to true for scheduler to be shut down with main process
        """
        if not async:
            raise NotImplementedError('Sync mode not implemented')
        if self._thread:
            raise NotImplementedError('Can\'nt restart a scheduler')
        if not self._tasks:
            print('No task scheduled')
            return

        self._seconds = 0
        self._sleep_time = self._compute_sleep_time()
        print('Scheduler will run tasks every %s seconds' % self._sleep_time)

        # TODO Delete previous thread if needed (+ get _total_seconds ??)
        self._thread = threading.Thread(target=self._loop)
        self._thread.daemon = daemon
        self._thread.start()
        print('Scheduler thread started')

    def _loop(self):
        """
        Thread executed loop
        """
        while True:
            print(self._seconds)
            self.run_tasks()
            self._seconds = (self._seconds + self._sleep_time) % self._reset_delta
            sleep(self._sleep_time)

    def run_tasks(self, force=False):
        """
        force: run all tasks without considering time spent
        """
        tasks = [
            cmd
            for cmd, delta in self._tasks
            if force or not self._seconds % delta.total_seconds()
        ]

        for name in tasks:
            print('Running task %s' % name)
            try:
                mod = importlib.import_module('tasks.%s' % name)
                mod.Task().run()
            except ImportError:
                raise Exception('Task %s not found.' % name)
            except AttributeError:
                raise Exception('Task %s isn\'t valid.' % name)
            except Exception as e:
                # TODO catch Attribute/ImportError from inside task
                print('Task failed')
                print(e)
                continue

            print('Task executed successfuly')

    def _compute_sleep_time(self):
        durations = [int(delta.total_seconds()) for _, delta in self._tasks]
        if len(durations) == 1:
            return durations[0]
        return gcd(*durations)
