import { useCategoryManagement } from "./useCategoryManagement";
import type { CategoryDesktopState, CategoryDesktopActions } from "../types/categoryDesktopTypes";

export function useCategoryDesktop(): CategoryDesktopState & CategoryDesktopActions {
  return useCategoryManagement();
}
