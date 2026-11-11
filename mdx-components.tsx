import type { MDXComponents } from "mdx/types";
import { Figure } from "@/components/Figure";
import { Note } from "@/components/Note";

/**
 * Components usable in every post without an import: <Note> and <Figure>.
 * Anything else (like an interactive demo) is imported at the top of the post.
 */
const components: MDXComponents = {
  Figure,
  Note,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
