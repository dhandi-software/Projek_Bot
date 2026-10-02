import { useCategoryManagement } from "./useCategoryManagement";
import type { CategoryMobileState, CategoryMobileActions } from "../types/categoryMobileTypes";

export function useCategoryMobile(): CategoryMobileState & CategoryMobileActions {
  return useCategoryManagement();
}
