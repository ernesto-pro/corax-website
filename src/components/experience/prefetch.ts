/** Warm the 3D scene chunk without downloading it on pages where nobody asks for it. */
let started = false;

type SaveDataNavigator = Navigator & { connection?: { saveData?: boolean } };

export function prefetchVelaScene() {
  if (started || typeof window === "undefined") return;
  if ((navigator as SaveDataNavigator).connection?.saveData) return;
  started = true;
  // Deliberately fire and forget: a failed prefetch must never surface an error.
  void import("./VelaScene").catch(() => {
    started = false;
  });
}
