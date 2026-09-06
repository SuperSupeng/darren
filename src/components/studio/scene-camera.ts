import type { StudioZone } from './types';

export const MAX_VIEW_ANGLE = Math.PI / 6;
export const PORTAL_FIELD_OF_VIEW = 36;

export function clampViewAngle(angle: number): number {
  return Number.isFinite(angle) ? Math.max(-MAX_VIEW_ANGLE, Math.min(MAX_VIEW_ANGLE, angle)) : 0;
}

export type PointerIntent = 'pending' | 'orbit' | 'scroll';

export function getPointerIntent(deltaX: number, deltaY: number, pointerType: string): PointerIntent {
  const horizontal = Math.abs(deltaX);
  const vertical = Math.abs(deltaY);
  const threshold = pointerType === 'mouse' ? 5 : 9;
  if (Math.max(horizontal, vertical) < threshold) return 'pending';
  // Give touch scrolling first refusal while an early diagonal gesture is ambiguous.
  if (vertical > horizontal * 1.15) return 'scroll';
  if (horizontal > vertical * 1.15) return 'orbit';
  if (Math.max(horizontal, vertical) < threshold * 1.7) return 'pending';
  return horizontal >= vertical ? 'orbit' : 'scroll';
}

export function viewAngleAfterDrag(startAngle: number, deltaX: number, viewportWidth: number): number {
  const width = Math.max(280, Math.min(900, viewportWidth));
  return clampViewAngle(startAngle - deltaX / width * 1.35);
}

export function shouldSuppressSceneClick(deltaX: number, deltaY: number, intent: PointerIntent | 'idle' = 'pending'): boolean {
  return intent === 'orbit' || intent === 'scroll' || deltaX * deltaX + deltaY * deltaY > 36;
}

export const PORTAL_FRAMES: Record<StudioZone, { width: number; height: number }> = {
  overview: { width: 14.2, height: 10.2 },
  work: { width: 7.8, height: 4.9 },
  build: { width: 5.7, height: 4.05 },
  notes: { width: 4.7, height: 4.1 },
};

export function portalCameraDistance(zone: StudioZone, aspectRatio: number): number {
  const frame = PORTAL_FRAMES[zone];
  const tangent = Math.tan(PORTAL_FIELD_OF_VIEW * Math.PI / 360);
  const aspect = Math.max(0.2, aspectRatio);
  return Math.max(frame.height / (2 * tangent), frame.width / (2 * tangent * aspect));
}
