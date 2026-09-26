export const CONTACT_MODAL_EVENT = "cortex:contact:open";

export function buildProgrammeContactPath({
  catalogueId,
  schoolSlug,
  programTitle,
  intent = "inscription",
} = {}) {
  const params = new URLSearchParams();

  if (intent) params.set("intent", intent);
  if (catalogueId) params.set("catalogue", catalogueId);
  if (schoolSlug) params.set("school", schoolSlug);
  if (programTitle) params.set("program", programTitle);

  const query = params.toString();
  return query ? `/contact?${query}` : "/contact";
}

export function openProgrammeContactModal(detail = {}) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent(CONTACT_MODAL_EVENT, {
      detail: {
        intent: detail.intent || "information",
        catalogueId: detail.catalogueId || "",
        schoolSlug: detail.schoolSlug || "",
        programTitle: detail.programTitle || "",
        source: detail.source || "site",
      },
    })
  );
}

export function flattenSchoolPrograms(school) {
  if (!school) return [];

  const programs = (school.blocks || []).flatMap((block) =>
    (block.programs || []).map((program) => ({
      title: program.title,
      duration: program.duration || block.duration || "",
      blockTitle: block.title || "",
    }))
  );

  const pathways = (school.pathways || []).map((title) => ({
    title,
    duration: school.duration || "",
    blockTitle: "Parcours",
  }));

  const seen = new Set();
  return [...programs, ...pathways].filter((item) => {
    const key = String(item.title || "").trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
