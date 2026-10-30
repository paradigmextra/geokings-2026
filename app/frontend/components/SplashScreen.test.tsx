import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SplashScreen from './SplashScreen';

beforeEach(() => { sessionStorage.clear(); vi.useFakeTimers(); });
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers(); });
describe('initial brand animation', () => {
  it('never holds an already-ready homepage behind a fixed splash timer', () => {
    vi.spyOn(document,'readyState','get').mockReturnValue('complete');
    render(<SplashScreen initialPath="/"/>);
    expect(screen.queryByRole('status',{name:'Loading Geoking'})).not.toBeInTheDocument();
  });
  it('disappears as soon as actual page loading finishes', () => {
    vi.spyOn(document,'readyState','get').mockReturnValue('loading');
    render(<SplashScreen initialPath="/"/>);
    expect(screen.getByRole('status',{name:'Loading Geoking'})).toBeInTheDocument();
    fireEvent.load(window);
    expect(screen.queryByRole('status',{name:'Loading Geoking'})).not.toBeInTheDocument();
  });
  it('does not replay the large animation on subpages or repeat visits', () => {
    vi.spyOn(document,'readyState','get').mockReturnValue('loading');
    const view=render(<SplashScreen initialPath="/client"/>);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    view.unmount();
    sessionStorage.setItem('geoking-splash-shown','1');
    render(<SplashScreen initialPath="/"/>);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
