import type { ReactNode } from "react";

/** A side remark set apart from the main text. */
export function Note({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="note">
      {title && <p className="note-title">{title}</p>}
      {children}
    </aside>
  );
}
