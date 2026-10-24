import type { Dictionary } from "@/content/types";
import { ContactLinks } from "./ContactLinks";

export function ContactSection({ dict }: { dict: Dictionary }) {
  return (
    <section
      aria-labelledby="contact-heading"
      className="border-t border-line py-20 sm:py-28"
    >
      <div className="page-container grid gap-10 md:grid-cols-12">
        <h2
          id="contact-heading"
          className="heading text-4xl sm:text-5xl md:col-span-6 md:text-6xl"
        >
          {dict.contact.heading}
        </h2>
        <div className="md:col-span-5 md:col-start-8">
          <p className="measure text-lg text-muted">{dict.contact.body}</p>
          <ContactLinks dict={dict} />
        </div>
      </div>
    </section>
  );
}
