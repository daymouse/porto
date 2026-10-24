import type { ProjectSlug } from "@/lib/site";

/** Slots in a 7 x 4 schedule grid: 0 empty, 1 soft, 2 highlighted. */
const scheduleCells = [
  0, 1, 0, 0, 1, 0, 0,
  0, 0, 1, 0, 0, 0, 1,
  1, 0, 0, 2, 0, 1, 0,
  0, 0, 1, 0, 0, 0, 0,
];

/** Column heights as widths of stacked bars per column. */
const boardColumns = [
  [72, 54, 64],
  [60, 80],
  [48, 66, 40, 58],
];

interface ProjectVisualProps {
  slug: ProjectSlug;
  caption: string;
}

export function ProjectVisual({ slug, caption }: ProjectVisualProps) {
  return (
    <figure className="m-0">
      <div
        aria-hidden="true"
        className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-[color-mix(in_srgb,var(--line)_35%,var(--bg))] p-6 sm:p-8"
      >
        {slug === "pet-care-booking" ? (
          <div className="grid h-full grid-cols-7 grid-rows-4 gap-2 sm:gap-3">
            {scheduleCells.map((cell, index) => (
              <span
                key={index}
                className={`rounded-md border ${
                  cell === 2
                    ? "border-accent bg-accent"
                    : cell === 1
                      ? "border-transparent bg-accent-soft"
                      : "border-line bg-bg"
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="grid h-full grid-cols-3 gap-3 sm:gap-4">
            {boardColumns.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className="flex flex-col gap-2 rounded-lg border border-line bg-bg p-2 sm:gap-3 sm:p-3"
              >
                {column.map((width, barIndex) => (
                  <span
                    key={barIndex}
                    style={{ width: `${width}%` }}
                    className={`h-7 rounded-md sm:h-9 ${
                      columnIndex === 1 && barIndex === 0
                        ? "bg-accent"
                        : "bg-accent-soft"
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}
