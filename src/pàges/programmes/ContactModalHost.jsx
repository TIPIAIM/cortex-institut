import { lazy, Suspense, useEffect, useState } from "react";
import { CONTACT_MODAL_EVENT } from "./programmeContact.js";

const ContactAdmissionModal = lazy(() => import("./ContactAdmissionModal.jsx"));

export default function ContactModalHost() {
  const [request, setRequest] = useState(null);

  useEffect(() => {
    const handleOpen = (event) => {
      /* Un nouvel objet garantit la réouverture même pour deux demandes identiques. */
      setRequest({ ...(event?.detail || {}) });
    };

    window.addEventListener(CONTACT_MODAL_EVENT, handleOpen);
    return () => window.removeEventListener(CONTACT_MODAL_EVENT, handleOpen);
  }, []);

  if (!request) return null;

  return (
    <Suspense fallback={null}>
      <ContactAdmissionModal initialRequest={request} />
    </Suspense>
  );
}
