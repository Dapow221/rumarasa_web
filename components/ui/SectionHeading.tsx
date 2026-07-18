interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  titleEn?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  titleEn,
  align = "center",
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p
        className={`font-script text-2xl md:text-[26px] ${dark ? "text-gold" : "text-copper"}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-1 font-serif text-3xl font-medium text-balance md:text-[44px] md:leading-tight ${
          dark ? "text-ivory" : "text-espresso"
        }`}
      >
        {title}
        {titleEn && (
          <span
            className={`ml-3 text-xl italic md:text-[26px] ${dark ? "text-khaki" : "text-caramel"}`}
          >
            / {titleEn}
          </span>
        )}
      </h2>
    </div>
  );
}
