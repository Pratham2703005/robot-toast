'use client';

import { useEffect } from 'react';
import { toast } from 'robot-toast';
import { wave } from 'robot-toast/robots';
import { TOAST_STYLE } from '@/constants';

export function WelcomeToast() {
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedRobotToast');

    if (!hasVisited) {
      toast({
        message: 'Welcome to Robot Toast!',
        type: 'info',
        autoClose: 5000,
        robotVariant: wave,
        theme: 'dark',
        position: 'top-center',
        style: TOAST_STYLE,
      });
      localStorage.setItem('hasVisitedRobotToast', 'true');
    }
  }, []);

  return null;
}
