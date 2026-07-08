"use client";

import { useEffect, useLayoutEffect } from "react";

// Avoids the "useLayoutEffect does nothing on the server" warning that
// would otherwise appear while Next.js prerenders client components
// during static export.
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
