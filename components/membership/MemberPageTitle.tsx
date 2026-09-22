interface MemberPageTitleProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function MemberPageTitle({ eyebrow, title, description }: MemberPageTitleProps) {
  return (
    <div className="text-center">
      <p className="font-script text-2xl text-copper md:text-[26px]">{eyebrow}</p>
      <h1 className="mt-1 font-serif text-4xl font-medium md:text-[48px]">{title}</h1>
      {description && (
        <p className="mx-auto mt-3 max-w-[520px] text-[15px] leading-relaxed font-light text-cocoa">
          {description}
        </p>
      )}
    </div>
  );
}
